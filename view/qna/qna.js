const db = require('../../lib/db');
const template = require('./template.js');
const qs = require("querystring");
const url = require("url");
const sanitizeHtml = require('sanitize-html');

exports.read = function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query(`SELECT * FROM question WHERE board_id=? AND id=?`,[queryData.id, queryData.board_id], function(error, question){
        if(error){
            throw error;
        }
        db.query(`SELECT count(*) FROM scrap WHERE board_id=? AND id=?`,[queryData.id, queryData.board_id], function(error2, scrap){
            if(error2){
                throw error2;
            }
            let data = {
                ...question,
                scrap
            }
            let html = template.question_read(data);
            response.writeHead(200);
            response.end(html);
        })
    })
}

exports.creat = function (request, response){
    let html = template.question_creat()
    response.writeHead(200)
    response.end(html);
}

exports.create_process = function(request, response){
    let body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`
            INSERT INTO question (board_id, first_date, last_date, user_id, title, content) 
              VALUES(?, NOW(), NOW(), ?, ?, ?)`,
            [post.board_id, post.user_id, post.title, post.content],
            function(error, result){
                if(error){
                    throw error;
                }
                response.writeHead(302, {Location: `/?id=${result.insertId}`});
                response.end();
            }
        )
    });
}

exports.update = function (request, response){
    let html = template.question_creat()

    response.writeHead(200)
    response.end(html);
}


exports.update_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var query = qs.parse(body);
        db.query('UPDATE question SET title=?, content=?, last_date=? WHERE board_id = ? AND no = ?', [query.title, query.content, query.board_id, query.no], function(error, result){
            response.writeHead(302, {Location: `/?id=${query.id}`});
            response.end();
        })
    });
}

exports.delete_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        let query = qs.parse(body);
        db.query('DELETE FROM question WHERE board_id = ? AND no = ?', [query.board_id, query.no], function(error, result){
            if(error){
                throw error;
            }
            response.writeHead(302, {Location: `/`});
            response.end();
        });
    });
}