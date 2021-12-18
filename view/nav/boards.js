var db = require('../../db.js');
module.exports = {

    boards: function() {
        let result = '<div id="tags">';
        let i = 0;
        let rOrl = '';
        db.query('SELECT * FROM boardtbl', function(error, boards){
            while (i < boards.length) {
                if (i%2 == 0) rOrl = 'right'; else{ rOrl = 'left';}
                result += `<a href="/board/${boards[i].id}" class="${rOrl}">${boards[i].name}</a>`;
                i++
            }
            result += '</div>';
            return result;
            console.log(result);
        }); 
    }

}