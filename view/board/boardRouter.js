const express = require('express');
const router  = express.Router();
const template = require('./boardTemplate.js');
const db =  require('../../db.js');  

router.get('/board/:boardId', function(request, response) {
    let userinfo = request.session;
    let boardId = request.params.boardId;
    let posttohtml, usertohtml;
    usertohtml = template.nav(userinfo);
    let sql = '\
        SELECT board_id, name, no, datetime, nickname, title, content,image\
        FROM questionstbl \
        JOIN usertbl\
        on usertbl.id = user_id\
        join boardtbl\
        on questionstbl.board_id = boardtbl.id\
        WHERE board_id =? LIMIT 10';
    db.query(sql, [boardId], function(error, questions) {
        if(error) throw error;
        console.log(questions);
        posttohtml = template.posts(questions);
        response.send(template.container(questions[0].name, usertohtml, posttohtml));
    });
});


module.exports = router;