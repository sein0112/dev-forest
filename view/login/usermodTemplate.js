module.exports={
    container: function(userid, usernickname, userbelong) {
        return`
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>modification</title>
                <link rel="stylesheet" type="text/css" href="/css/login/modification.css">
            </head>
            
            <body class="modification">
                <div class="container">
                    <div class="insert_image">
                        <img src="/image/user_image.png" class="user_image"/>
                        <form method="post" enctype="multipart/form-data">
                            <div class="image_button"><label for="click_image">이미지 선택</label></div>
                            <input type="file" id="click_image" name="click_image" accept="image/*" onchange="loadFile(this)">
                        </form>
                    <div class="line">
                        <img src="/image/line.png"
                            style="margin-left: 20px; margin-right:20px; margin-top: 10px; width: 1250px; height: 1.5px;">
                    </div>
                    <p class="list_name">이메일</p>
                    <div class="user_">
                        <div class="user_id" id="user_id" name="user_id">
                            <p class="user_id">${userid}</p>
                        </div>
                    </div>
                    <form action="/modify/modprocess" method="post">
                        <p class="list_name">닉네임</p>
                        <input type="text" name="user_nickname" class="list_blank" value="${usernickname}">
                        <p class="list_name">소속</p>
                        <input type="text" name="user_belong" class="list_blank" value="${userbelong}">
                        <p class="list_name">현재 비밀번호</p>
                        <input type="text" name="user_current_pwd" class="list_blank" placeholder="현재 비밀번호">
                        <p class="list_name">새로운 비밀번호</p>
                        <input type="text" name="user_new_pwd" class="list_blank" placeholder="새로운 비밀번호">
                        <p class="pw_info">*영문, 숫자 조합으로 8~20자 사이로 입력하세요.</p>
                        <p class="list_name">비밀번호 확인</p>
                        <input type="text" name="user_pwcheck" class="list_blank" placeholder="비밀번호 확인">
                        <p class="warn_info">*비밀번호가 일치하지 않습니다.</p>
                        <input type="submit" value="저장" class="save_btn">
                    </form>
                    
                </div>
            </body>
            
            </html>
        `;
    }
}