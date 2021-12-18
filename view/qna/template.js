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
              <button class="small_btn info-float-right" style="cursor:pointer">완료</button>
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
  nav : function (data){
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
            <img id="usrProfImg" src="/uploads/${data.image}" style="background-color:white; cursor:pointer;" onclick="window.location='/myPage'">
            <p id="usrNname"><b>${data.nickname}</b></p>
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
          ${this.nav(data)}
        <div>
        <div id="read-question" class="answer-container">
          <div class="answer-info">
            <div class="info-float info-img">
              <img id = "section_user_img" src="/uploads/${data.image}">
            </div>
            <div class="info-float info-content">
              <h4>${data.title}</h4>
              <span>${data.nickname}</span> | <span>${data.updated_datetime}</span>
            </div>
            ${writer && data.answer.length === 0?'<div class="info-float-right"><button id="delete_btn" class="small_btn" style="cursor:pointer">삭제</button></div>' : ''}
            ${writer? '<div class="info-float-right"><button id="update_btn" class="small_btn" style="cursor:pointer">수정</button></div>' : ''}
          </div>
          <div class="answer-content">
            <div class="content"><pre>${data.contents?.text?.trim()}</pre></div>
            ${this.codeHtml.read(data)}
          </div>
      
          <div class="answer-info">
            <div id="scrap_img" style="cursor:pointer" onclick="onClickScrap(${data.board_id},${data.no});" class="like_img">
              <div id="scrap_btn" class="pd5-right">
                ${data.scrapMe?`<img id="question_scrap" src='/image/scrap_star.png'/>`
        : `<img id="question_scrap" src='/image/no_scrap_star.png'/>`}
              </div>
            </div>
            <div>
              <b><p style="color: gold; cursor:default" id=scrap_numbers>${data.scrap}</p></b>
            </div>
          </div>
        </div>
        ${writer? this.writeHtml(`/qna/${data.board_id}/${data.no}/update_process`, data, 'none'): ''}
        </div>
          ${this.ansList(data.answer, 10)}
          <div class="btn-wrapper">
              <button id="answer_btn">답변 작성하기</button>
          </div>
          ${this.answer_create(data.answer, data.nickname)}
      </body>
      
      </html>
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
                    document.getElementById("scrap_numbers").innerHTML = Number(oldScrap) + 1;
                    $("#question_scrap").attr("src", "/image/scrap_star.png");
                }else {
                    let oldScrap = document.getElementById("scrap_numbers").innerHTML
                    document.getElementById("scrap_numbers").innerHTML = Number(oldScrap) -1;
                    $("#question_scrap").attr("src", '/image/no_scrap_star.png');
                
                }
            })
            // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
            .fail(function(xhr, status, errorThrown) {
                console.log("error >>>>>>>>>> ",errorThrown)
            })
        }

        function onClickLike(boardId, questNo, answNo){
          $.ajax({
              url: "/qna/like_process",
              data: { boardId, questNo, answNo},
              method: "post", 
              dataType: "json" 
          })
          // HTTP 요청이 성공하면 요청한 데이터가 done() 메소드로 전달됨.
          .done(function(data) {
              if(data){
                  let oldLike = document.getElementById(eval("'like_numbers "+answNo+"'")).innerHTML
                  document.getElementById(eval("'like_numbers "+answNo+"'")).innerHTML = Number(oldLike) + 1
              }else {
                  let oldLike = document.getElementById(eval("'like_numbers "+answNo+"'")).innerHTML
                  document.getElementById(eval("'like_numbers "+answNo+"'")).innerHTML = Number(oldLike) -1
              }
          })
          // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
          .fail(function(xhr, status, errorThrown) {
              alert("오류발생 >>>>>> " + errorThrown)
          })
      };
        
        $("#delete_btn").click(function() {
            let boardId = ${data.board_id}
            let questNo = ${data.no}
            if(confirm('정말 삭제하시겠습니까?')){
                $.ajax({
                    url: "/qna/delete_process",
                    data: { boardId, questNo},
                    method: "post", 
                    dataType: "json" 
                })
                .done(function(data) {
                    // 나중에 목록으로 돌아가게경로 변경
                    window.location = '/myPage';
                })
                .fail(function(xhr, status, errorThrown) {
                    console.log("error >>>>>>>>>> ",errorThrown)
                })
               
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
      
      $(document).ready(function() {
          $("#answer_btn").click(function() {
              $(".write-answer").show();
              $(".option_write").show();
              $("#answer_btn").hide();
          });

          $("#cancle_btn").click(function() {
              $(".write-answer").hide();
              $("#answer_btn").show();
              $(".option_write").hide();
          });

          $("#codepen_btn").click(function() {
              $(".codepen").show();
          });

          $( 'button.hide1' ).click( function() {
          $( '.box1' ).hide();
          } );

          $("#answer_like").click(function() {
              const cnt = 0;
              if($('#answer_like').attr('src') ==="image/favorite_border_black_24dp.svg"){
                  $('#answer_like').attr('src','image/favorite_black_24dp.svg'); 
                  cnt++;
                  $('#like_numbers').text(cnt);
              } else{
                  $('#answer_like').attr('src','image/favorite_border_black_24dp.svg'); 
                  cnt--;
                  $('#like_numbers').text(cnt);
              }              
          });
      });
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
              ${this.nav(data)}
              ${this.writeHtml('/qna/create_process',data, '')}
            </div>
          </body>
          
        </html>
        
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

  //답변글
    ansList: function(ans, likeCnt) {
        var list = `<h5 class="mg15-top-bottom" className="count-answer">${ans.length}개의 답변이 있습니다.</h5>`;
        var i = 0;
        while(i < ans.length) {
            list += `
        <div class="answer-container mg20-left">
            <div class="answer-info">
                <div class="info-float info-img">
                    <img id = "section_user_img" src="image/water-839590_1920.jpg">
                </div>
                <div class="info-float info-content">
                    <h4>${ans[i].title}</h4>
                    <span>${ans[i].nickname}</span> | <span>${ans[i].datetime}</span>
                </div>
                <div class="adoption ${ans[i].no}">
                  ${this.adoption(`${ans[i].point}`,`${ans[i].adoption}`,`${ans[i].board_id}`,`${ans[i].quest_no}`, `${ans[i].no}`)}
                </div>
                <div class="info-float-right" style="margin: 18px 20px 0 0">
                    <div class="like_img" onclick="onClickLike(${ans[i].board_id},${ans[i].quest_no}, ${ans[i].no})">
                        <div id="like_btn">
                            <img id="answer_like" src="./../../image/favorite_border_black_24dp.svg"/>
                        </div>
                    </div>
                    <div class="like_num">
                        <p id="like_numbers ${ans[i].no}">${likeCnt}</p>
                    </div>
                </div>
            </div>
            <div class="answer-content">
                <div class="content">
                    ${ans[i].content}
                </div>
            </div>
        </div>`;
            i = i+1;
        }
        return list;
    },
    answer_create : function (ans, nickname){
      var today = new Date();
      return `
      <div class="write-answer" style="display: none;">
            <form action="/qna/anscreate_process" method="post">
                <div class="answer-info">
                    <div class="info-float info-img">
                        <img id = "section_user_img" src="image/water-839590_1920.jpg">
                    </div>
                    <div class="info-float info-content">
                        <input id = "inputTitle" type="text" name="title" placeholder="답변 제목을 입력하세요">
                        <span>${nickname}</span> | <span>${today}</span>
                    </div>        
                </div>
                <div class="answer-content">
                    <div class="content">
                    <textarea id = "inputContent" type="text" name="content" placeholder="내용을 입력하세요"></textarea>
                    </div>
                </div>
                <input type="hidden" name="boardId" value="${ans[0]?.board_id}">
                <input type="hidden" name="questNo" value="${ans[0]?.quest_no}">
                <input type="hidden" name="datetime" value="${ans[0]?.datetime}">
                <input id="store_btn" type="submit" value="저장">
            </form>
        </div>
        <div class="option_write" style="display: none;">
            <button id="cancle_btn">취소</button>
        </div>
      </div>`;
    },
    adoption: function(point, adoption, board_id, quest_no, no){
      if(adoption == 1)
        return `<p>${point} 포인트로 채택됨</p>`;
      else return `
        <form action="/qna/adoption_process" method="post">
          <input id = "adopt_point" type="text" name="adoptPoint" placeholder="채택 포인트를 입력하세요">
          <input type="hidden" name="boardId" value="${board_id}">
          <input type="hidden" name="questNo" value="${quest_no}">
          <input type="hidden" name="no" value="${no}">
          <input id="adopt_btn" type="submit" value="채택">
      </form>
      `;
    },
}