const express = require('express');
const router  = express.Router();
const template = require('./registerTemplate.js');
const db =  require('../../db.js');  

router.get('/', function(request, response) {
    response.send(template.container('', 'Need duplicate Check'));
});

router.post('/emailcheck', function(request, response) {
    let id = request.body.user_email;
    // response.send(template.container(id, 'Checked'));
    db.query('SELECT id FROM usertbl where id=?', [id], function(error, users){
        if(error) throw error;
        if (users.length != 0) {  //중복된 경우
            // response.write('<script>alert("id duplicated");</script>');
            // response.write('<script>location.href="/register";</script>');
            response.status(200).json({ data : false, message :'이미 있는 아이디입니다.' })
        } else { //성공한 경우
            // response.write('<script>alert("id not duplicated");</script>');
            response.status(200).json({data: true, message: 'Success'})
        }
    }) 
});

router.post('/registerprocess', function(request, response){
    let id = request.body.user_id;
    let nickname = request.body.user_nickname;
    let pwd = request.body.user_pwd; 
    let belong = request.body.user_belong;

    // console.log(id, nickname, pwd, belong);
    db.query('INSERT INTO usertbl (id, password,nickname, belong, level, grade_date) VALUES(?, ?, ?, ?, 1, now())', [id, pwd, nickname, belong], function(error, result) {
        if (error) throw error;
        else {
            console.log("성공");
            response.write('<script>alert("signUp success");</script>');
            response.write('<script>location.href="/";</script>');
        }
    });
});



module.exports = router;