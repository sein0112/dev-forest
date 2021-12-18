var http = require('http');
var url = require('url');
var answer = require('./view/qna/answer.js');
var qna = require('./view/qna/qna.js');
var myPage = require('./view/mypage/myPage.js')
var loginRoutes = require('./view/login/loginRouter.js');
var boardRoutes = require('./view/board/boardRouter.js');
var express = require('express');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/asset'));

app.use(            
    session({
    key: "user",
    secret: "user",
    resave: true,
    saveUninitialized: false,
    store : new MySQLStore({
        host     : '34.64.141.121',    
        user     : 'devF',           
        password : 'roo!',       
        database : 'devforest'      
    })
}));

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

app.post('/qna/scrap_process', function(request, response){
    qna.scrap(request, response);
});

app.use('/login', loginRoutes);

app.get('/answer', function(request, response){
    answer.container(request, response);
});

app.get('/myPage', function(request, response) {
    myPage.container(request, response);
})

app.get('/board/:boardId', boardRoutes);

app.listen(5000);

