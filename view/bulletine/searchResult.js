<<<<<<< Updated upstream
const template = require('./searchResultTemplete.js');
=======
const template = require('./searchResultTemplate.js');
>>>>>>> Stashed changes
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
        //최근 내가 질문 한 글
        db.query('SELECT * FROM questionstbl WHERE user_id=? ORDER BY datetime DESC LIMIT 3', [userid], function(error, questions) {
            if(error) console.log(error); 
            else{
                questionshtml = template.myQuests(questions);
            }           
        });
    });
}
