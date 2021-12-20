const express = require('express');
const router  = express.Router();
const template = require("./mainTemplate.js");
const db = require('../db.js');

router.get('/', function(request, response) {
    db.query('select count(*) as questno from questionstbl', function(error, questions){
        if (error) throw error;
        db.query('select count(*) as answerno from answerstbl', function(error2, answers) {
            if (error2) throw error2;
            db.query('select count(*) as userno from usertbl', function(error3, users) {
                if (error3) throw error3;
                let questno = questions[0].questno;
                let answerno = answers[0].answerno;
                let userno = users[0].userno;

                response.send(template.container(questno, answerno, userno));
            })
        })
    })
});

module.exports = router;