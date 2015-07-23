var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

// Página de entrada (home page)
router.get('/', sessionController.timeout, function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load);  // autoload :commentId

// Definición de rutas de sesion
router.get('/login',  sessionController.timeout, sessionController.new);     // formulario login
router.post('/login', sessionController.timeout, sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

// Definición de rutas de /quizes
router.get('/quizes',                      sessionController.timeout, quizController.index);
router.get('/quizes/:quizId(\\d+)',        sessionController.timeout, quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', sessionController.timeout, quizController.answer);
router.get('/quizes/new', 				   sessionController.timeout, sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.timeout, sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.timeout, sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.timeout, sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.timeout, sessionController.loginRequired, quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', sessionController.timeout, commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    sessionController.timeout, commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', 
	                                    sessionController.timeout, sessionController.loginRequired, commentController.publish);

module.exports = router;
