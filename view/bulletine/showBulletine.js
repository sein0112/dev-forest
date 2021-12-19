const template = require('./showBulletineTemplate.js');
const db =  require('../../db.js'); 

exports.container = function(request, response) {
    // let userid='abc@naver.com';
    let userid = request.session.userid;
    if (!request.session.userid) {
        return response.redirect('/');
    }
    let html;
    let user;

    let userinfohtml, navhtml, questionshtml;
    db.query('SELECT id, nickname, belong, image, name FROM usertbl JOIN gradetbl ON usertbl.level = gradetbl.level where usertbl.id=?', [userid], function(error, users) {
        if(error) console.log(error);
        else{
            user = users[0];
            //console.log(user);
            userinfohtml = template.userinfotohtml(user);
            navhtml = template.nav(user);
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
                            html = template.container(navhtml, userinfohtml, questionshtml, myanswerquestshtml, myscraphtml, mylikehtml);
                        }
                       response.send(html);
                    });

                });           
    });

}
