const db = require('../../db');
const qTemplate = require('./template.js');
const qs = require("querystring");
const url = require("url");
const sanitizeHtml = require('sanitize-html');

exports.read = function(request, response){
    var _url = request.url;
    let boardId = request.params.boardId;
    let questionNo = request.params.questionNo;
    db.query(`SELECT * FROM questionstbl WHERE board_id=? AND no=?`,[boardId, questionNo], function(error, question){
        if(error){
            throw error;
        }
        db.query(`SELECT count(*) as scrap FROM scraptbl WHERE quest_no=?`,[questionNo], function(error2, scrap){
            if(error2){
                throw error2;
            }

            db.query(`SELECT count(*) as answerCount FROM answerstbl WHERE board_id=? AND quest_no=?`,[boardId, questionNo], function(error3, answerCount){
                if(error3){
                    throw error3;
                }
                let data = {
                    ...question[0],
                    ...scrap[0],
                    ...answerCount[0]
                }
                console.log("readData", data)
                let html = qTemplate.question_read(data);
                response.writeHead(200);
                response.end(html);
            })
        })
    })
}

exports.create = function (request, response){
    let data = request.params;
    let html = qTemplate.question_create(data)
    response.writeHead(200)
    response.end(html);
}

exports.create_process = function(request, response){
    var data = request.body;
    // SELECT MAX(컬럼) FROM 테이블;
    db.query(`SELECT MAX(no) as maxNo FROM questionstbl WHERE board_id=?`,[data.boardId], function(error2, maxNo){
        if(error2){
            throw error2;
        }
        db.query(`
                    INSERT INTO questionstbl (board_id, no, datetime, updated_datetime, user_id, title, content)
                    VALUES(?, ?, NOW(), NOW(), ?, ?, ?)`,
            [data.boardId, maxNo[0].maxNo+1, data.userId, data.title, data.content],
            function(error, result){
                if(error){
                    throw error;
                }
                response.writeHead(302, {Location: `/qna/${data.boardId}/${maxNo[0].maxNo+1}`});
                response.end();
            }
        )
    })
}

exports.update = function (request, response){
    let html = qTemplate.question_create()

    response.writeHead(200)
    response.end(html);
}


exports.update_process = function(request, response){

    var data = request.body;
    console.log("data", data.content)
    db.query('UPDATE questionstbl SET title=?, content=?, updated_datetime=NOW() WHERE board_id = ? AND no = ?',
        [data.title, data.content, data.boardId, data.questionNo],
        function(error, result){
            if(error){
                throw error;
            }
            response.writeHead(302, {Location: `/qna/${data.boardId}/${data.questionNo}`});
            response.end();
    })
}

exports.delete_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        let query = qs.parse(body);
        db.query('DELETE FROM questionstbl WHERE board_id = ? AND no = ?', [query.board_id, query.no], function(error, result){
            if(error){
                throw error;
            }
            response.writeHead(302, {Location: `/`});
            response.end();
        });
    });
}