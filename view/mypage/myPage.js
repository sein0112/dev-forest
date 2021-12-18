const template = require('./myPageTemplate.js');
const db =  require('../../db.js'); 

exports.container = function(request, response) {
    // let userid='abc@naver.com';
    let userid = request.session.userid;
    if (!request.session.userid) {
        return response.redirect('/');
    }
    let html;
    let user;
    let userinfohtml, navhtml, questionshtml, myanswerquestshtml, myscraphtml, mylikehtml;

    db.query('SELECT id, nickname, belong, image, name FROM usertbl JOIN gradetbl ON usertbl.level = gradetbl.level where usertbl.id=?', [userid], function(error, users) {
        if(error) console.log(error);
        else{
            user = users[0];
            //console.log(user);
            userinfohtml = template.userinfotohtml(user);
            navhtml = template.nav(user);
        }
        //최근 내가 질문 한 글
        db.query('SELECT * FROM questionstbl LEFT JOIN usertbl ON usertbl.id=questionstbl.user_id ORDER BY datetime DESC LIMIT 3', [userid], function(error, questions) {

            if(error) console.log(error); 
            else{
                questionshtml = template.myQuests(questions);
            }

            //최근 내가 답변 한 글
            db.query('call getlatelyAnswered(?)', [userid], function(error, questions) {
                if(error) console.log(error);
                else{
                    //console.log(questions[0]);
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
