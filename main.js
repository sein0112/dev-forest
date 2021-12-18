var http = require('http');
var url = require('url');
var answer = require('./view/qna/answer.js');
var qna = require('./view/qna/qna.js');
var myPage = require('./view/mypage/myPage.js');
var rank = require('./view/rank/rank.js');
var myLikeAndStar = require('./view/mypage/myLikeAndStar.js');
var showBulletine = require('./view/bulletine/showBulletine.js');
var loginRoutes = require('./view/login/loginRouter.js');
var boardRoutes = require('./view/board/boardRouter.js');
var modRoutes = require('./view/login/usermodRouter.js');
var qnaRoutes = require('./view/qna/qnaRouter.js');
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


app.use('/login', loginRoutes);
app.use('/modify', modRoutes);
app.use('/qna', qnaRoutes);

app.use('/answer', function(request, response){
    answer.container(request, response);
});

app.get('/myPage', function(request, response) {
    myPage.container(request, response);
});

app.get('/myLikeAndStar', function(request, response) {
    myLikeAndStar.container(request, response);
});

app.get('/searchResult', function(request, response){
    searchResult.container(request, response);
});

app.get('/showBulletine', function(request, response){
    showBulletine.container(request, response);
});

app.get('/myLikeAndStar', function(request, response){
    myLikeAndStar.container(request, response);
});

app.get('/showBulletine', function(request, response) {
    showBulletine.container(request, response);
});

app.use('/rank', function(request, response){
    rank.container(request, response);
});

app.get('/board/:boardId', boardRoutes);


app.listen(5000);

