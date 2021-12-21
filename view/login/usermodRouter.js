const express = require('express');
const router  = express.Router();
const template = require('./usermodTemplate.js');
const db =  require('../../db.js');

var multer = require('multer'); // multer모듈 적용 (for 파일업로드)
// var upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
})
var upload = multer({ storage: storage })

router.get('/', function(request, response) {
    // console.log(request.session);
    if ( request.session.authenticate == undefined || request.session.authenticate == false) { 
        return response.redirect('/login'); 
    };
    let userid = request.session.userid;
    db.query(`SELECT * FROM usertbl WHERE id=?`, [userid], function(error, userinfo) {
        let user_nickname = userinfo[0].nickname;
        let user_belong = userinfo[0].belong;
        let user_image = userinfo[0].image;
        return response.send(template.container(userid, user_nickname, user_belong, user_image));
    });
});

router.post('/modprocess', upload.single('click_image'), function(request, response){
    let userid = request.session.userid;
    let nickname = request.body.user_nickname; 
    let belong = request.body.user_belong;
    let currentpwd = request.body.user_current_pwd;
    let newpwd = request.body.user_new_pwd;
    let newpwdcheck = request.body.user_pwcheck;
    let filename;
    if(request.file == undefined) filename = request.session.image;
    else {filename = request.file.filename ? request.file.filename : ''}
    if (newpwd !== newpwdcheck) {   
        response.write("<script>alert('passwords not same.')</script>");
        return response.write("<script>window.location='/modify'</script>");
    }
    db.query(`SELECT nickname, password FROM usertbl where id = ?`, [userid], function(error, userinfo) {
        var userinfo = userinfo[0];
        if (currentpwd !== userinfo.password) {    //비밀번호 입력 잘못 했을 때
            response.write("<script>alert('not correct password')</script>");
            return response.write("<script>window.location='/modify'</script>");
        } else {
            db.query(`UPDATE usertbl SET nickname=?, image=?, password=?, belong=? WHERE id = ? `, [nickname, filename, newpwd, belong, userid], function(error, result) {
                if (error) {    //수정 실패
                    console.log(error); 
                    response.write("<script>alert('error')</script>"); 
                    return response.write("<script>window.location='/modify'</script>");
                }
                request.session.nickname = nickname;
                request.session.image = filename;
                //수정 성공
                // response.write("<script>alert('success')</script>");                
                // return response.write("<script>window.location='/myPage'</script>");
                return response.redirect('/myPage');
            });
        }
    });
});

module.exports = router;