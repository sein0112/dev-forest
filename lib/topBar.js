module.exports = {
    HTML : function (){
        return `
            <!DOCTYPE html>
        <head>
            <meta charset="utf-8">
            <title>마이페이지</title>
        </head>
        <body>
            <div id="wrap">
            <link rel="stylesheet" href="/asset/css/mypage/myPage.css">
            <link rel="stylesheet" href="/asset/css/nav.css">
                <div id="nav">
                    <div id="search">
                        <form action="/">
                            <img id="search_icon" src="/asset/image/searchicon.png" alt="search">
                            <input id="search_query" type="text">
                            <button id="search_btn" style="cursor:pointer;">search</button>
                        </form>
                    </div>
                    <div id="nav_userInfo">
                        <img id="usrProfImg" src="/asset/image/searchicon.png" alt="userpng">
                        <p id="usrNname"><b>정준서</b></p>
                        <button id="logout_btn" style="cursor: pointer;" onclick="location.href='mainPage.html'">로그아웃</button>
                    </div>
                </div>
               
            </div>
        </body>
    </html>
    `
    }
}