var http = require('http');
var url = require('url');
var answer = require('./view/qna/answer.js');
var qna = require('./view/qna/qna.js');
var myPage = require('./view/mypage/myPage.js')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/asset'));

app.get('/', function(request, response){
    response.sendFile(__dirname + '/view/mainPage.html');
})

app.get('/qna/:boardId/:questionNo', function(request, response){
    qna.read(request, response);
});

app.get('/qna/:boardId/first/create', function(request, response){
    qna.create(request, response);
});

app.post('/qna/:boardId/:questionNo/update_process', function(request, response){
    qna.update_process(request, response);
});

app.post('/qna/create_process', function(request, response){
    qna.create_process(request, response);
});

app.get('/answer', function(request, response){
    answer.container(request, response);
});

app.get('/myPage', function(request, response) {
    myPage.container(request, response);
})
app.listen(5000);

