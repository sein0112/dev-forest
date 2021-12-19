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
        <center>
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
                    <input type="submit" value="로그인" class="submit_btn">
                </form>
            </div>
            </center>
        </body>

        </html>
        `;
    }
}