const fs = require('fs');

module.exports = {
    question : function (){
        let url = '/question.html';
        return fs.readFileSync(__dirname + url);
    },
    question_creat : function (){
        let url = '/questionCreate.html';
        return fs.readFileSync(__dirname + url);
    },


}