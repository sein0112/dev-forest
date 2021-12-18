const db = require('../../db');
const qTemplate = require('./template.js');
const qs = require("querystring");
const url = require("url");
const sanitizeHtml = require('sanitize-html');
const template = require("./ansTemplate.js");

exports.read = function(request, response){
    var _url = request.url;
    let boardId = request.params.boardId;
    let questionNo = request.params.questionNo;
    db.query(`SELECT board_id, no, datetime, updated_datetime, user_id, title, content, u.nickname FROM questionstbl left JOIN usertbl u on questionstbl.user_id = u.id where board_id = ? AND no = ?`,[boardId, questionNo], function(error, question){
        if(error){
            throw error;
        }
        db.query('SELECT * FROM usertbl JOIN answerstbl ON usertbl.id = answerstbl.user_id WHERE answerstbl.board_id=? AND answerstbl.quest_no=?', [boardId, questionNo], function(error2, answer) {
            if(error2) throw error;

            db.query(`SELECT count(*) as scrap FROM scraptbl WHERE board_id=?AND quest_no=?`,
                [boardId, questionNo], function(error3, scrap){
                    if(error3){
                        throw error3;
                    }
                    db.query(`SELECT * FROM scraptbl WHERE board_id=? AND quest_no=? AND user_id=?`,[boardId, questionNo, request.session.userid], function(error4, scrapMe){
                        if(error4){
                            throw error4;
                        }
                        let contents
                        try {
                            contents = JSON.parse(question[0].content)
                        } catch (e) {
                            contents = { text : question[0].content}
                        }
                        scrapMe = scrapMe.length > 0
                        let data = {
                            contents,
                            boardId : question[0].board_id,
                            answer : answer,
                            ...question[0],
                            ...scrap[0],
                            scrapMe,
                        }

                        console.log(data)
                        let writer = request.session.userid === data.user_id
                        let html = qTemplate.question_read(data, writer);
                        response.writeHead(200);
                        response.end(html);
                    })
                })
        });

    })
}

exports.create = function (request, response){
    let data = request.params;
    data = {
        board_id : data.boardId,
            ...data
    }
    let html = qTemplate.question_create(data)
    response.writeHead(200)
    response.end(html);
}

exports.create_process = function(request, response){
    var data = request.body;
    console.log(data)
    let content = {
        text : data.content.trim(),
        code : data.codeContent.trim(),
    }
    let userId = request.session.userid;
    // SELECT MAX(컬럼) FROM 테이블;
    db.query(`SELECT MAX(no) as maxNo FROM questionstbl WHERE board_id=?`,[data.boardId], function(error2, maxNo){
        if(error2){
            throw error2;
        }
        db.query(`
                    INSERT INTO questionstbl (board_id, no, datetime, updated_datetime, user_id, title, content)
                    VALUES(?, ?, NOW(), NOW(), ?, ?, ?)`,
            [data.boardId, maxNo[0].maxNo+1, userId, data.title, JSON.stringify(content)],
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
    let content = {
        text : data.content?.trim(),
        code : data.codeContent?.trim(),
    }
    db.query('UPDATE questionstbl SET title=?, content=?, updated_datetime=NOW() WHERE board_id = ? AND no = ?',
        [data.title.trim(), JSON.stringify(content), data.boardId, data.questionNo],
        function(error, result){
            if(error){
                throw error;
            }
            response.writeHead(302, {Location: `/qna/${data.boardId}/${data.questionNo}`});
            response.end();
    })
}

exports.delete_process = function(request, response){
    var data = request.body;
    let userId = request.session.userid

    console.log(data, userId)
    db.query('DELETE FROM questionstbl WHERE board_id = ? AND user_id=? AND no = ?',
        [data.boardId, userId, data.questNo],
        function(error, result){
            if(error){
                alert("삭제할 수 없습니다.");
                throw error;
            }
            response.status(200).json(true);
        });
}


exports.scrap = function(request, response){
    var data = request.body;
    let userId = request.session.userid
    // SELECT MAX(컬럼) FROM 테이블;

    db.query(`SELECT * FROM scraptbl WHERE board_id=? AND user_id=? AND quest_no=?`,
        [data.boardId, userId, data.questNo],
        function(error, scrap) {
        if (error) {
            throw error;
        }

        if(scrap.length === 0){
            db.query(`INSERT INTO scraptbl (user_id, board_id, quest_no, datetime)
                      VALUES(?, ?, ?, NOW())`,
                [ userId, data.boardId, data.questNo],
                function(error2, result){
                    if(error2){
                        throw error2;
                    }
                    return response.status(200).json(result)
                }
            )
        } else {
            db.query(`DELETE FROM scraptbl WHERE board_id=? AND user_id=? AND quest_no=?`,
                [data.boardId, userId, data.questNo],
                function(error2, result2){
                    if(error2){
                        throw error2;
                    }
                    return response.status(200).json(false)
                }
            )
        }
    })
}