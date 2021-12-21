const template = require('./myPageTemplate.js');
const db =  require('../../db.js'); 

exports.container = function(request, response) {
    // let userid='abc@naver.com';
    let userid = request.session.userid;
    if (!request.session.userid) {
        response.write('<script>alert("you need to sign in")</script>');
        return response.write('<script>location.href="/";</script>');
    }
    let html;
    let user;
    let userinfohtml, navhtml, questionshtml, myanswerquestshtml, myscraphtml, mylikehtml;
    let sql = '\
        SELECT id, nickname, belong, image, usertbl.level, grade_date, gradetbl.name, sum(point) as point FROM usertbl \
        JOIN gradetbl \
        ON usertbl.level = gradetbl.level \
        left join answerstbl\
        on user_id = id\
        where usertbl.id=?\
    ';
    db.query(sql, [userid], function(error, users) {
        if(error) console.log(error);
        else{
            user = users[0];
            if (user.point == null) user.point = 0;
            userinfohtml = template.userinfotohtml(user);
            navhtml = template.nav(user);
        }
        //최근 내가 질문 한 글
        db.query('SELECT * FROM questionstbl LEFT JOIN usertbl ON usertbl.id=questionstbl.user_id WHERE user_id=? ORDER BY datetime DESC LIMIT 3', [userid], function(error, questions) {
            if(error) console.log(error); 
            else{
                questionshtml = template.myQuests(questions);
            }

            //최근 내가 답변 한 글
            db.query('call getlatelyAnswered(?)', [userid], function(error, questions) {
                if(error) console.log(error);
                else{
                    myanswerquestshtml = template.myAnswerQuests(questions[0]);
                }

                //내가 즐겨찾기한 글
                db.query('call getMyScrap(?)', [userid], function(error, questions) {
                    if(error) console.log(error);
                    else {
                        myscraphtml = template.myScraps(questions[0]);
                    }

                    //좋아요 한 답변
                    db.query('call getMyLike(?)', [userid], function(error, answers) {
                        if(error) console.log(error);
                        else {
                            mylikehtml = template.myLikes(answers[0]);
                            html = template.container(navhtml, userinfohtml, questionshtml, myanswerquestshtml, myscraphtml, mylikehtml, user.image);
                        }
                       response.send(html);
                    });
                });
            });            
        });
    });
}
