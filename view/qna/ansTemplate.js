module.exports = {
    container:function(){
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>개발자의 숲</title>
            <link href="css/qna/qna.css" type="text/css" rel="stylesheet">
        </head>
        
        <body>
            <div>
                <h5 class="count-answer">3개의 답변이 있습니다.</h5>
                <div class="answer-container">
                    <div class="answer-info">
                        <div class="info-float info-img">
                            <img id = "section_user_img" src="image/water-839590_1920.jpg">
                        </div>
                        <div class="info-float info-content">
                            <h4>답변 제목</h4>
                            <span>사용자이름</span> | <span>2019.09.24</span>
                        </div>
                        <div class="info-float-right">
                            <div class="like_img">
                            <div id="like_btn">
                                <img id="answer_like" src="image/favorite_border_black_24dp.svg"/>
                            </div>
                            </div>
                            <div class="like_num">
                                <p id=like_numbers>17</p>
                            </div>
                        </div>
                    </div>

                    <div class="answer-content">
                        <div class="content">
                            <p>7번째 줄에 오타가 있네요. 아래와 같이 고치시면 될 것 같습니다.(질문에 대한 답변입니다.)</p>
                        </div>
                        <div class="codepen">
                            <pre>
                                <code>
UPDATE purchaseOrder SET purchaseOrder_status = 'COMPLETED' WHERE purchaseOrder_ID = '@purchaseOrder_ID' and not exists (SELECT * FROM itemsOrdered WHERE purchaseOrder_ID = '@purchaseOrdered_ID' AND status = 'PENDING' )            
                                </code>
                            </pre>
                        </div>
                    </div>
        
                </div>
        </body>
        
        </html>
        `;
    }
}