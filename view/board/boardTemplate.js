module.exports={
    container: function() {
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
                        <img id="menuicon" src="/image/hamburgerbar2.png" alt="menu" style="cursor: pointer;">
                        <div id="menuList">
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
                                        <a href="/board/1" class="left">javasript</a>
                                        <a href="/board/2" class="right">ruby</a>
                                        <a href="/board/3" class="left">python</a>
                                        <a href="/board/4" class="right">swift</a>
                                        <a href="/board/5" class="left">java</a>
                                        <a href="/board/6" class="right">arrays</a>
                                        <a href="/board/7" class="left">php</a>
                                        <a href="/board/8" class="right">c</a>
                                        <a href="/board/9" class="left">android</a>
                                        <a href="/board/10" class="right">asp.net</a>
                                        <a href="/board/11" class="left">html</a>
                                        <a href="/board/12" class="right">.net</a>
                                        <a href="/board/13" class="left">jquery</a>
                                        <a href="/board/14" class="right">sql</a>
                                        <a href="/board/15" class="left">css</a>
                                        <a href="/board/16" class="right">r</a>
                                        <a href="/board/17" class="left">mysql</a>
                                        <a href="/board/18" class="right">sql-server</a>
                                        <a href="/board/19" class="left">c++</a>
                                        <a href="/board/20" class="right">swift</a>
                                        <a href="/board/21" class="left">reactjs</a>
                                        <a href="/board/22" class="right">ajax</a>
                                        <a href="/board/23" class="left">ios</a>
                                        <a href="/board/24" class="right">pandas</a>
                                        <a href="/board/25" class="left">node.js</a>
                                        <a href="/board/26" class="right">linux</a>
                                        <a href="/board/27" class="left">django</a>
                                        <a href="/board/28" class="right">angularjs</a>
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
                    <div id="nav_userInfo">
                        <img id="usrProfImg" src="내사진.jpg" alt="userpng">
                        <p id="usrNname"><b>정준서</b></p>
                        <button id="logout_btn" style="cursor: pointer;" onclick="location.href='mainPage.html'">로그아웃</button>
                    </div>
                </div>
                <div id="contents">
    
                </div>
            </div>
        </body>
    </html>
        `;
    }
}