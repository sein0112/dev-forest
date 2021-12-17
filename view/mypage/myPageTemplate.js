module.exports = {
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
    myQuests:function(userinfo) {
        return `
        <div class="myQuestPost" style="cursor: pointer;">
            <div id="myQuestPost_info">
                <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                <div class="myQuestPost_title">Lorem ipsum, dolor sit amet consectetur</div>
                <p class="myQuestPost_time">2021/11/11</p>
            </div>
            <div class="myQuestPost_contents">
                <P class="myQuestPost_content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis voluptas nulla, libero, tempora debitis nihil laboriosam beatae placeat nostrum illum eveniet quis reiciendis quaerat necessitatibus, expedita harum odio minima et?</P>
            </div>
        </div>
        `;
    },
    container:function(navhtml, userinfohtml){
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
                            <div class="myQuestPost" style="cursor: pointer;">
                                <div id="myQuestPost_info">
                                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                                    <div class="myQuestPost_title">Lorem ipsum, dolor sit amet consectetur</div>
                                    <p class="myQuestPost_time">2021/11/11</p>
                                </div>
                                <div class="myQuestPost_contents">
                                    <P class="myQuestPost_content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis voluptas nulla, libero, tempora debitis nihil laboriosam beatae placeat nostrum illum eveniet quis reiciendis quaerat necessitatibus, expedita harum odio minima et?</P>
                                </div>
                            </div>
                            <div class="myQuestPost" style="cursor: pointer;">
                                <div id="myQuestPost_info">
                                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                                    <div class="myQuestPost_title">Lorem ipsum, dolor sit amet consectetur</div>
                                    <p class="myQuestPost_time">2021/11/11</p>
                                </div>
                                <div class="myQuestPost_contents">
                                    <P class="myQuestPost_content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis voluptas nulla, libero, tempora debitis nihil laboriosam beatae placeat nostrum illum eveniet quis reiciendis quaerat necessitatibus, expedita harum odio minima et?</P>
                                </div>
                            </div>
                            <div class="myQuestPost" style="cursor: pointer;">
                                <div id="myQuestPost_info">
                                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                                    <div class="myQuestPost_title">Lorem ipsum, dolor sit amet consectetur</div>
                                    <p class="myQuestPost_time">2021/11/11</p>
                                </div>
                                <div class="myQuestPost_contents">
                                    <P class="myQuestPost_content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis voluptas nulla, libero, tempora debitis nihil laboriosam beatae placeat nostrum illum eveniet quis reiciendis quaerat necessitatibus, expedita harum odio minima et?</P>
                                </div>
                            </div>
                            <!--<img src="점점점.png" style="width:150px; height: 50px; float:left; margin-top: 115px;">-->
                        </div>
                        <p class="userPost_label" style="cursor: pointer;">최근 내가 답변 한 글</p>
                        <div id="myAnsw">
                            <div class="myAnswPost" style="cursor: pointer;">
                                <div id="myAnswPost_info">
                                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                                    <div class="myAnswPost_title"><p class="userPost_title">내가 답변한 글</p></div>
                                    <div class="myAnswPost_writer">작성자작성자wkd</div>
                                    <p class="myAnswPost_time">2021/11/11</p>
                                </div>
                                <div class="myAnswPost_contents">
                                    <P class="myAnswPost_content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis voluptas nulla, libero, tempora debitis nihil laboriosam beatae placeat nostrum illum eveniet quis reiciendis quaerat necessitatibus, expedita harum odio minima et?</P>
                                </div>
                            </div>
                        </div>
                        <p class="userPost_label" style="cursor: pointer;">즐겨찾기한 글</p>
                        <div id="myScrap">
                            <div class="myScrapPost" style="cursor: pointer;">
                                <div id="myScrapPost_info">
                                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                                    <div class="myScrapPost_title"><p class="userPost_title">내가 즐겨찾기한 글입니다</p></div>
                                    <div class="myScrapPost_writer">작성자작성자wkd</div>
                                    <p class="myScrapPost_time">2021/11/11</p>
                                </div>
                                <div class="myScrapPost_contents">
                                    <P class="myScrapPost_content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis voluptas nulla, libero, tempora debitis nihil laboriosam beatae placeat nostrum illum eveniet quis reiciendis quaerat necessitatibus, expedita harum odio minima et?</P>
                                </div>
                            </div>
                        </div>
                        <p class="userPost_label" style="cursor: pointer;">좋아요한 답변</p>
                        <div id="myLike">
                            <div class="myLikePost" style="cursor: pointer;">
                                <div id="myLikePost_info">
                                    <img src="내사진.jpg" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                                    <div class="myLikePost_title"><p class="userPost_title">내가 좋아요한 답변입니다 내가 좋아요 한 답변 </p></div>
                                    <div class="myLikePost_writer">작성자작성자wkd</div>
                                    <p class="myLikePost_time">2021/11/11</p>
                                </div>
                                <div class="myLikePost_contents">
                                    <P class="myLikePost_content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis voluptas nulla, libero, tempora debitis nihil laboriosam beatae placeat nostrum illum eveniet quis reiciendis quaerat necessitatibus, expedita harum odio minima et?</P>
                                </div>
                            </div>
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