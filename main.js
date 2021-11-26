var http = require('http');
var url = require('url');
var answer = require('./view/qna/answer.js');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/asset'));

app.get('/', function(request, response){
    response.sendFile(__dirname + '/view/mainPage.html');
})

app.get('/answer', function(request, response){
    answer.container(request, response);
});

app.listen(5000);

