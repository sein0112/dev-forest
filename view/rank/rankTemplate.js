module.exports = {
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
    HTML:function(userRnak, groupRank){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>개발자의 숲</title>
            <link href="css/rank/rank.css" rel="stylesheet">
            
        </head>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script>
            $(document).ready(function() {
                
            });
            
        </script>
        <body>
            <div>
                <div class="ranking-container">
                    <a>개인랭킹</a>
                    ${this.userRankList(userRnak)}
                    <hr>
                    <a>단체랭킹</a>
                    ${this.groupRankList(groupRank)}
                </div>
        </body>
        
        </html>
        `;
    }
}