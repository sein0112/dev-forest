const db = require('../../db');
const qTemplate = require('./template.js');
const qs = require("querystring");
const url = require("url");
const sanitizeHtml = require('sanitize-html');
const template = require("./ansTemplate.js");

exports.read = function(request, response){
    if (!request.session.userid) {
        response.write('<script>alert("you need to sign in")</script>');
        return response.write('<script>location.href="/";</script>');
    }
    var _url = request.url;
    let boardId = request.params.boardId;
    let questionNo = request.params.questionNo;
    db.query(`SELECT board_id, no, datetime, updated_datetime, user_id, title, content, u.nickname, u.image, b.name as board_name FROM questionstbl left JOIN usertbl u on questionstbl.user_id = u.id left join boardtbl b on questionstbl.board_id = b.id where board_id = ? AND no = ?`,[boardId, questionNo], function(error, question){
        if(error){
            throw error;
        }
        //답변글
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
                        let userid = request.session.userid;
                        db.query(`SELECT * FROM usertbl WHERE id=?`, [userid], function(error5, userinfo) {
                            if(error5){
                                throw error5;
                            }
                            db.query(`SELECT answ_no, COUNT(*) as likeCnt FROM liketbl WHERE board_id=? AND quest_no=? GROUP BY answ_no ORDER BY answ_no`,[boardId, questionNo], function(error6, like){
                                if(error6){
                                    throw error6;
                                }
                                db.query(`SELECT * FROM liketbl WHERE board_id=? AND quest_no=?`,[boardId, questionNo], function(error7, likeMe){
                                    if(error7){
                                        throw error7;
                                    }
                                let loginUserNickname = userinfo[0].nickname;
                                let loginUserImage = userinfo[0].image;
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
                                    like,
                                    likeMe,
                                    loginUserNickname,
                                    loginUserImage,
                                    userinfo:userinfo,
                                }
                                let writer = request.session.userid === data.user_id
                                let html = qTemplate.question_read(data, writer);
                                response.writeHead(200);
                                response.end(html);
                            })
                        })
                    })
                })
            });
        })
    })
}

exports.create = function (request, response){
    if (!request.session.userid) {
        response.write('<script>alert("you need to sign in")</script>');
        return response.write('<script>location.href="/";</script>');
    }
    let data = request.params;

    db.query(`SELECT name as board_name, id as board_id FROM boardtbl WHERE id=?`
        ,[data.boardId],
        function(error, board){
            if(error){
                throw error;
            }
            data = {
                loginUserImage :request.session.image,
                loginUserNickname : request.session.nickname,
                board_id : data.boardId,
                ...data,
                ...board[0]
            }
            let html = qTemplate.question_create(data)
            response.writeHead(200)
            response.end(html);
        })

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
        const timeSource = new Date();
        let dateObj = new Date(timeSource);
        db.query(`INSERT INTO questionstbl (board_id, no, datetime, updated_datetime, user_id, title, content)
                    VALUES(?, ?, ?, ?, ?, ?, ?)`,
            [data.boardId, maxNo[0].maxNo+1, dateObj, dateObj, userId, data.title, JSON.stringify(content)],
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
exports.update_process = function(request, response){

    var data = request.body;
    let content = {
        text : data.content.trim(),
        code : data.codeContent.trim(),
    }
    const timeSource = new Date();
    let dateObj = new Date(timeSource);
    db.query('UPDATE questionstbl SET title=?, content=?, updated_datetime=? WHERE board_id = ? AND no = ?',
        [data.title.trim(), JSON.stringify(content), dateObj, data.boardId, data.questionNo],
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
        const timeSource = new Date();
        let dateObj = new Date(timeSource);
        if(scrap.length === 0){
            db.query(`INSERT INTO scraptbl (user_id, board_id, quest_no, datetime)
                      VALUES(?, ?, ?, ?)`,
                [ userId, data.boardId, data.questNo, dateObj],
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


//답변글
exports.anscreate_process = function(request, response){
    var data = request.body;
    let content = {
        text : data.content.trim(),
        code : data.codeContent.trim(),
    }
    let userId = request.session.userid;
    db.query(`SELECT MAX(no) as maxNo FROM answerstbl WHERE board_id=? AND quest_no=?`,[data.boardId, data.questNo], function(error2, maxNo){
        if(error2){
            throw error2;
        }
        const timeSource = new Date();
        let dateObj = new Date(timeSource);
        db.query(`INSERT INTO answerstbl (board_id, quest_no, no, user_id, datetime, title, content)
                VALUES(?, ?, ?, ?, ?, ?, ?)`,
        [data.boardId, data.questNo, maxNo[0].maxNo+1, userId, dateObj, data.title, JSON.stringify(content)],
        function(error, result){
            if(error){
                throw error;
            }
            response.writeHead(302, {Location: `/qna/${data.boardId}/${data.questNo}}`});
            response.end();
        })
    })
}
exports.ans_delete_process = function(request, response){
    var data = request.body;
    let userId = request.session.userid

    db.query('DELETE FROM answerstbl WHERE board_id = ? AND user_id=? AND quest_no=? AND no = ?',
        [data.board_id, userId, data.quest_no, data.no],
        function(error, result){
            if(error){
                alert("삭제할 수 없습니다.");
                throw error;
            }
            response.status(200).json(true);
        });
}
exports.ans_update_process = function(request, response){

    var data = request.body;
    let content = {
        text : data.content.trim(),
        code : data.codeContent.trim(),
    }
    const timeSource = new Date();
    let dateObj = new Date(timeSource);
    db.query('UPDATE answerstbl SET title=?, content=?, updated_datetime=? WHERE board_id = ? AND quest_no=?  AND no = ?',
        [data.title.trim(), JSON.stringify(content), dateObj, data.board_id, data.quest_no, data.no],
        function(error, result){
            if(error){
                throw error;
            }
            response.writeHead(302, {Location: `/qna/${data.board_id}/${data.quest_no}`});
            response.end();
        })
}
exports.adoption = function(request, response){
    var data = request.body;
    console.log(data)
    let userId = request.session.userid;
    db.query(`UPDATE answerstbl SET point=?, adoption=? WHERE  board_id=? AND quest_no=? AND no=?`,
    [data.adoptPoint, 1, data.boardId, data.questNo, data.no],
    function(error, result){
        if(error){
            throw error;
        }
        response.writeHead(302, {Location: `/qna/${data.boardId}/${data.questNo}}`});
        response.end();
    })
}

exports.like = function(request, response){
    var data = request.body;
    let userId = request.session.userid

    // console.log(data)
    db.query(`SELECT * FROM liketbl WHERE board_id=? AND quest_no=? AND answ_no=? AND user_id=?`,
        [data.boardId, data.questNo, data.answNo, userId],
        function(error, like) {
        if (error) {
            throw error;
        }
        const timeSource = new Date();
        let dateObj = new Date(timeSource);
        if(like.length === 0){
            db.query(`INSERT INTO liketbl (user_id, board_id, quest_no, answ_no, datetime)
                      VALUES(?, ?, ?, ?, ?)`,
                [userId, data.boardId, data.questNo, data.answNo, dateObj],
                function(error2, result){
                    if(error2){
                        throw error2;
                    }
                    return response.status(200).json(result)
                }
            )
        } else {
            db.query(`DELETE FROM liketbl WHERE board_id=? AND quest_no=? AND answ_no=? AND user_id=?`,
                [data.boardId, data.questNo, data.answNo, userId],
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