const express = require('express');
const router  = express.Router();
const template = require('./boardTemplate.js');
const db =  require('../../db.js');  

router.get('/board/:boardId', function(request, response) {
    response.send(template.container());

    console.log(request.params.boardId);
});


module.exports = router;