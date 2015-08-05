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
    console.log("Inicio buscarPreguntas : ");
    return models.Quiz.count();
};


function buscarComentarios(){
    console.log("Inicio buscarComentarios : ");
    return models.Comment.count();
};

function papa(){
    console.log("Inicio papa ");
    return "";
};


var square = function () {
  return 5 * 6;
}


// GET /quizes
exports.index = function(req, res) {
     console.log(" Primero!");

var estadisticas = {
       preguntas: 0,
       comentarios: 0,
       comentariosporpregunta: 0,
       preguntasnocomentarios: 0,
       preguntasconcomentarios:0
     };

    console.log("Raiz cuadrada " + square());

    buscarPreguntas().then(function(count) {
      estadisticas.preguntas = count;
      console.log("Total de preguntas: " + count + " ");
      return buscarComentarios();
    }).then(function(count) {
      estadisticas.comentarios=count;
      console.log("Total de comentarios: " + count + " ");
      return;
    }).then(function(){
           estadisticas.comentariosporpregunta=estadisticas.comentarios/estadisticas.preguntas;
           console.log("Total de comentariosporpregunta: " + estadisticas.comentariosporpregunta + " ");
           return buscarPreguntasNoComentarios();
    }).then(function(count) {
      estadisticas.preguntasnocomentarios=count;
      console.log("Total de preguntas sin comentarios: " + count + " ");
      return;
    }).then(function(){
           estadisticas.preguntasconcomentarios=estadisticas.preguntas-estadisticas.preguntasnocomentarios;
           console.log("Total de preguntas con comentarios: " + estadisticas.preguntasconcomentarios + " ");
           return;
    }).then(function() {
    console.log("valores: " + estadisticas.preguntas + ":" + estadisticas.comentarios + ":" + estadisticas.comentariosporpregunta + ":"
    + estadisticas.preguntasnocomentarios+ ":" + estadisticas.preguntasconcomentarios);
    res.render('quizes/statistics.ejs', {estadisticas: estadisticas, errors: []});
   }
  ).catch(function(error){next(error)})

  .finally(function () {
    console.log("valores finally: " + estadisticas.preguntas + ":" + estadisticas.comentarios + ":" + estadisticas.comentariosporpregunta + ":"
    + estadisticas.preguntasnocomentarios+ ":" + estadisticas.preguntasconcomentarios);
    //res.render('quizes/statistics.ejs', {estadisticas: estadisticas, errors: []});
  });










};
