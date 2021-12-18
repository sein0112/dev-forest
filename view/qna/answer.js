const template = require('./ansTemplate.js');
const db = require('./../../db.js');

exports.container = function(request, response) {
        let html;
        //게시판ID와 게시글NO의 값을 받아와야함. 일단 임시로 1,1로 지정함.
        let boardId = 5, qusetNo = 1;
        db.query('SELECT * FROM usertbl JOIN answerstbl ON usertbl.id = answerstbl.user_id WHERE answerstbl.board_id=? AND answerstbl.quest_no=?', [boardId, qusetNo], function(error, answer) {
            if(error) console.log(error);
            else{
                html = template.HTML(answer);
            }
            response.send(html);
        });
}


exports.like = function(request, response){
    var data = request.body;

    console.log(data)
    db.query(`SELECT * FROM liketbl WHERE board_id=? AND quest_no=? AND answ_no=? AND user_id=?`,
        [data.boardId, data.questNo, data.answNo, data.userId],
        function(error, like) {
        if (error) {
            throw error;
        }

        if(like.length === 0){
            db.query(`INSERT INTO liketbl (user_id, board_id, quest_no, answ_no=?, datetime)
                      VALUES(?, ?, ?, NOW())`,
                [data.userId, data.boardId, data.questNo, data.answNo],
                function(error2, result){
                    if(error2){
                        throw error2;
                    }
                    return response.status(200).json(result)
                }
            )
        } else {
            db.query(`DELETE FROM liketbl WHERE board_id=? AND quest_no=? AND answ_no=? AND user_id=?`,
                [data.boardId, data.questNo, data.answNo, data.userId],
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