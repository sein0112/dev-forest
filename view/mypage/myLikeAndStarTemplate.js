module.exports = {
    parseDate:function(date) {
        let result='';
        let datelist = date.toString().split(' ');
        result += datelist[3] + "/" + datelist[1] + "/" + datelist[2];
        return result;
    },

    nav:function(userinfo) {
        return `                    
        <div id="nav_userInfo">
            <img id="usrProfImg" src="#" alt="userpng">
            <p id="usrNname"><b>${userinfo.nickname}</b></p>
            <div id ="logoutform">
                <form action='/login/logoutprocess' method='post'>
                    <input type="submit" value="로그아웃" id="logout_btn" style="cursor: pointer;">
                </form>
            </div>
        </div>
        `;
    },
    userinfotohtml:function(userinfo) {
        return `
            <tbody>
            <tr class="userInfo_label userInfo_center">
                <td colspan="4">이메일</td>
            </tr>
            <tr class="userInfo_center userRealInfo">
                <td colspan="4">${userinfo.id}</td>
            </tr>
            <tr class="userInfo_label">
                <td>닉네임</td>
                <td>소속</td>
                <td>등급</td>
                <td>포인트</td>
            </tr>
            <tr class="userRealInfo">
                <td>${userinfo.nickname}</td>
                <td>${userinfo.belong}</td>
                <td>${userinfo.name}</td>
                <td>포인트</td>
            </tr>
            <tr></tr>
        </tbody>
        `;
    },
    
    myScraps:function(questions){
        let i = 0;
        let result = '';
        let maxi = 3;
        if (questions.length < 3) maxi = questions.length;
        while (i < maxi) {
            result += `
            <img class="profile" src="1.jpg" style=" border-radius: 8px; margin-left: 5px; margin-top: 5px;">
            <div style="display: inline-block; margin-left: 70px; ">
                <h3 style="position:relative; margin-top:6px; font-size: 24px;">
                    ${questions[i].title}<small style="position:relative; display: block; font-size: 14px; font-weight: normal; color: grey;">${questions[i].nickname}<span>  |   ${this.parseDate(questions[i].datetime)}</span></small>
                </h3>
            </div>
            
            <p class="question">
                ${questions[i].content}
            </p>

            <div>
                <img class="starImage" src="../../asset/image/Plain_Yellow_Star.png">
                <p class="staredPerson">86</p>
            </div>
            `;
            i++;
        }
        return result;
    },
    myLikes:function(answers){
        let i = 0;
        let result = '';
        let maxi = 3;
        if (answers.length < 3) maxi = answers.length;
        while (i < maxi) {
            result += `
            <img class="profile" src="1.jpg" style=" border-radius: 8px; margin-left: 5px; margin-top: 5px;">
            <div style="display: inline-block; margin-left: 70px; ">
                <h3 style="position:relative; margin-top:6px; font-size: 24px;">
                    ${answers[i].title}<small style="position:relative; display: block; font-size: 14px; font-weight: normal; color: grey;">${answers[i].nickname}<span>  |   ${this.parseDate(answers[i].datetime)}</span></small>
                </h3>
            </div>
            
            <p class="question">
                ${answers[i].content}
            </p>

            <div>
                <img class="starImage" src="../../asset/image/Plain_Yellow_Star.png">
                <p class="staredPerson">86</p>
            </div>
            `;
            i++;
        }
        return result;
    },
    container:function(navhtml, userinfohtml, myscraphtml, mylikehtml){
        return `
        <!DOCTYPE html>
        <head>
            <meta charset="utf-8">
            <title>마이페이지 - 내가 좋아요 / 즐겨찾기 한 글</title>
            <link rel="stylesheet" href="../../asset/css/mypage/myPage.css">
            <link rel="stylesheet" href="../../asset/css/nav.css">
            <link rel="stylesheet" href="../../asset/css/mypage/myPageDetails.css">

        </head>
        <body>
            <div id="wrap">
                <div id="nav">
                    <div id="menu">
                        <img id="menuicon" src="../../asset/image/hamburgerbar2.png" alt="menu" onClick="menuClick()" style="cursor: pointer;">
                        <img id="menuiconX" src="../../asset/image/X.png" onClick="menuClick()" style="visibility: hidden; cursor: pointer;">
                        <div id="menuList" style="visibility: hidden;">
                            <ul id="hamburger_menu">
                            <div id="toHome" style="cursor:pointer;" onClick="location.href='../mainPage.html'">
                                <img class="menu_icon" src="../../asset/image/home.png">
                                <li class="bigMenu"><a href="../..">Home</a></li>
                            </div>
                            <div id="recentlyAsked">
                                <img class="menu_icon" src="../../asset/image/chat.png">
                                <li class="bigMenu"><a href="../..">최근 질문 보기</a></li>
                            </div>
                            <div id="postQuest">
                                <img class="menu_icon" src="../../asset/image/pencil.png">
                                <li class="bigMenu"><a href="../..">질문 작성하기</a></li>
                            </div>
                            <div id="posts">
                                <img class="menu_icon" src="../../asset/image/tag.png">
                                <li class="bigMenu"><a href="../..">게시판</a></li>
                                <div id="tags">
                                    <a href="../.." class="left">javasript</a>
                                    <a href="../.." class="right">ruby</a>
                                    <a href="../.." class="left">python</a>
                                    <a href="../.." class="right">swift</a>
                                    <a href="../.." class="left">java</a>
                                    <a href="../.." class="right">arrays</a>
                                    <a href="../.." class="left">php</a>
                                    <a href="../.." class="right">c</a>
                                    <a href="../.." class="left">android</a>
                                    <a href="../.." class="right">asp.net</a>
                                    <a href="../.." class="left">html</a>
                                    <a href="../.." class="right">.net</a>
                                    <a href="../.." class="left">jquery</a>
                                    <a href="../.." class="right">sql</a>
                                    <a href="../.." class="left">css</a>
                                    <a href="../.." class="right">r</a>
                                    <a href="../.." class="left">mysql</a>
                                    <a href="../.." class="right">sql-server</a>
                                    <a href="../.." class="left">c++</a>
                                    <a href="../.." class="right">swift</a>
                                    <a href="../.." class="left">reactjs</a>
                                    <a href="../.." class="right">ajax</a>
                                    <a href="../.." class="left">ios</a>
                                    <a href="../.." class="right">pandas</a>
                                    <a href="../.." class="left">node.js</a>
                                    <a href="../.." class="right">linux</a>
                                    <a href="../.." class="left">django</a>
                                    <a href="../.." class="right">angularjs</a>
                                </div>
                            </div>
                        </ul>                        
                    </div>
                </div>
                <div id="search">
                    <form action="/">
                        <img id="search_icon" src="../../asset/image/searchicon.png" alt="search">
                        <input id="search_query" type="text">
                        <button id="search_btn" style="cursor:pointer;">search</button>
                    </form>
                </div>
                ${navhtml}
                <div id="userInfo">
                <img id="usrProfImgBig" src="내사진.jpg" alt="userpng">
                <table id="userInfoTable">
                ${userinfohtml}
                </table>
                <button id="userInfoEdit_btn" style="cursor: pointer;" onClick="location.href='/modify'">편집</button>
            </div>
            </div>

            <div class="bulletin">
                <img src="../../asset/image/homeWithNoBack.png" width="35px" height="35px" style="float: left; margin-top: 5px;">
                <p style="margin-top:12px; margin-left: 10px; float: left; text-align: left;">
                    <a href="myPage.html", style="color: black;">마이페이지</a> - <span>내가 질문한 글 / 내가 답변한 글</span></p>
            </div>


            <div class="box1-group", style="margin-top: 10px;">
                <span class ="box1", style="margin-left: 0px;">
                    ${myscraphtml}
                </span>
        
                <span class ="box1", style="margin-left: 15px; margin-right: 15px;">
                    ${myscraphtml}
                </span>
                
                <span class ="box1", style="margin-left: 0px; margin-right: 0px;">
                    ${myscraphtml}
                </span>
            </div>
        
            <div class="box1-group", style="margin-top: 20px;">
                <span class ="box1", style="margin-left: 0px;">
                    ${myscraphtml}
                </span>
        
                <span class ="box1", style="margin-left: 15px; margin-right: 15px;">
                    ${myscraphtml}
                </span>
                
                <span class ="box1", style="margin-left: 0px; margin-right: 0px;">
                    ${myscraphtml}
                </span>
            </div>
        
            <button style="width:200px; height:55px; margin-left: 690px; margin-right: auto; margin-top: 40px; background-color: #e5e5e5; border: 0px;">
                <img src="../../asset/image/more.png" style="position:absolute; width: 100px; height: auto; margin-left: -50px; margin-top: -15px;">
        </div>
        </div>
    </body>
    <script>
        function menuClick(){
            var toggle = document.getElementById('menuList').style.visibility;
            if (toggle === 'hidden'){
                document.getElementById('menuList').style.visibility = 'visible';
                document.getElementById('menuiconX').style.visibility = 'visible';
            }
            else{
                document.getElementById('menuList').style.visibility = 'hidden';
                document.getElementById('menuiconX').style.visibility = 'hidden';
            }
        }
    </script>
</html>
        `;
    }
}