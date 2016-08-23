var Area = require('../models/area-de-camping');
var Comentario = require('../models/comentario');

var middleware = {};

middleware.estaLogado = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('erro', 'Você precisar estar logado para continuar!');
        res.redirect('/entrar');
    }
};

middleware.estaAutorizadoArea = function (req, res, next) {
    if (req.isAuthenticated()) {
        Area.findById(req.params.id, function (err, areaEncontrada) {
            if (err) {
                req.flash('erro', 'Área não foi encontrada');
                res.redirect('back');
            } else if (areaEncontrada.autor.id.equals(req.user._id)) {
                next();
            } else {
                req.flash('erro', 'Você não tem permissão para continuar');
                res.redirect('back');
            }
        });
    } else {
        req.flash('erro', 'Você precisa estar logado para continuar');
        res.redirect('back');
    }
};

middleware.estaAutorizadoComentario = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comentario.findById(req.params.id, function (err, comentarioEncontrado) {
            if (err) {
                req.flash('erro', 'Comentário não foi encontrado');
                res.redirect('back');
            } else if (comentarioEncontrado.autor.id.equals(req.user._id)) {
                next();
            } else {
                req.flash('erro', 'Você não tem permissão para continuar');
                res.redirect('back');
            }
        });
    } else {
        req.flash('erro', 'Você precisa estar logado para continuar');
        res.redirect('back');
    }
};

module.exports = middleware;
