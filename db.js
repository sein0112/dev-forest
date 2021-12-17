var mysql      = require('mysql');
var db = mysql.createConnection({
    host     : '34.64.141.121',    // 호스트 주소
    user     : 'devF',           // mysql user
    password : 'roo!',       // mysql password
    database : 'devforest'         // mysql 데이터베이스
});
db.connect();
// 동작 확인용
db.query('SELECT * from gradetbl',
    function (error, results, fields) {
        if (error) throw error;
        console.log('The gradetbl is >>>>>>>>>>>>>>>>>> : ', results);
    });
// db.end();
module.exports = db;