const fs = require('fs');
const e = require("express");

module.exports = {
    writeHtml : function (url, data, display){
        let html = `<div id="write-question" class="write-ask" style="display: ${display};">
          <form action="${url}" method="post">
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
                       value="${data.title ?? ''}"
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
                        onfocus="adjustHeight(this);"
                        onkeyup="adjustHeight(this);">${data.contents?.text?.trim()?? ''}</textarea>
              </div>
                ${this.codeHtml.upsert(data)}
            </div>
            <div class="answer-info">
              <button class="small_btn info-float-right">완료</button>
            </div>
          </form>
        </div>`

        return html
    },
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
          return html
      },
      upsert : function (data){
          let html = '';
          if(data.contents?.code !==undefined && data.contents?.code !==null && data.contents.code !==''){
              html = `<div id="write-code" class="codepen">
                  <label for="textareaCodeContent"></label>
                  <textarea class="textarea-code"
                            id = "textareaCodeContent"
                            style="overflow:hidden"
                            name="codeContent"
                            onfocus="adjustHeight(this);"
                            onkeyup="adjustHeight(this);">${data.contents.code.trim()}</textarea>
                </div>`
          }else {
              html = `<div id="write-code" class="codepen" style="display: none;">
                  <label for="textareaCodeContent"></label>
                  <textarea class="textarea-code"
                            id = "textareaCodeContent"
                            style="overflow:hidden"
                            name="codeContent"
                            onfocus="adjustHeight(this);"
                            onkeyup="adjustHeight(this);"></textarea>
                </div>`
          }
          return html
      }
    },
  question_read : function (data, writer){
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
              <span>${data.nickname}</span> | <span>${data.updated_datetime}</span>
            </div>
            ${writer? '<div class="info-float-right"><button id="delete_btn" class="small_btn">삭제</button></div>' : ''}
            ${writer? '<div class="info-float-right"><button id="update_btn" class="small_btn">수정</button></div>' : ''}
          </div>
          <div class="answer-content">
            <div class="content"><pre>${data.contents.text.trim()}</pre></div>
            ${this.codeHtml.read(data)}
          </div>
      
          <div class="answer-info">
            <div id="scrap_img" onclick="onClickScrap(${data.board_id},${data.no})" class="like_img">
              <div id="like_btn" >
                <img id="answer_like" />
              </div>
            </div>
            <div class="like_num">
              <p id=scrap_numbers>${data.scrap}</p>
            </div>
          </div>
        </div>
        ${writer? this.writeHtml(`/qna/${data.board_id}/${data.no}/update_process`, data, 'none'): ''}
        </div>
      </div>
      </body>
      
      </html>
      <script>
      
        function onClickScrap(boardId, questNo){
            $.ajax({
                url: "/qna/scrap_process",
                data: { boardId, questNo},
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
        $("#delete_btn").click(function() {
            if(confirm('정말 삭제하시겠습니까?')){
                
            }else {
                
            }
        });
      
        $("#update_btn").click(function() {
          $("#write-question").show();
          $("#update_btn").hide();
          $("#read-question").hide();
          $('textarea').focus();
          $('input[name=title]').focus();
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
              ${this.writeHtml('/qna/create_process',data, '')}
            </div>
          </body>
          
        </html>
        
        <script>
          $("#update_btn").click(function() {
            $("#write-question").show();
            $("#update_btn").hide();
            $("#read-question").hide();
            $('textarea').focus();
            $('input[name=title]').focus();
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
