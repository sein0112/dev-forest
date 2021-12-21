const { like } = require("./qna")

module.exports = {
    parseDate:function(date) {
      let result='';
      let datelist = date.toString().split(' ');
      result += datelist[3] + "/" + datelist[1] + "/" + datelist[2] + " " + datelist[4];
      return result;
    },
    writeHtml : function (url, data, display){
        let html = `<div id="write-question" class="write-ask" style="display: ${display};">
          <form action="${url}" method="post">
            <input type="hidden" id="boardId" name="boardId" value="${data.board_id}">
            <input type="hidden" id="questionNo" name="questionNo" value="${data.no}">
            <div class="answer-info">
              <div class="info-float info-img">
                <img id = "section_user_img" src="/uploads/${data.loginUserImage}">
              </div>
              <div class="info-float">
                <label for="inputTitle"></label>
                <input id = "inputTitle"
                       style="width: 100%;"
                       type="text"
                       name="title"
                       value="${data.title ? data.title : ''}"
                       placeholder="질문 제목을 입력하세요">
              </div>
              <div class="info-float-right">
                <div class="add-codepen">
                  <p id="codepen_btn" class="codepen_btn">소스코드 추가하기</p>
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
                        onkeyup="adjustHeight(this);">${data.contents? data.contents.text : ''}</textarea>
              </div>
                ${this.codeHtml.upsert(data, 'que')}
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
                                        
        <div id="nav_userInfo">
            <img id="usrProfImg" src="/uploads/${data.loginUserImage}" style="background-color:white; cursor:pointer;" onclick="window.location='/myPage'">
            <p id="usrNname"><b>${data.loginUserNickname}</b></p>
            <div id ="logoutform">
                <form action='/login/logoutprocess' method='post'>
                    <input type="submit" value="로그아웃" id="logout_btn" style="cursor: pointer;">
                </form>
            </div>
        </div>        
  </div>
  <div style="margin-bottom: 10px;">
        <span style="cursor: pointer" onclick="window.location='/board/${data.board_id}'">게시판 -> ${data.board_name}<span>
  </div>   `
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
      upsert : function (data , tpye){
        let typeMode = tpye==='ans'? data.no : (tpye === 'new' ? 'new' :'')
        if(data.contents === undefined || data.contents === null){
          data.contents = {}
          if(data.contents.data === undefined || data.contents.data === null){
            data.contents.code = ''
          }
        }
        let html = '';
        if(data.contents.code !==''){
            html = `<div id="write-code-${typeMode}" class="codepen">
                <label for="textareaCodeContent"></label>
                <textarea class="textarea-code"
                          id = "textareaCodeContent"
                          style="overflow:hidden"
                          name="codeContent"
                          onfocus="adjustHeight(this);"
                          onkeyup="adjustHeight(this);">${ tpye==="new" ? '' : data.contents.code.trim()}</textarea>
              </div>`
        }else {
            html = `<div id="write-code-${typeMode}" class="codepen" style="display: none;">
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
              <span>${data.nickname}</span> | <span>${this.parseDate(data.updated_datetime)}</span>
            </div>
            ${writer && data.answer.length === 0?'<div class="info-float-right"><button id="delete_btn" class="small_btn" style="cursor:pointer">삭제</button></div>' : ''}
            ${writer? '<div class="info-float-right"><button id="update_btn" class="small_btn" style="cursor:pointer">수정</button></div>' : ''}
          </div>
          <div class="answer-content">
            <div class="content"><pre>${data.contents.text.trim()}</pre></div>
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
        ${this.ansList(data.answer, data.user_id, data.userinfo[0], data.like, data.likeMe, data.userinfo)}
        </div>
          <div class="btn-wrapper">
              <button id="answer_btn">답변 작성하기</button>
          </div>
          ${this.answer_create(data, data.userinfo[0].nickname)}
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
                  document.getElementById(eval("'answer_like "+answNo+"'")).src = './../../image/favorite_black_24dp.svg';
              }else {
                  let oldLike = document.getElementById(eval("'like_numbers "+answNo+"'")).innerHTML
                  document.getElementById(eval("'like_numbers "+answNo+"'")).innerHTML = Number(oldLike) -1
                  document.getElementById(eval("'answer_like "+answNo+"'")).src = './../../image/favorite_border_black_24dp.svg';
              }
          })
          // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
          .fail(function(xhr, status, errorThrown) {
              alert("오류발생 >>>>>> " + errorThrown)
          })
      };
        
        function onClickDeleteAns(board_id ,quest_no ,no) {
            if(confirm('정말 삭제하시겠습니까?')){
                $.ajax({
                    url: "/qna/ans_delete_process",
                    data: { board_id, quest_no, no},
                    method: "post", 
                    dataType: "json" 
                })
                .done(function(data) {
                    window.location = '/qna/'+board_id+'/'+quest_no;
                })
                .fail(function(xhr, status, errorThrown) {
                    console.log("error >>>>>>>>>> ",errorThrown)
                })
            }
        };
        
        function onClickUpdateAns(board_id ,quest_no ,no) {
           
            document.getElementById('ans_w_'+no).style.display = "block";
            document.getElementById('ans_w_'+no).style.border = "2px solid #141414";
            document.getElementById('ans_r_'+no).style.display = "none";
            document.getElementById('ans_r_c_'+no).style.display = "none";
            document.getElementById('answer_btn').style.display = "none";
        };
        
        function onClickAnsCodeBtn(data){
            console.log(data)
            document.getElementById('write-code-'+data).style.display="block";
        }
        
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
                    window.location = '/board/'+boardId;
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
          $("#write-code-").show();
        });
        
        $("#ans_c_codepen_btn").click(function() {
            document.getElementById('write-code-new').style.display="block";
        });
      
        function adjustHeight(target) {
          target.style.height = "1px";
          target.style.height = (target.scrollHeight)+"px";
        }
      
      $(document).ready(function() {
          $("#answer_btn").click(function() {
              $("#write-answer-create").show();
              $(".option_write").show();
              $("#answer_btn").hide();
          });

          $("#cancle_btn").click(function() {
              $("#write-answer-create").hide();
              $("#answer_btn").show();
              $(".option_write").hide();
          });

          $( 'button.hide1' ).click( function() {
          $( '.box1' ).hide();
          } );
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
              document.getElementById("write-code-").style.display = "block";
          });
        
          function adjustHeight(target) {
            target.style.height = "1px";
            target.style.height = (target.scrollHeight)+"px";
          }
        </script>`;
  },

  //답변글
    ansList: function(ans, quest_userId, userInfo_s, like ,likeMe, loginUserInfo) {
        var list = `<h5 class="mg15-top-bottom" className="count-answer">${ans.length}개의 답변이 있습니다.</h5>`;
        let src;
        var i = 0;
        let existAdoption = false

        for( let ansData of ans){
            if(ansData.adoption > 0 ){
                existAdoption = true;
                break;
            }
        }
        while(i < ans.length) {
            let contents
            try {
                contents = JSON.parse(ans[i].content)
            } catch (e) {
                contents = { text : ans[i].content}
            }
            ans[i] = { ...ans[i], contents}
            list += `
        <div class="answer-container mg20-left ${ans[i].adoption? 'adoption-y' : ''}" id="ans_${ans[i].no}">
            <div class="write-answer" id="ans_w_${ans[i].no}" style="display: none; margin-bottom: 10px;">
                <form action="/qna/ans_update_process" method="post">
                      <div class="info-float-right">
                        <div class="add-codepen">
                          <p id="ans_codepen_btn" class="codepen_btn" onclick="onClickAnsCodeBtn(${ans[i].no})">소스코드 추가하기</p>
                        </div>
                      </div>
                    <div class="answer-info">
                        <div class="info-float info-img">
                            <img id="section_user_img" src="/uploads/${ans[i].image}">
                        </div>
                        <div class="info-float info-content">
                            <input id="inputTitle" type="text" name="title" placeholder="답변 제목을 입력하세요" value="${ans[i].title}">
                            <span>${ans[i].nickname}</span>
                        </div>        
                    </div>
                    <div class="answer-content">
                        <div class="content">
                        <textarea id="inputContent" type="text" name="content" placeholder="내용을 입력하세요">${ans[i].contents.text}</textarea>
                        </div>
                        ${this.codeHtml.upsert(ans[i], 'ans')}
                    </div>
                    
                    <div class="answer-info">
                    <input id="store_btn" type="submit" value="저장">
                    </div>
                    <input type="hidden" name="board_id" value="${ans[i].board_id}">
                    <input type="hidden" name="quest_no" value="${ans[i].quest_no}">
                    <input type="hidden" name="no" value="${ans[i].no}"">
                </form>
            </div>
            <div class="answer-info" id="ans_r_${ans[i].no}">
                <div class="info-float info-img">
                    <img id = "section_user_img" src="/uploads/${ans[i].image}">
                </div>
                <div class="info-float info-content">
                    <h4>${ans[i].title}</h4>
                    <span>${ans[i].nickname}</span> | <span>${this.parseDate(ans[i].datetime)}</span>
                </div>
                ${ans[i].user_id === loginUserInfo[0].id && !ans[i].adoption ?'<div class=\"info-float-right\"><button onclick=\"onClickDeleteAns(\''+ ans[i].board_id+ '\',\'' +ans[i].quest_no+ '\',\'' + ans[i].no + '\')\" id=\"ans_delete_btn\" class=\"small_btn\" style="cursor:pointer;">삭제</button></div>' : ''}
                ${ans[i].user_id === loginUserInfo[0].id? '<div class=\"info-float-right\"><button onclick=\"onClickUpdateAns(\''+ ans[i].board_id+ '\',\'' +ans[i].quest_no+ '\',\'' + ans[i].no + '\')\" id=\"ans_update_btn\" class=\"small_btn\" style="cursor:pointer;">수정</button></div>' : ''}          
                <div class="adoption_container ${ans[i].no}">
                ${this.adoption(`${ans[i].point}`,`${ans[i].adoption}`,`${ans[i].board_id}`,`${ans[i].quest_no}`, `${ans[i].no}`, `${ans[i].user_id}`, quest_userId, loginUserInfo[0].id , existAdoption, ans[i].user_id)}
                </div>
                <div class="info-float-right" style="margin: 18px 20px 0 0">
                    <div class="like_img" onclick="onClickLike(${ans[i].board_id},${ans[i].quest_no}, ${ans[i].no})">
                        <div id="like_btn">
                        <img id="answer_like ${ans[i].no}" src =${this.src(likeMe, ans[i].no, loginUserInfo)} />
                        </div>
                    </div>
                    <div class="like_num">
                        <p id="like_numbers ${ans[i].no}">${this.count(like, ans[i].no)}</p>
                    </div>
                </div>
            </div>
            <div class="answer-content" id="ans_r_c_${ans[i].no}">
                <div class="content">
                    ${ans[i].contents.text}
                </div>
                ${this.codeHtml.read(ans[i])}
            </div>
            </div>`;
          i = i+1;
        }
        return list;
    },
    answer_create : function (ans, nickname){
      return `
      <div class="write-answer" id="write-answer-create" style="display: none;">
            <form action="/qna/anscreate_process" method="post">
                  <div class="info-float-right">
                    <div class="add-codepen">
                      <p id="ans_c_codepen_btn" class="codepen_btn">소스코드 추가하기</p>
                    </div>
                  </div>
                <div class="answer-info">
                    <div class="info-float info-img">
                        <img id = "section_user_img" src="/uploads/${ans.loginUserImage}">
                    </div>
                    <div class="info-float info-content">
                        <input id = "inputTitle" type="text" name="title" placeholder="답변 제목을 입력하세요">
                        <span>${ans.loginUserNickname}</span>
                    </div>        
                </div>
                <div class="answer-content">
                    <div class="content">
                    <textarea id = "inputContent" type="text" name="content" placeholder="내용을 입력하세요"></textarea>
                    </div>
                    ${this.codeHtml.upsert(ans, 'new')}
                </div>
                <input type="hidden" name="boardId" value="${ans.board_id}">
                <input type="hidden" name="questNo" value="${ans.no}">
                <input id="store_btn" type="submit" value="저장">
            </form>
        </div>
        <div class="option_write" style="display: none;">
            <button id="cancle_btn">취소</button>
        </div>
      </div>`;
    },
    adoption: function(point, adoption, board_id, quest_no, no, ans_userId, quest_userId, user_id, existAdoption, ans_user_id){
      // console.log(ans_userId, quest_userId, user_id);
      if(adoption > 0)
          return `<img style="width: 24px; height: 24px; margin: 18px 20px 0 0" src="/image/adoption.png">`;
        //로그인한 유저가 작성한 게시글이면서 다른 사람이 작성한 답변이고 다른 채택된 글이 없을 때 채택 가능함
      if((quest_userId == user_id) && (ans_userId != user_id) && !existAdoption) {
          return `
          <form class="adoption" action="/qna/adoption_process" method="post">
            <input id = "adopt_point" type="text" name="adoptPoint" placeholder="채택 포인트를 입력하세요">
            <input type="hidden" name="ansUserId" value="${ans_user_id}">
            <input type="hidden" name="boardId" value="${board_id}">
            <input type="hidden" name="questNo" value="${quest_no}">
            <input type="hidden" name="no" value="${no}">
            <input id="adopt_btn" type="submit" value="채택">
        </form>
      `;}
      else return ``;
    },
    count: function(like, ans_no){
      let cnt = 0;
      let i = 0;
      while(i < like.length){
        if(like[i].answ_no === ans_no)
          if(!(like[i] === undefined)) cnt = like[i].likeCnt;
          i+=1;
      }
      return cnt;
    },
    src: function(likeMe, ans_no, loginUserInfo){
      let src = "./../../image/favorite_border_black_24dp.svg";
      let i = 0;
      while(i < likeMe.length){
        if(ans_no === likeMe[i].answ_no)
          if(!(likeMe[i] === undefined) && (likeMe[i].user_id=== loginUserInfo[0].id)) src = "./../../image/favorite_black_24dp.svg";
          i+=1;
      }
      return src;
    }
}