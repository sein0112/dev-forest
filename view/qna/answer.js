var express = require('express'); 
var router = express.Router();
var url = require('url');
const template = require('./ansTemplate.js');

var db = require('../../db.js');

router.get('/answer', function(request, response){
    
});

// exports.container = function(request, response) {
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;

//     var html = template.container();

//     response.send(html);
// }