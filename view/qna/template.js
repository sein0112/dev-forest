const fs = require('fs');
const e = require("express");

module.exports = {
  head : function (){
    return `<head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>개발자커뮤니티</title>
              <link rel="stylesheet" type="text/css" href="/css/nav.css">
              <link rel="stylesheet" type="text/css" href="/css/mypage/myPage.css">
              <link rel="stylesheet" type="text/css" href="/css/qna/qna.css">
            </head>`
  },
  nav : function (){
    return `<div id="nav">
        <div id="menu">
            <img id="menuicon" src="/image/hamburgerbar2.png" alt="menu" onclick="menuClick()" style="cursor: pointer;">
            <img id="menuiconX" src="/image/X.png" onclick="menuClick()" style="visibility: hidden; cursor: pointer;">
            <div id="menuList" style="visibility: hidden;">
                <ul id="hamburger_menu">
                    <div id="toHome" style="cursor:pointer;" onclick="location.href='../mainPage.html'">
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
                                        
        <div id="nav_userInfo">
            <img id="usrProfImg" src="#" alt="userpng">
            <p id="usrNname"><b>수룡이</b></p>
            <button id="logout_btn" style="cursor: pointer;" onclick="location.href='mainPage.html'">로그아웃</button>
        </div>
        
  </div>`
  },
    codeHtml : {
      read : function (data){
          let html = '';
          if(data.contents.code !=='' && data.contents.code !==undefined && data.contents.code !==null){
              html = `<div class="codepen">
                    <pre><code class="code-font">${data.contents.code.trim()}</code></pre>
                  </div>`
          }
          console.log(html)
          return html
      },
      upsert : function (data){
          let html = '';
          if(data.contents.code !==undefined && data.contents.code !==null){
              if(data.contents.code !==''){
                  html = `<div id="write-code" class="codepen">
                  <label for="textareaCodeContent"></label>
                  <textarea class="textarea-code"
                            id = "textareaCodeContent"
                            style="overflow:hidden"
                            name="codeContent"
                            onkeyup="adjustHeight(this);">
                            ${data.contents.code.trim()}
                  </textarea>
                </div>`
              }else {
                  html = `<div id="write-code" class="codepen" style="display: none;">
                  <label for="textareaCodeContent"></label>
                  <textarea class="textarea-code"
                            id = "textareaCodeContent"
                            style="overflow:hidden"
                            name="codeContent"
                            onkeyup="adjustHeight(this);">
                  </textarea>
                </div>`
              }
          }else {
              html = `<div id="write-code" class="codepen" style="display: none;">
                  <label for="textareaCodeContent"></label>
                  <textarea class="textarea-code"
                            id = "textareaCodeContent"
                            style="overflow:hidden"
                            name="codeContent"
                            onkeyup="adjustHeight(this);">
                  </textarea>
                </div>`
          }
          return html
      }
    },
  question_read : function (data){
    return `
      <!DOCTYPE html>
      <html lang="en">
          ${this.head()}
      <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
      <body>
      <div id="wrap"> 
          ${this.nav()}
        <div>
        <h5 class="count-answer">${data.answerCount}개의 답변이 있습니다.</h5>
      
        <div id="read-question" class="answer-container">
          <div class="answer-info">
            <div class="info-float info-img">
              <img id = "section_user_img" >
            </div>
            <div class="info-float info-content">
              <h4>${data.title}</h4>
              <span>${data.user_id}</span> | <span>${data.updated_datetime}</span>
            </div>
            <div class="info-float info-float-right">
              <button id="update_btn" class="small_btn">수정</button>
            </div>
      
          </div>
          <div class="answer-content">
            <div class="content">
              ${data.contents.text.trim()}
            </div>
            ${this.codeHtml.read(data)}
          </div>
      
          <div class="answer-info">
            <div id="scrap_img" onclick="onClickScrap(${data.board_id},${data.no},'tpdls973@naver.com')" class="like_img">
              <div id="like_btn" >
                <img id="answer_like" />
              </div>
            </div>
            <div class="like_num">
              <p id=scrap_numbers>${data.scrap}</p>
            </div>
          </div>
        </div>
      
        <div id="write-question" class="write-ask" style="display: none;">
          <form action="/qna/${data.board_id}/${data.no}/update_process" method="post">
<!--                      임시하드코딩-->
            <input type="hidden" id="userId" name="userId" value="tpdls973@naver.com">
            <input type="hidden" id="boardId" name="boardId" value="${data.board_id}">
            <input type="hidden" id="questionNo" name="questionNo" value="${data.no}">
            <div class="answer-info">
              <div class="info-float info-img">
                <img id = "section_user_img" >
              </div>
              <div class="info-float">
                <label for="inputTitle"></label>
                <input id = "inputTitle"
                       style="width: 100%;"
                       type="text"
                       name="title"
                       value="${data.title}"
                       placeholder="질문 제목을 입력하세요">
              </div>
              <div class="info-float-right">
                <div class="add-codepen">
                  <p id="codepen_btn">소스코드 추가하기</p>
                </div>
              </div>
      
            </div>
            <div class="answer-content">
              <div class="content">
                <label for="textareaContent"></label>
                <textarea
                        id = "textareaContent"
                        style="overflow:hidden"
                        name="content"
                        onkeyup="adjustHeight(this);">
                        ${data.contents.text.trim()}
                </textarea>
              </div>
                ${this.codeHtml.upsert(data)}
            </div>
            <div class="answer-info">
              <button class="small_btn info-float-right">완료</button>
            </div>
          </form>
        </div>
        </div>
      </div>
      </body>
      
      </html>
      <script>
        function onClickScrap(boardId, questNo, userId){
            $.ajax({
                url: "/qna/scrap_process",
                data: { boardId, questNo, userId},
                method: "post", 
                dataType: "json" 
            })
            // HTTP 요청이 성공하면 요청한 데이터가 done() 메소드로 전달됨.
            .done(function(data) {
                if(data){
                    let oldScrap = document.getElementById("scrap_numbers").innerHTML
                    document.getElementById("scrap_numbers").innerHTML = Number(oldScrap) + 1
                }else {
                    let oldScrap = document.getElementById("scrap_numbers").innerHTML
                    document.getElementById("scrap_numbers").innerHTML = Number(oldScrap) -1
                }
            })
            // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
            .fail(function(xhr, status, errorThrown) {
                alert("오류발생 >>>>>> " + errorThrown)
            })
            // 
        }
      
        $("#update_btn").click(function() {
          $("#write-question").show();
          $("#update_btn").hide();
          $("#read-question").hide();
        });
      
        $("#cancle_btn").click(function() {
          $(".write-ask").hide();
          $("#answer_btn").show();
          $(".option_write").hide();
        });
      
        $("#codepen_btn").click(function() {
          $("#write-code").show();
        });
      
        function adjustHeight(target) {
          target.style.height = "1px";
          target.style.height = (target.scrollHeight)+"px";
        }
      </script>`;
  },
  question_create : function (data){
    return `
      <!DOCTYPE html>
        <html lang="en">
          ${this.head()}
          <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
          <body>
            <div id="wrap">
              ${this.nav()}
              <div id="write-question" class="write-ask">
                <form action="/qna/create_process" method="post">
                  <div class="answer-info">
                    <div class="info-float info-img">
                      <img id = "section_user_img" >
                    </div>
                    <div class="info-float">
                      <label for="inputTitle"></label>
                      <input id = "inputTitle"
                             style="width: 100%;"
                             type="text"
                             name="title"
                             placeholder="질문 제목을 입력하세요">
                      
                      <input type="hidden" id ="boardId" name="boardId" value="${data.boardId}">
<!--                      임시하드코딩-->
                      <input type="hidden" id="userId" name="userId" value="tpdls973@naver.com">
                    </div>
                    <div class="info-float-right">
                      <div class="add-codepen">
                        <p id="codepen_btn">소스코드 추가하기</p>
                      </div>
                    </div>
            
                  </div>
                  <div class="answer-content">
                    <div class="content">
                      <label for="textareaContent"></label>
                      <textarea
                              id = "textareaContent"
                              name = "content"
                              style="overflow:hidden"
                              onkeyup="adjustHeight(this);">
                      </textarea>
                    </div>
                    <div id="write-code" class="codepen" style="display: none;">
                      <label for="textareaCodeContent"></label>
                      <textarea class="textarea-code"
                                id = "textareaCodeContent"
                                style="overflow:hidden"
                                name="codeContent"
                                onkeyup="adjustHeight(this);">
                      </textarea>
                    </div>
                  </div>
                  <div class="answer-info">
                    <button class="small_btn info-float-right">완료</button>
                  </div>
                </form>
              </div>
            </div>
          </body>
          
        </html>
        
        <script>
          $("#update_btn").click(function() {
            $("#write-question").show();
            $("#update_btn").hide();
            $("#read-question").hide();
          });
        
          $("#cancle_btn").click(function() {
            $(".write-ask").hide();
            $("#answer_btn").show();
            $(".option_write").hide();
          });
        
          $("#codepen_btn").click(function() {
            $("#write-code").show();
          });
        
          function adjustHeight(target) {
            target.style.height = "1px";
            target.style.height = (target.scrollHeight)+"px";
          }
        </script>`;
  },
  question_update : function (){
    return `
      <!DOCTYPE html>
      <html lang="en">
      ${this.head()}
      <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
      <body>
      <div id="wrap">
        ${this.nav()}
        <link href="../../asset/css/qna/qna.css" rel="stylesheet">
        <div id="write-question" class="write-ask">
          <form action="/update_process" method="post">
            <div class="answer-info">
              <div class="info-float info-img">
                <img id = "section_user_img" >
              </div>
              <div class="info-float">
                <label for="inputTitle"></label>
                <input id = "inputTitle"
                       style="width: 100%;"
                       type="text"
                       name="input"
                       value="${data.title}"
                       placeholder="질문 제목을 입력하세요">
              </div>
              <div class="info-float-right">
                <div class="add-codepen">
                  <p id="codepen_btn">소스코드 추가하기</p>
                </div>
              </div>
      
            </div>
            <div class="answer-content">
              <div class="content">
                <label for="textareaContent"></label>
                <textarea
                  id = "textareaContent"
                  style="overflow:hidden"
                  onkeyup="adjustHeight(this);">${data.contents.text.trim()}
                </textarea>
              </div>
              <div id="write-code" class="codepen" style="display: none;">
                <label for="textareaCodeContent"></label>
                <textarea class="textarea-code"
                          id = "textareaCodeContent"
                          name="codeContent"
                          style="overflow:hidden"
                          onkeyup="adjustHeight(this);">${data.contents.code.trim()}
                </textarea>
              </div>
      
            </div>
      
            <div class="answer-info">
              <button class="small_btn info-float-right">완료</button>
            </div>
          </form>
        </div>
      </div>
      </body>
      
      </html>
      
      <script>
        $("#update_btn").click(function() {
          $("#write-question").show();
          $("#update_btn").hide();
          $("#read-question").hide();
        });
      
        $("#cancle_btn").click(function() {
          $(".write-ask").hide();
          $("#answer_btn").show();
          $(".option_write").hide();
        });
      
        $("#codepen_btn").click(function() {
          $("#write-code").show();
        });
      
        function adjustHeight(target) {
          target.style.height = "1px";
          target.style.height = (target.scrollHeight)+"px";
        }
      </script>`;
  },

}
