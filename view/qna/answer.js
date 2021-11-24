var url = require('url');
const template = require('./ansTemplate.js');

exports.container = function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    var html = template.container();

    response.send(html);
}