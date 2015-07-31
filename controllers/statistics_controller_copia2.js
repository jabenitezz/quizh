var models = require('../models/models.js');


function buscarPreguntasNoComentarios(){
     return models.Quiz.count({
         distinct: true,
         where: [ '"Comments"."QuizId" IS NULL' ],
         include: [{
            model: models.Comment,
                required: false
        }]
    });
};



function buscarPreguntasComentarios(){
     return models.Quiz.count({
         distinct: true,
         where: [ '"Comments"."QuizId" IS NOT NULL' ],
         include: [{
            model: models.Comment,
                required: false
        }]
    });
};


function buscarPreguntas(){
    return models.Quiz.count();
};


function buscarComentarios(){
    return models.Comment.count();
};


var comentariosporpreguntas=function(){
    var total;

    buscarPreguntas().then(function(preguntas) {
      buscarComentarios().then(function(comentarios) {
         total=comentarios/preguntas;
         console.log("Comentarios por preguntas  " + total + "  " );
         return total;
      });

     //    return function(vv){
      //     return total;
       //  };

    });

};



var square = function () {
  return 5 * 6;
} 


// GET /quizes
exports.index = function(req, res) {
     console.log(" Primero!");

var statistics = {
       quizes: 0,
       comments: 0,
       commentsUnpublished: 0,
       commentedQuizes:0
     };

    console.log("Raiz cuadrada " + square());

    buscarPreguntas().then(function(count) {
      statistics.quizes = count;
      console.log("Total de preguntas: " + count + " ");
    });

    buscarComentarios().then(function(count) {
      statistics.comments=count;
      console.log("Total de comentarios: " + count + " ")
    });
 
    
   // comentariosporpreguntas(function(count) {
    //  console.log("Total de buscarComentariosporpreguntas: " + count + " ")
    //});
//console.log("Total comentariosporpreguntas: " + comentariosporpreguntas() + " ");
//////////////console.log("Total buscarComentariosporpreguntas: " + total + " ");


     buscarPreguntasNoComentarios().then(function(count) {
      statistics.commentsUnpublished=count;
      console.log("Total de preguntas sin comentarios: " + count + " ")
    });

   
    buscarPreguntasComentarios().then(function(count) {
      statistics.commentedQuizes=count;
      console.log("Total de preguntas con comentarios: " + count + " ");
      console.log("----valores: " + statistics.quizes + ":" + statistics.comments + ":" + statistics.commentsUnpublished + ":" + statistics.commentedQuizes);
    });
 
    
   console.log("valores: " + statistics.quizes + ":" + statistics.comments + ":" + statistics.commentsUnpublished + ":"
   + statistics.commentedQuizes);
    



};



