var http = require('http');
var fs = require('fs');
var url = require('url');
var bar = require('./lib/topBar')
var qna = require('./view/qna/qna')

var app = http.createServer(function(request,response){

    var url = request.url;

    if(request.url == '/favicon.ico'){
        return response.writeHead(404);
    }

    if(request.url === '/' || request.url === '/main'){
        url = '/view/mainPage.html';
    // }else if(request.url === '/main/qna/detail') {
    //     qna.read(request,response)
    // }else if(request.url === '/main/qna/create') {
    //     qna.creat(request,response)
    // }else if(request.url === '/main/qna/create_process') {
    //     qna.create_process(request,response)
    // }else if(request.url === '/main/qna/update_process') {
    //     qna.update_process(request,response)
    // }else if(request.url === '/main/qna/delete_process') {
    //     qna.delete_process(request, response)
    // }else if(request.url === '/main/myPage') {
    //     url = '/view/mypage/myPage.html';
    //     response.end(fs.readFileSync(__dirname + url));
    }

    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
    // response.writeHead(400);
    // response.end('Not found');



    // var url = request.url;
    // if(request.url === '/'){
    //     url = '/view/mainPage.html';
    // }
    // if(request.url == '/favicon.ico'){
    //     return response.writeHead(404);
    // }
    // if(request.url === '/'){
    //     url = '/view/mainPage.html';
    // }
    // if(request.url === '/main/qna/detail') {
    //     url = '/view/qna/question.html';
    // }
    // if(request.url === '/main/qna/create') {
    //     url = '/view/qna/questionCreate.html';
    // }
    // if(request.url === '/main/myPage') {
    //     url = '/view/mypage/myPage.html';
    // }
    // response.writeHead(200);
    // response.end(fs.readFileSync(__dirname + url));

});
app.listen(4005);