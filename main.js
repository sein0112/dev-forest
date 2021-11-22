var http = require('http');
var fs = require('fs');
var url = require('url');
var bar = require('./lib/topBar')
var qna = require('./view/qna/qna')

var app = http.createServer(function(request,response){

    var url = request.url;
    if(request.url === '/' || request.url === '/main'){
        url = '/view/mainPage.html';
        response.writeHead(200);
        response.end(fs.readFileSync(__dirname + url));
    }else if(request.url === '/main/qna/detail') {
        response.writeHead(200);
        response.end(bar.HTML() + qna.question());
    }else if(request.url === '/main/qna/create') {
        response.writeHead(200);
        response.end(bar.HTML() + qna.question_creat());
    }else if(request.url === '/main/myPage') {
        url = '/view/mypage/myPage.html';
        response.end(fs.readFileSync(__dirname + url));
    }else {
        response.writeHead(400);
        response.end(fs.readFileSync(__dirname + url));
    }

});
app.listen(3001);