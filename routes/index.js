var express = require('express');
var router = express.Router();
var passport = require('passport');

var Usuario = require('../models/usuario');

// ========================
//   Auth
// ========================

router.get('/registrar', function (req, res) {
    res.render('autenticacao/registrar');
});

router.post('/registrar', function (req, res) {
    var usuario = req.body.username;
    var senha = req.body.password;
    var novoUsuario = new Usuario({username: usuario});
    Usuario.register(novoUsuario, senha, function (err, usuario) {
        if (err) {
            switch (err.name) {
                case 'MissingUsernameError':
                    req.flash('erro', 'Digite um nome de usuário');
                    break;

                case 'UserExistsError':
                    req.flash('erro', 'O nome de usuário já existe');
                    break;

                default:
                    req.flash('erro', 'Erro. Tente novamente!');

            }
            console.log(err);
            res.redirect('/registrar');
        } else {
            console.log('registrou:');
            console.log(usuario);
            req.flash('sucesso', 'Olá ' + usuario.username + ', Seja Bem-vindo ao Yelp Camping!');
            passport.authenticate('local')(req, res, function () {
                res.redirect('/areas-de-camping');
            });
        }
    });
});

router.get('/entrar', function (req, res) {
    res.render('autenticacao/entrar');
});

router.post('/entrar', passport.authenticate('local',
    {
        successRedirect: '/areas-de-camping',
        failureRedirect: '/entrar'
    }), function (req, res) {
});

router.get('/sair', function (req, res) {
    req.logout();
    res.redirect('back');
});

// Export
module.exports = router;