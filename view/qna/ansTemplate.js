module.exports = {
    HTML: function(ansCnt, title, user, date, likeCnt, content, code) {
        return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>개발자의 숲</title>
    <link href="css/qna/qna.css" rel="stylesheet">
</head>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>
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
</script>
<body>
    <h5 class="count-answer">${ansCnt}개의 답변이 있습니다.</h5>
    <div class="answer-container">
        <div class="answer-info">
            <div class="info-float info-img">
                <img id = "section_user_img" src="image/water-839590_1920.jpg">
            </div>
            <div class="info-float info-content">
                <h4>${title}</h4>
                <span>${user}</span> | <span>${date}</span>
            </div>
            <div class="info-float-right">
                <div class="like_img">
                <div id="like_btn">
                    <img id="answer_like" src="image/favorite_border_black_24dp.svg"/>
                </div>
                </div>
                <div class="like_num">
                    <p id=like_numbers>${likeCnt}</p>
                </div>
            </div>
            
        </div>
        <div class="answer-content">
            <div class="content">
                <p>${content}</p>
            </div>
            <div class="codepen">
                <pre>
                    <code>
    ${code}
                    </code>
                </pre>
            </div>
        </div>
    </div>
</body>

</html>`
    }
}