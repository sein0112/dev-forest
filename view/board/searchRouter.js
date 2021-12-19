const express = require('express');
const db =  require('../../db.js');  
const router  = express.Router();
const boardTemplate = require('./boardTemplate.js');

router.get('/search', function(request, response) {
    let posttohtml;
    let userinfo = request.session;
    usertohtml = boardTemplate.nav(userinfo);

    let search_query = request.query.search_query.trim();
    search_query = '%' + search_query + '%';
    console.log(search_query);
    let sql ='SELECT board_id, no, datetime, nickname, title, content, image, name\
    FROM questionstbl\
    JOIN usertbl\
    on usertbl.id = user_id\
    join boardtbl\
    on questionstbl.board_id = boardtbl.id\
    WHERE questionstbl.title LIKE ? or questionstbl.content LIKE ? ORDER BY questionstbl.datetime LIMIT 10;';

    db.query(sql, [search_query, search_query], function(error, questions) {
        if(error) throw error;
        console.log(questions);
        posttohtml = boardTemplate.posts(questions);
        response.send(boardTemplate.container(0, '검색 결과', usertohtml, posttohtml));
    });
});

module.exports = router;