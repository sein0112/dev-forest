const express = require('express');
const router  = express.Router();
const template = require('./loginTemplate.js');
const db =  require('../../db.js');  

router.get('/', function(request, response) {
    response.send(template.container());
});

router.post('/loginprocess', function(request, response){
    let id = request.body.user_email;
    let pwd = request.body.user_pw;

    db.query('SELECT * FROM usertbl WHERE id=? and password=?', [id, pwd], function(error, user) {
        if (error) response.send("alert('로그인 실패');");
        else {
            console.log('로그인 성공');
        }
    });
});

module.exports = router;