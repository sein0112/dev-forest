const template = require('./myPageTemplate.js');
const db =  require('../../db.js'); 

exports.container = function(request, response) {
    let userid='abc@naver.com';
    let html;
    let user;
    let userinfohtml, navhtml;
    db.query('select id, nickname, belong, image, name from usertbl join gradetbl on usertbl.level = gradetbl.level where usertbl.id=?', [userid], function(error, users) {
        if(error) {
            console.log(error);
        }
        else{
            user = users[0];
            console.log(user);
            userinfohtml = template.userinfotohtml(user);
            navhtml = template.nav(user);
            html = template.container(navhtml, userinfohtml);
            response.send(html);
        }
    });
    //response.send(html);
}
