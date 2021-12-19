const express = require('express');
const router  = express.Router();
const template = require('./boardTemplate.js');
const db =  require('../../db.js');  

router.get('/board/:boardId', function(request, response) {
    // response.send(template.container());
    let boardId = request.params.boardId;
    let posttohtml;
    console.log(request.params.boardId);
    db.query('SELECT * FROM questionstbl WHERE board_id = ? LIMIT 10', [boardId], function(error, questions) {
        console.log(questions);
        posttohtml = template.posts(questions);
        response.send(template.container(posttohtml));
    });
});


module.exports = router;