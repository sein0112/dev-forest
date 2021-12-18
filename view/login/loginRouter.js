const express = require('express');
const router  = express.Router();
const template = require('./loginTemplate.js');

router.get('/', function(request, response) {
    response.send(template.container());
});

router.post('/loginprocess', function(request, response){
    response.send("this is loginprocess");
});
module.exports = router;