var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){

    var url = request.url;
    // if(request.url === '/'){
    //     // url = '/view/qna/ask.html';
    // }
    // if(request.url == '/favicon.ico'){
    //     return response.writeHead(404);
    // }
    response.writeHead(200);
    // response.end("hhhh");
    // console.log(__dirname)
    response.end(fs.readFileSync(__dirname + url));
});
app.listen(3000);