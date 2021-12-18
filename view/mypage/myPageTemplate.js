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
            <button id="logout_btn" style="cursor: pointer;" onclick="location.href='mainPage.html'">로그아웃</button>
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
    myQuests:function(questions) {
        let i = 0;
        let result = '';
        let maxi = 3;
        if (questions.length < 3) maxi = questions.length;
        while (i < maxi) {
            result += `
            <div class="myQuestPost" style="cursor: pointer;">
                <div id="myQuestPost_info">
                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                    <div class="myQuestPost_title">${questions[i].title}</div>
                    <p class="myQuestPost_time">${this.parseDate(questions[i].datetime)}</p>
                </div>
                <div class="myQuestPost_contents">
                    <P class="myQuestPost_content">${questions[i].content}</P>
                </div>
            </div>
            `;
            i++;
        }
        return result;
    },
    myAnswerQuests:function(questions) {
        let i = 0;
        let result = '';
        let maxi = 3;
        if (questions.length < 3) maxi = questions.length;
        while (i < maxi) {
            result += `
            <div class="myAnswPost" style="cursor: pointer;">
                <div id="myAnswPost_info">
                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                    <div class="myAnswPost_title"><p class="userPost_title">${questions[i].title}</p></div>
                    <div class="myAnswPost_writer">${questions[i].nickname}</div>
                    <p class="myAnswPost_time">${this.parseDate(questions[i].datetime)}</p>
                </div>
                <div class="myAnswPost_contents">
                    <P class="myAnswPost_content">${questions[i].content}</P>
                </div>
            </div>

            `;
            i++;
        }
        return result;
    },
    myScraps:function(questions){
        let i = 0;
        let result = '';
        let maxi = 3;
        if (questions.length < 3) maxi = questions.length;
        while (i < maxi) {
            result += `
                <div class="myScrapPost" style="cursor: pointer;">
                <div id="myScrapPost_info">
                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                    <div class="myScrapPost_title"><p class="userPost_title">${questions[i].title}</p></div>
                    <div class="myScrapPost_writer">${questions[i].nickname}</div>
                    <p class="myScrapPost_time">${this.parseDate(questions[i].datetime)}</p>
                </div>
                <div class="myScrapPost_contents">
                    <P class="myScrapPost_content">${questions[i].content}</P>
                </div>
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
            <div class="myLikePost" style="cursor: pointer;">
                <div id="myLikePost_info">
                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                    <div class="myLikePost_title"><p class="userPost_title">${answers[i].title}</p></div>
                    <div class="myLikePost_writer">${answers[i].nickname}</div>
                    <p class="myLikePost_time">${this.parseDate(answers[i].datetime)}</p>
                </div>
                <div class="myLikePost_contents">
                    <P class="myLikePost_content">${answers[i].content}</P>
                </div>
            </div>
            `;
            i++;
        }
        return result;
    },
    container:function(navhtml, userinfohtml, questionshtml, myanswerquestshtml, myscraphtml, mylikehtml){
        return `
        <!DOCTYPE html>
        <head>
            <meta charset="utf-8">
            <title>마이페이지</title>
            <link rel="stylesheet" type="text/css" href="/css/mypage/myPage.css">
            <link rel="stylesheet" type="text/css" href="/css/nav.css">
        </head>
        <body>
            <div id="wrap">
                <div id="nav">
                    <div id="menu">
                        <img id="menuicon" src="/image/hamburgerbar2.png" alt="menu" onClick="menuClick()" style="cursor: pointer;">
                        <img id="menuiconX" src="/image/X.png" onClick="menuClick()" style="visibility: hidden; cursor: pointer;">
                        <div id="menuList" style="visibility: hidden;">
                            <ul id="hamburger_menu">
                                <div id="toHome" style="cursor:pointer;" onClick="location.href='../mainPage.html'">
                                    <img class="menu_icon" src="/image/home.png">
                                    <li class="bigMenu"><a href="../..">Home</a></li>
                                </div>
                                <div id="recentlyAsked">
                                    <img class="menu_icon" src="/image/chat.png">
                                    <li class="bigMenu"><a href="../..">최근 질문 보기</a></li>
                                </div>
                                <div id="postQuest">
                                    <img class="menu_icon" src="/image/pencil.png">
                                    <li class="bigMenu"><a href="../..">질문 작성하기</a></li>
                                </div>
                                <div id="posts">
                                    <img class="menu_icon" src="/image/tag.png">
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
                            <img id="search_icon" src="/image/searchicon.png" alt="search">
                            <input id="search_query" type="text">
                            <button id="search_btn" style="cursor:pointer;">search</button>
                        </form>
                    </div>
                    ${navhtml}
                </div>
                <div id="contents">
                    <div id="userInfo">
                        <img id="usrProfImgBig" src="내사진.jpg" alt="userpng">
                        <table id="userInfoTable">
                        ${userinfohtml}
                        </table>
                        <button id="userInfoEdit_btn" style="cursor: pointer;">편집</button>
                    </div>
                    <hr style="width: 80%; margin: 0 auto; margin-bottom: 20px; border: solid 1px #A1A1A1">
                    <div id="userPost">
                        <p class="userPost_label">최근 내가 질문 한 글</p>
                        <div id="myQuest">
                            ${questionshtml}
                            <!--<img src="점점점.png" style="width:150px; height: 50px; float:left; margin-top: 115px;">-->
                        </div>
                        <p class="userPost_label" style="cursor: pointer;">최근 내가 답변 한 글</p>
                        <div id="myAnsw">
                            ${myanswerquestshtml}
                        </div>
                        <p class="userPost_label" style="cursor: pointer;">즐겨찾기한 글</p>
                        <div id="myScrap">
                            ${myscraphtml}
                        </div>
                        <p class="userPost_label" style="cursor: pointer;">좋아요한 답변</p>
                        <div id="myLike">
                            ${mylikehtml}
                        </div>
                    </div>
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