module.exports={
    container: function(questno, answerno, userno) {
        return `
        <!DOCTYPE html>
            <head>
                <meta charset="utf-8">
                <title>개발자의숲</title>
                <link rel="stylesheet" type="text/css" href="/css/mainPage.css">
            </head>
            <body>
                <div class="intro">
                    <p id="intro_1">해결하지 못 한 프로그래밍 오류를<br><b>한국어</b>로 편하게 소통하여 해결해보세요!</p>
                    <p id="intro_2">코드를 <b>공유</b>하고 오류를 <b>질문</b>해보세요.<br>해결한 프로그래밍 오류를 공유할 수 있습니다.</p>
                    <div class="system_info">
                        <div class="question_info">
                            <h1 id="quest_no">${questno}</h1>
                            작성된 질문
                        </div>
                        |
                        <div class="answer_info">
                            <h1 id="answ_no">${answerno}</h1>
                            대답 개수
                        </div>
                        |
                        <div class="user_info">
                            <h1 id="user_no">${userno}</h1>
                            사용자 수
                        </div>
                    </div>        
                </div>
        
                <div class="nav">
                    <h1 id="logo">🌳개발자의 숲🌳</h1>
                    <div class="user">
                        <button id="signin_btn" style="cursor: pointer;" onclick="location.href='/login'">로그인</button><br>
                        <button id="signup_btn" style="cursor: pointer;" onclick="location.href='/register'">회원가입</button>
                    </div>
                    <div id="search">
                        <p id="search_text"><b>질문을 검색해보세요</b></p>
                        <form action="/search">
                            <input id="search_query" name="search_query" type="text">
                            <input type="submit" id="search_btn" value="search" class="submit_btn" style="cursor:pointer;">
                        </form>
                    </div>
        
                    <div id="latelyAsked">
                        <button id="latelyQ_btn" style="cursor: pointer;" onclick="location.href='/board/1'"><u>최근 질문 둘러보기</u></button>
                    </div>
                </div>
            </body>
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                function counter(id, start, end, duration) {
                let obj = document.getElementById(id),
                current = start,
                range = end - start,
                increment = end > start ? 1 : -1,
                step = Math.abs(Math.floor(duration / range)),
                timer = setInterval(() => {
                    current += increment;
                    obj.textContent = current;
                    if (current == end) {
                    clearInterval(timer);
                    }
                }, step);
                }
                counter("quest_no", 100, ${questno}, 1);
                counter("answ_no", 100, ${answerno}, 1);
                counter("user_no", 100, ${userno}, 1);
                });
            </script>
        </html>
        `; 
    }

}