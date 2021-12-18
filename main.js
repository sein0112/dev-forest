var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var answer = require('./view/qna/answer.js');
var myPage = require('./view/mypage/myPage.js')
var loginRoutes = require('./view/login/loginRouter.js');
var express = require('express');
var app = express();
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

app.use(express.static(__dirname + '/asset'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    key: "user",
    secret: "user",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
        host:   'localhost',
        port:   3306,
        user:   'root',
        password:'root',
        database: 'devforest'
    })
}));


app.get('/', function(request, response){
    response.sendFile(__dirname + '/view/mainPage.html');
})

app.use('/login', loginRoutes);

app.get('/answer', function(request, response){
    answer.container(request, response);
});

app.get('/myPage', function(request, response) {
    myPage.container(request, response);
})
app.listen(5000);

