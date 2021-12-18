const template = require('./ansTemplate.js');
const db = require('./../../db.js');

exports.container = function(request, response) {
    // let userid='abc@naver.com';
        let userid = request.session.userid;
        console.log(userid)
        if (!request.session.userid) {
            return response.redirect('/');
        }
        let html;
        //게시판ID와 게시글NO의 값을 받아와야함. 일단 임시로 1,1로 지정함.
        let boardId = 1, qusetNo = 1;
        db.query('SELECT * FROM usertbl JOIN answerstbl ON usertbl.id = answerstbl.user_id WHERE answerstbl.board_id=? AND answerstbl.quest_no=?', [boardId, qusetNo], function(error, answer) {
            if(error) console.log(error);
            else{
                console.log(answer);
                html = template.HTML(answer);
            }
            response.send(html);
        });
}