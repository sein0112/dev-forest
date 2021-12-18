const template = require('./rankTemplate.js');
const db =  require('../../db.js'); 

exports.container = function(request, response) {
    if (!request.session.userid) {
        return response.redirect('/');
    }
    let html;
    db.query('SELECT DISTINCT nickname, point FROM usertbl JOIN answerstbl ON usertbl.id=answerstbl.user_id ORDER BY answerstbl.point', function(error, userRnak) {
        if(error) console.log(error);
        db.query('SELECT belong, sum(point) FROM usertbl JOIN answerstbl ON usertbl.id=answerstbl.user_id GROUP BY usertbl.belong ORDER BY sum(answerstbl.point)', function(error2, groupRank) {
            if(error2) console.log(error2);
            else {
                console.log(groupRank)
                html = template.HTML(userRnak, groupRank);
            }
        response.send(html);
        });
    });
}