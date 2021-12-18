var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var answer = require('./view/qna/answer.js');
var myPage = require('./view/mypage/myPage.js')
var rank = require('./view/rank/rank.js');
var loginRoutes = require('./view/login/loginRouter.js');
var express = require('express');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();

app.use(express.static(__dirname + '/asset'));
app.use(bodyParser.urlencoded({ extended: false }));

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

app.use('/answer', function(request, response){
    answer.container(request, response);
});

app.get('/myPage', function(request, response) {
    myPage.container(request, response);
})

app.use('/rank', function(request, response){
    rank.container(request, response);
});

app.listen(5000);

