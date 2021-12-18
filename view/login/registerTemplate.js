module.exports ={
    container: function(idBeforeCheck, loginChecked) {
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>register</title>
                <link rel="stylesheet" , href="/css/login/register.css">
            </head>
            
            <body class="register">
                <div class="container">
                    <div class="logo">
                        <img src="/image/forest.png" class="logo_title"/>
                    </div>
                    <div class="title_name" style="float: left;">
                        <p>개발자의 숲</p>
                    </div>
                    <h3 class="register_info">회원 가입</h3>
                    <div class="register_check">
                        <h4 class="register_user">이미 개발자의 숲 회원이신가요?</h4>
                        <p class="check_link">
                            <a href="login.html" class="login_checking">로그인</a>
                        </p>
                    </div>
                    <div class="line">
                        <img src="/image/line.png"
                            style="margin-left: 20px; margin-right:20px; margin-top: 15px; width: 460px; height: 1.5px;">
                    </div>
                    
                    <form action="/register/emailcheck" method="post">
                        <input type="text" name="user_email" id="firstFormUserId" class="text_email" placeholder="이메일" value="${idBeforeCheck}">
                        <input type="submit" name="email_check" value="중복조회" class="doublecheck_btn" onClick="copyId()">
                        <p id="checking">${loginChecked}</p>
                    </form>

                    <form action="/register/registerprocess" method="post">
                        <input type="hidden" name="user_id" id="secondFormUserId" value="${idBeforeCheck}">
                        <input type="text" name="user_nickname" id="user_nickname" class="text_input" placeholder="닉네임">
                        <input type="text" name="user_belong" id="user_group" class="text_input" placeholder="소속">
                        <input type="password" name="user_pwd" id="user_pw" class="text_input" placeholder="비밀번호">
                        <div class="pw_info">
                            <p class="pw_info">*영문, 숫자 조합으로 8~20자 사이로 입력하세요.</p>
                        </div>
                        <input type="password" id="user_dbpw" class="text_dbpw" placeholder="비밀번호 확인">
                        <input type="submit" value="회원가입" class="register_btn" onClick="checkLoginChecked()">
                    </form>
                </div>
            </body>
            <script>
                function copyId() {
                    var firstFormUserIdValue = document.getElementById('firstFormUserId').value;
                    document.getElementById('secondFormUserId').value = firstFormUserIdValue;
                }

                function checkLoginChecked() {
                    var checked = document.getElementById('checking').value;                      
                    if(checked != "Success") { //체크 안됨
                        alert('아이디 중복 체크를 하십시오');
                        break;
                    } else {return;}
                }
            </script>
        </html>
        `;
    }
}