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
            <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
            
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
                    
                    <div >
                        <input type="text" name="user_email" id="firstFormUserId" class="text_email" placeholder="이메일" value="${idBeforeCheck}">
                        <input id="checkEmail" type="button" name="email_check" value="중복조회" class="doublecheck_btn">
                        <p id="checking" style="color: red">${loginChecked}</p>
                    </div>

                    <form action="/register/registerprocess" method="post">
                        <input type="hidden" name="user_id" id="secondFormUserId" value="${idBeforeCheck}">
                        <input required type="text" name="user_nickname" id="user_nickname" class="text_input" placeholder="닉네임">
                        <input type="text" name="user_belong" id="user_group" class="text_input" placeholder="소속">
                        <input required type="password" onkeyup="checkSamePw(this)" name="user_pwd" id="user_pw" class="text_input" placeholder="비밀번호">
                        <div class="pw_info">
                            <p class="pw_info">*영문, 숫자 조합으로 8~20자 사이로 입력하세요.</p>
                        </div>
                        <input required type="password" id="user_dbpw" onkeyup="checkSameDPw(this)" class="text_dbpw" placeholder="비밀번호 확인">
                        <div id="pwRedInfo" class="pw_info" style="display: none;">
                            <p class="pw_info" style="color: #ff0000">*비밀번호가 일치하지 않습니다.</p>
                        </div>
                        <input disabled type="submit" id="submitRegister" value="회원가입" class="register_btn">
                    </form>
                </div>
            </body>
            <script>
                function checkSameDPw(target) {
                  let user_pw = document.getElementById('user_pw').value;
                  console.log(user_pw, target.value)
                  let chcking = document.getElementById("checking").innerHTML
                  if(user_pw !== target.value || chcking !== "Success"){
                    document.getElementById("pwRedInfo").style.display = "block"
                    document.getElementById("submitRegister").disabled = true;
                  } else {
                    document.getElementById("pwRedInfo").style.display = "none"
                    document.getElementById("submitRegister").disabled = false;
                  }
                }
                function checkSamePw(target) {
                  let user_pw = document.getElementById('user_dbpw').value;
                  console.log(user_pw, target.value)
                  let chcking = document.getElementById("checking").innerHTML
                  if(user_pw !== target.value || chcking !== "Success"){
                    document.getElementById("pwRedInfo").style.display = "block"
                    document.getElementById("submitRegister").disabled = true;
                  } else {
                    document.getElementById("pwRedInfo").style.display = "none"
                    document.getElementById("submitRegister").disabled = false;
                  }
                }
                   
                    
                $("#checkEmail").click(function() {
                    var user_email = document.getElementById('firstFormUserId').value;
                    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                      if (user_email.match(regExp) != null) {
                        $.ajax({
                                url: "/register/emailcheck",
                                data: { user_email },
                                method: "post", 
                                dataType: "json" 
                            })
                            .done(function(res) {
                                if(res.data){
                                    document.getElementById("firstFormUserId").disabled = true;
                                    document.getElementById('secondFormUserId').value = user_email;
                                    document.getElementById("checking").innerHTML = res.message;
                                    document.getElementById("checking").style.color = "green";
                                    document.getElementById("submitRegister").disabled = false;
                                }else {
                                    document.getElementById("firstFormUserId").disabled = false;
                                    document.getElementById("checking").innerHTML = res.message;
                                    document.getElementById("checking").style.color = "red";
                                    document.getElementById("submitRegister").disabled = true;
                                }
                            })
                            .fail(function(xhr, status, errorThrown) {
                                console.log("error >>>>>>>>>> ",errorThrown)
                            })
                      }
                      else {
                        alert('이메일 형식에 맞게 입력해주세요.');
                      }
                            
                });
            </script>
        </html>
        `;
    }
}