var http = require('http');
var url = require('url');
var mainRoutes = require('./view/mainRouter.js');
var myPage = require('./view/mypage/myPage.js')
var rank = require('./view/rank/rank.js');
var loginRoutes = require('./view/login/loginRouter.js');
var boardRoutes = require('./view/board/boardRouter.js');
var searchRoutes = require('./view/board/searchRouter.js');
var modRoutes = require('./view/login/usermodRouter.js');
var registerRoutes = require('./view/login/registerRouter.js');
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

app.get('/', mainRoutes);

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/modify', modRoutes);
app.use('/qna', qnaRoutes);


app.get('/myPage', function(request, response) {
    myPage.container(request, response);
})

app.use('/rank', function(request, response){
    rank.container(request, response);
});

app.get('/board/:boardId', boardRoutes);
app.get('/search', searchRoutes);

app.use('/uploads', express.static('uploads'));

app.use(function(request, response){
    response.sendFile(__dirname+'/view/notFound.html')
})
app.listen(5000);

