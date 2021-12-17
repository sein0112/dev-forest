var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '34.64.141.121',    // 호스트 주소
    user     : 'devF',           // mysql user
    password : 'roo!',       // mysql password
    database : 'devforest'         // mysql 데이터베이스
});
connection.connect();
// 동작 확인용
connection.query('SELECT * from gradetbl',
    function (error, results, fields) {
        if (error) throw error;
        console.log('The gradetbl is >>>>>>>>>>>>>>>>>> : ', results);
    });
connection.end();