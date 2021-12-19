const express = require('express');
const router  = express.Router();
const template = require('./boardTemplate.js');
const db =  require('../../db.js');  

router.get('/board/:boardId', function(request, response) {
    let userinfo = request.session;
    let boardId = request.params.boardId;
    let posttohtml, usertohtml;
    let boardName;
    usertohtml = template.nav(userinfo);
    db.query('SELECT name FROM boardtbl WHERE id=?', [boardId], function(error, boardname) {
        if (error) throw error;
        boardName = boardname[0].name;
        console.log(boardName);
    });
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
        posttohtml = template.posts(questions);
        response.send(template.container(boardId, boardName, usertohtml, posttohtml));
    });
});


module.exports = router;