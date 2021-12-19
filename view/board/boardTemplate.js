const db =  require('../../db.js');  
module.exports={
    parseDate:function(date) {
        let result='';
        let datelist = date.toString().split(' ');
        result += datelist[3] + "/" + datelist[1] + "/" + datelist[2] + " " + datelist[4];
        return result;
    },
    nav: function(userinfo) {
        let result ='';
        if (userinfo.authenticate == undefined || userinfo.authenticate == false) {//로그인
            result = `
            <div id="nav_userInfo">
                <button id="logout_btn" style="cursor: pointer;" onclick="location.href='/login'">로그인</button>
            </div>
            `;
        } else {
            result = `
            <div id="nav_userInfo">
                <img id="usrProfImg" src="/uploads/${userinfo.image}" alt="userpng" style="cursor:pointer; " onclick="window.location='/myPage'">
                <p id="usrNname"><b>${userinfo.nickname}</b></p>
                <div id ="logoutform">
                    <form action='/login/logoutprocess' method='post'>
                        <input type="submit" value="로그아웃" id="logout_btn" style="cursor: pointer;">
                    </form>
                </div>
            </div>
            `;
        }
        return result;
    },
    posts: function(posts) {
        let i = 0;
        let result ='';
        let contents, ifCode, scrapNo;
        while (i < posts.length) {
            ifCode = '';
            try { //with code
                contents = JSON.parse(posts[i]?.content)
                if(contents.code != '') ifCode = '<div class="withcode">코드 포함</div>';
                if(contents.code == undefined) ifCode ='';
            } catch (e) { //without code
                contents = { text : posts[i]?.content}
            }
            scrapNo = posts[i].scrapno ? `<img src="/image/scrap_star.png" style="width: 20px; height: 20px;" class="scrapstar"><p style="color: gold;" class="scrapedNo">${posts[i].scrapno}</p>` : '';
            result += `
            <div class="postss" onclick="location.href='/qna/${posts[i].board_id}/${posts[i].no}'" style="cursor: pointer;">
                <div class="post_info">
                    <img src="../../uploads/${posts[i].image}" alter="image" style="float: left; border-radius:30%; width:60px; height:60px;">
                    <div class="post_title"><h4 style="padding-top: 10px">${posts[i].title}</h4></div>
                    ${ifCode}
                    <div class="post_writer">${posts[i].nickname}</div>
                    <p class="post_time">${this.parseDate(posts[i].datetime)}</p>
                </div>
                <div class="post_contents">
                    <div class="post_content">
                    <pre>${contents.text}</pre>
                    ${contents.code !== ''? `<code><pre style="background-color: #f3f3f3; overflow: hidden; height: 4.59em; padding-top: 5px; margin-top: 5px">${contents.code}</pre></code>` : ''}
                    
                    </div>
                    <div class="scraped">
                        ${scrapNo}
                    </div>
                </div>
            </div>
            `;
            i++;            
        }
        return result;
    },
    container: function(boardId, boardname, usertohtml, poststohtml) {
        let newQButton;
        if (boardId != 0)  newQButton = `
            <div class="btn-wrapper">
                <button id="answer_btn" class="withcode" 
                onClick="location.href='/qna/${boardId}/first/create'"
                style="
                cursor: pointer;
                margin: auto;
                display: block;
                width: 100px;
                height: 30px;
                color: #ffffff;
                background-color: #3F3F3F;
                border-radius: 12px;
                border-style: none;">질문 작성하기</button>
            </div>
        `; else newQButton = '';
        return `
            <!DOCTYPE html>
            <head>
                <meta charset="utf-8">
                <title>게시판</title>
                <link rel="stylesheet" href="/css/board/board.css">
                <link rel="stylesheet" href="/css/nav.css">
            </head>
            <body>
                <div id="wrap">
                    <div id="nav">
                        <div id="menu">
                            <img id="menuicon" src="/image/hamburgerbar2.png" alt="menu" style="cursor: pointer;">
                            <div id="menuList">
                                <ul id="hamburger_menu">
                                    <div id="toHome" style="cursor:pointer;" onClick="location.href='/'">
                                        <img class="menu_icon" src="/image/home.png">
                                        <li class="bigMenu"><a href="/">Home</a></li>
                                    </div>
                                    <div id="recentlyAsked">
                                        <img class="menu_icon" src="/image/mypage.png">
                                        <li class="bigMenu"><a href="/myPage">마이 페이지</a></li>
                                    </div>
                                    <div id="postQuest">
                                        <img class="menu_icon" src="/image/ranking.png">
                                        <li class="bigMenu"><a href="/rank">랭킹</a></li>
                                    </div>
                                    <div id="posts">
                                        <img class="menu_icon" src="/image/board.png">
                                        <li class="bigMenu"><a href="/board/1">게시판</a></li>
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
                            <form action="/search">
                                <img id="search_icon" src="/image/searchicon.png" alt="search">
                                <input id="search_query" name="search_query" type="text">
                                <input type="submit" id="search_btn" value="search" class="submit_btn" style="cursor:pointer;">
                            </form>
                        </div>
                        ${usertohtml}
                    </div>
                    <div id="boardInfo">
                      ${newQButton}
                        게시판 > ${boardname}
                    </div>            
                    <div id="contents">
                        ${poststohtml}   
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