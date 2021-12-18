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
        if (error) {
            console.log(error);
        }
        else {
            if(user.length == 0) {
                request.session.authenticate = false;
                response.write("<script>alert('login failed')</script>");
                return response.write("<script>window.location='/login'</script>");
            }
            else{
                request.session.authenticate = true;
                request.session.userid = id;
                console.log(request.session);
                return response.redirect("/myPage");
            }

        }
    });
});

router.post('/logoutprocess', function(request, response){
    if (request.session.authenticate == false) {}
    else {
        delete request.session.userid;
        request.session.authenticate = false;
        response.redirect('/');
    }
});

module.exports = router;