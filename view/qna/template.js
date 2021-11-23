const fs = require('fs');

module.exports = {
  question_read : function (data){
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>개발자커뮤니티</title>
  <link href="../../asset/css/qna/qna.css" rel="stylesheet">

</head>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<body>
<div>
  <!-- 질문 -->
  <h5 class="count-answer">3개의 답변이 있습니다.</h5>

  <div id="read-question" class="answer-container">
    <div class="answer-info">
      <div class="info-float info-img">
        <img id = "section_user_img" >
      </div>
      <div class="info-float info-content">
        <h4>${data.title}</h4>
        <span>${data.user_id}</span> | <span>${data.last_date}</span>
      </div>
      <div class="info-float info-float-right">
        <button id="update_btn" class="small_btn">수정</button>
      </div>

    </div>
    <div class="answer-content">
      <div class="content">
        <p>${data.content}</p>
      </div>
<!--      <div class="codepen">-->
<!--        <pre><code class="code-font">UPDATE purchaseOrder-->
<!--  SET purchaseOrder_status = 'COMPLETED'-->
<!--  WHERE purchaseOrder_ID = '@purchaseOrder_ID' and-->
<!--  not exists (SELECT *-->
<!--  FROM itemsOrdered WHERE purchaseOrder_ID = '@purchaseOrdered_ID' AND status = 'PENDING'-->
<!--  )</code></pre>-->
<!--      </div>-->
    </div>

    <div class="answer-info">
      <div class="like_img">
        <div id="like_btn" >
          <img id="answer_like" />
        </div>
      </div>
      <div class="like_num">
        <p id=like_numbers>${data.total_like}</p>
      </div>
    </div>
  </div>

  <div id="write-question" class="write-ask" style="display: none;">
    <form method="post">
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
                  value="${data.content}"
                  onkeyup="adjustHeight(this);">
          </textarea>
        </div>
<!--        <div id="write-code" class="codepen" style="display: none;">-->
<!--          <label for="textareaCodeContent"></label>-->
<!--          <textarea class="textarea-code"-->
<!--                    id = "textareaCodeContent"-->
<!--                    style="overflow:hidden"-->
<!--                    onkeyup="adjustHeight(this);">-->
<!--          </textarea>-->
<!--        </div>-->

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
  question_creat : function (){
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>개발자커뮤니티</title>

</head>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

<body>
<div>
  <link href="../../asset/css/qna/qna.css" rel="stylesheet">
  <div id="write-question" class="write-ask">
    <form action="/create_process" method="post">
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
                  onkeyup="adjustHeight(this);">
          </textarea>
        </div>
        <div id="write-code" class="codepen" style="display: none;">
          <label for="textareaCodeContent"></label>
          <textarea class="textarea-code"
                    id = "textareaCodeContent"
                    style="overflow:hidden"
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
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>개발자커뮤니티</title>

</head>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

<body>
<div>
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
                  onkeyup="adjustHeight(this);">
                  ${data.content}
          </textarea>
        </div>
<!--        <div id="write-code" class="codepen" style="display: none;">-->
<!--          <label for="textareaCodeContent"></label>-->
<!--          <textarea class="textarea-code"-->
<!--                    id = "textareaCodeContent"-->
<!--                    style="overflow:hidden"-->
<!--                    onkeyup="adjustHeight(this);">-->
<!--          </textarea>-->
<!--        </div>-->

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
