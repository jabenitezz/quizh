var moment = require('moment');

// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
    //var moment = require('moment');

    var now1 = moment();
        console.log('------------------Tiempo actual ' + know1);
    if (req.session.user) {
      //  console.log('++++++++++++++++++++++Tiempo actual ' + now);
        next();
        //res.redirect('/login');
    } else {
        res.redirect('/login');
    }
};


exports.timeout = function(req, res, next){
    //var moment = require('moment');

    var know1 = moment();
        console.log('------------------Tiempo actual ' + know1);
    if (req.session.user === undefined ) {
        console.log('--------Variable time no creada ' );
    } else {
        var fecha2= moment(req.session.user.time);
        console.log('--------Variable time creada . time valor: ' + req.session.user.time);
        console.log('--------Variable time creada . fecha2 valor: ' + fecha2);
        console.log('--------Diferencia en segundos: ' + know1.diff(fecha2, 'seconds') );
        if (know1.diff(fecha2, 'seconds') > 120){
          res.redirect('/logout'); 
          return;
        }
    }
    next();
};





// Get /login   -- Formulario de login
exports.new = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sessions/new', {errors: errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.create = function(req, res) {

    //var moment = require('moment');
    var login     = req.body.login;
    var password  = req.body.password;
    var now = moment();

    console.log('Tiempo actual ' + now);
    var userController = require('./user_controller');
    userController.autenticar(login, password, function(error, user) {

        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");        
            return;
        }

        // Crear req.session.user y guardar campos   id  y  username y la hora actual
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username, time:now };

        res.redirect(req.session.redir.toString());// redirección a path anterior a login
    });
};

// DELETE /logout   -- Destruir sesion 
exports.destroy = function(req, res) {
    delete req.session.user;
    res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};
