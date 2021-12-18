module.exports={
    container: function() {
        return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>login</title>
            <link rel="stylesheet" type="text/css" href="/css/login/login.css">
        </head>

        <body class="login">
            <div class="container">
                <div class="logo">
                    <img src="/image/forest.png" class="logo">
                </div>
                <h1 class="project_name">개발자의 숲</h1>
                <div class="line">
                    <img src="/image/line.png"
                        style="margin-left: 20px; margin-right:20px; margin-top: 15px; width: 360px; height: 1.5px;">
                </div>
                <form action="/login/loginprocess" method="post">
                    <input type="text" name="user_email" class="text_input" placeholder="아이디">
                    <input type="password" name="user_pw" id="user_pw" class="text_input" placeholder="비밀번호">
                    <div class="checkbox">
                        <img src="/image/checkbox.png" vertical-align="middle" height="20px" width="20px" margin-left="20px"
                            margin-top="100px">
                        <a href="rememberid_links">아이디 기억하기</a>
                    </div>
                    <input type="submit" value="로그인" class="submit_btn">
                </form>
                <p class="login_links">
                    <a href="findID.html">아이디 찾기 | </a>
                    <a href="resetPW.html">비밀번호 변경</a>
                </p>
            </div>
        </body>

        </html>
        `;
    }
}