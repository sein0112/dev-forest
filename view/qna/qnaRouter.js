const express = require('express');
const router  = express.Router();
const qna = require("./qna.js");


router.get('/:boardId/:questionNo', function(request, response){
    qna.read(request, response);
});

router.get('/:boardId/first/create', function(request, response){
    qna.create(request, response);
});

router.post('/:boardId/:questionNo/update_process', function(request, response){
    qna.update_process(request, response);
});

router.post('/create_process', function(request, response){
    qna.create_process(request, response);
});

router.post('/scrap_process', function(request, response){
    qna.scrap(request, response);
});

router.post('/delete_process', function(request, response){
    qna.delete_process(request, response);
});

module.exports = router;