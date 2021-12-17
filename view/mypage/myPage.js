const template = require('./myPageTemplate.js');
const db =  require('../../db.js'); 

exports.container = function(request, response) {
    var html = template.container();

    db.query('select * from gradetbl', function(error, grades) {
        if(error) {
            console.log(error);
        }
        console.log(grades);
    })
    response.send(html);
}
