var express = require('express');
var router = express.Router();

var m = require('../middleware');
var Area = require('../models/area-de-camping');
var Comentario = require('../models/comentario');

// ========================
//   CREATE
// ========================

router.get('/areas-de-camping/:id/comentarios/new', m.estaLogado, function (req, res) {
    Area.findById(req.params.id, function (err, areaEncontrada) {
        if(err) {
            req.flash('erro', 'Área não encontrada');
            console.log(err);
        } else {
            res.render('comentarios/new', {area: areaEncontrada});
        }
    });
});

router.post('/areas-de-camping/:id/comentarios', m.estaLogado, function (req, res) {
    Comentario.create(req.body.comentario, function (err, novoComentario) {
        if(err) {
            req.flash('erro', 'Não foi possível criar o comentário');
            console.log(err);
        } else {
            Area.findById(req.params.id, function (err, areaEncontrada) {
                if(err) {
                    req.flash('erro', 'Área não encontrada');
                    console.log(err);
                } else {
                    novoComentario.autor.id = req.user._id;
                    novoComentario.autor.usuario = req.user.username;
                    novoComentario.save();
                    areaEncontrada.comentarios.push(novoComentario);
                    areaEncontrada.save();
                    req.flash('sucesso', 'Comentário criado com sucesso');
                    res.redirect('/areas-de-camping/' + req.params.id );
                }
            });
        }
    });
});

// ========================
//   UPDATE
// ========================
router.get('/areas-de-camping/:areaId/comentarios/:id/edit', m.estaAutorizadoComentario, function(req, res) {
    Comentario.findById(req.params.id, function(err, comentarioEncontrado) {
            if(err) {
                req.flash('erro', 'Comentário não encontrado');
                console.log(err);
            }
            res.render('comentarios/edit', {
                areaId: req.params.areaId,
                comentario: comentarioEncontrado
            });
    });
});

router.put('/areas-de-camping/:areaId/comentarios/:id', m.estaAutorizadoComentario, function(req, res) {
    Comentario.findByIdAndUpdate(req.params.id, req.body.comentario, function(err) {
        if(err) {
            req.flash('erro', 'Erro ao alterar comentário');
            console.log(err);
        } else {
            req.flash('sucesso', 'Comentário alterado com sucesso');
        }
        res.redirect('/areas-de-camping/' + req.params.areaId);
    });
});

// ========================
//   DELETE
// ========================
router.delete('/areas-de-camping/:areaId/comentarios/:id', m.estaAutorizadoComentario, function(req, res) {
    Comentario.findByIdAndRemove(req.params.id, function (err) {
        if(err) {
            req.flash('erro', 'Não foi possível excluir o comentário');
            console.log(err);
        } else {
            req.flash('sucesso', 'Comentário excluído com sucesso');
        }
        res.redirect('/areas-de-camping/' + req.params.areaId);
    });
});

// Export
module.exports = router;