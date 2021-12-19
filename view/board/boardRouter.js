const express = require('express');
const router  = express.Router();
const template = require('./boardTemplate.js');
const db =  require('../../db.js');  

router.get('/board/:boardId', function(request, response) {
    // response.send(template.container());
    let userinfo = request.session;
    // console.log(userinfo);
    // console.log(userinfo.nickname);
    let boardId = request.params.boardId;
    let posttohtml, usertohtml;
    usertohtml = template.nav(userinfo);
    let sql = '\
    SELECT board_id, no, datetime, nickname, title, content, image \
    FROM questionstbl JOIN usertbl\
    on usertbl.id = user_id\
    WHERE board_id = ? LIMIT 5';
    db.query(sql, [boardId], function(error, questions) {
        console.log(questions);
        posttohtml = template.posts(questions);
        response.send(template.container(usertohtml, posttohtml));
    });
});


module.exports = router;