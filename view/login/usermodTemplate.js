
module.exports={
    container: function(userid, usernickname, userbelong,image) {
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
                <form class="container" action="/modify/modprocess" method="post" enctype="multipart/form-data">
                    <div class="insert_image">
                        <img id="userImgId" src="/uploads/${image}" class="user_image"/>
                        <div>
                            <div class="image_button"><label for="click_image">이미지 선택</label></div>
                            <input type="file" id="click_image" name="click_image" accept="image/*" onchange="loadFile(event)">
                            
                        </div>
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
                    <div>
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
                        <input type="submit" value="저장" class="save_btn">
                    </div>
                    
                </div>
            </body>
            
            </html>
            <script>
            function loadFile(event) {
                let reader = new FileReader();

                console.log(event)
                reader.onload = function(event) { 
                    document.querySelector("#userImgId").setAttribute("src", event.target.result); 
                }; 
                reader.readAsDataURL(event.target.files[0]);
                
            }

            </script>
        `;
    }
}