module.exports = {
    nav:function(userinfo) {
        return `                    
        <div id="nav_userInfo">
            <img id="usrProfImg" src="/uploads/${userinfo.image}" style="background-color:white; cursor:pointer; " onclick="window.location='/myPage'">
            <p id="usrNname"><b>${userinfo.nickname}</b></p>
            <div id ="logoutform">
                <form action='/login/logoutprocess' method='post'>
                    <input type="submit" value="로그아웃" id="logout_btn" style="cursor: pointer;">
                </form>
            </div>
        </div>
        `;
    },
    userRankList:function(rank){
        var top = `
            <div class="indivisual-rankings">
                <div class="top-rankers">
                    <div class="ranker">
                        <span id="rank_1" class="top_rank_num">1</span>
                        <img id = "ranking_user_img" src="/uploads/${rank[0].image}">
                        <p>${rank[0].nickname}</p>
                    </div>
                    <div class="ranker">
                        <span id="rank_2" class="top_rank_num">2</span>
                        <img id = "ranking_user_img" src="/uploads/${rank[1].image}">
                        <p>${rank[1].nickname}</p>
                    </div>
                    <div class="ranker">
                        <span id="rank_3" class="top_rank_num">3</span>
                        <img id = "ranking_user_img" src="/uploads/${rank[2].image}">
                        <p>${rank[2].nickname}</p>
                    </div>
                </div>
            </div>
        `;
        var list = `<div><ul>`;
        var i = 3;
        while(i < rank.length) {
            list = list + `
            <li id="others">
                <div id="rank_num">${i+1}</div>
                <div class="others_user_info">
                    <img id = "others_ranking_user_img" src="uploads/${rank[i].image}">
                    <span id="others_username">${rank[i].nickname}</span>
                </div>
            </li>`;
            i = i+1;
        }
        list = top+list+`</ul></div>`;
        return list;
    },
    groupRankList:function(rank){
        // //belong 그룹의 종류가 3개 이상이 되면 주석 풀기
        // var top = `<div class="indivisual-rankings">`;
        // var top1 = `
        //         <div class="top-rankers">
        //             <div class="ranker">
        //                 <span id="rank_1" class="top_rank_num">1</span>
        //                 <img id = "ranking_user_img" src="image/user_img.jpg">
        //                 <p>${rank[0].belong}</p>
        //             </div>
        // `;
        // var top2 = `<div class="ranker">
        //     <span id="rank_2" class="top_rank_num">2</span>
        //     <img id = "ranking_user_img" src="image/user_img.jpg">
        //     <p>${rank[1].belong}</p>
        // </div>`;
        // var top3 = `<div class="ranker">
        //     <span id="rank_2" class="top_rank_num">2</span>
        //     <img id = "ranking_user_img" src="image/user_img.jpg">
        //     <p>${rank[2].belong}</p>
        // </div>`;

        // if(rank.length > 0) top += top1;
        // if(rank.length > 1) top += top2;
        // if(rank.length > 2) top += top3;
        // top += `</div>`;

        var list = `<div><ul>`;
        // var i = 3;
        var i = 0;
        while(i < rank.length) {
            list = list + `
            <li id="others">
                <div id="rank_num">${i+1}</div>
                <div class="others_user_info">
                    <span id="others_username">${rank[i].belong}</span>
                </div>
            </li>`;
            i = i+1;
        }
        // list = top+list+`</ul></div>`;
        list = list+`</ul></div>`;
        return list;
    },
    HTML:function(navhtml, userRnak, groupRank){
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>개발자의 숲</title>
                <link href="css/rank/rank.css" rel="stylesheet">
                <link href="css/myPage/myPage.css" rel="stylesheet">
                <link href="css/nav.css" rel="stylesheet">
                
            </head>
            <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
            <script>
                $(document).ready(function() {
                    
                });
                
            </script>
            <body>
            <div id="wrap">
                <div id="nav">
                <div id="menu">
                    <img id="menuicon" src="/image/hamburgerbar2.png" alt="menu" onClick="menuClick()" style="cursor: pointer;">
                    <img id="menuiconX" src="/image/X.png" onClick="menuClick()" style="visibility: hidden; cursor: pointer;">
                    <div id="menuList" style="visibility: hidden;">
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
                ${navhtml}
            </div>
                <div id="thisisrank">
                    <div class="ranking-container">
                        <div class="ranka">개인랭킹</a>
                        ${this.userRankList(userRnak)}
                        <hr id="hr">
                        <div id="belongRank">
                            <div class="ranka">단체랭킹</a>
                            ${this.groupRankList(groupRank)}
                        </div>
                    </div>
                </div>
            </div>
        </body>
        <script>
            function onClickQna(boardId, questionId){
                window.location='/qna/'+boardId + "/" + questionId
            }
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