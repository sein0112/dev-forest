const template = require('./rankTemplate.js');
const db =  require('../../db.js'); 

exports.container = function(request, response) {
    if (!request.session.userid) {
        return response.redirect('/');
    }
    let userinfo = request.session;
    let navhtml = template.nav(userinfo);
    console.log(navhtml);
    let html;
    db.query('select user_id, nickname, image, sum(point) as point from answerstbl join usertbl on answerstbl.user_id = usertbl.id group by user_id order by point desc', function(error, userRnak) {
        if(error) console.log(error);
        console.log(userRnak);
        db.query('SELECT belong, sum(point) FROM usertbl JOIN answerstbl ON usertbl.id=answerstbl.user_id GROUP BY usertbl.belong ORDER BY sum(answerstbl.point)', function(error2, groupRank) {
            if(error2) console.log(error2);
            else {
                console.log(groupRank)
                html = template.HTML(navhtml, userRnak, groupRank);
            }
        response.send(html);
        });
    });
}