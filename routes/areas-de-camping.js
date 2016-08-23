var express = require('express');
var router = express.Router();
var Area = require('../models/area-de-camping');
var m = require('../middleware');

// ========================
//   CREATE
// ========================
router.post('/areas-de-camping', m.estaLogado, function (req, res) {
    var nome = req.body.nome;
    var imagem = req.body.imagem;
    var descricao = req.body.descricao;
    var autor = {
        id: req.user._id,
        usuario: req.user.username
    };
    var novaArea = {nome: nome, imagem: imagem, autor: autor, descricao: descricao};

    Area.create(novaArea, function (err, areaCriada) {
        if (err) {
            req.flash('erro', 'Não foi possível criar a Área de Camping');
            console.log(err);
        } else {
            req.flash('sucesso', 'Área de Camping criada com sucesso');
        }
        res.redirect('/areas-de-camping');
    });

});

router.get('/areas-de-camping/new', m.estaLogado, function (req, res) {
    res.render('areas-de-camping/new');
});

// ========================
//   READ
// ========================
router.get('/areas-de-camping', function (req, res) {
    // Recebe todas as Areas de camping do banco de dados
    Area.find({}, function (err, areas) {
        if (err) {
            req.flash('erro', 'Área de Camping não encontrada');
            console.log(err);
        } else {
            res.render('areas-de-camping/index', {areas: areas});
        }
    });

});

router.get('/areas-de-camping/:id', function (req, res) {
    var id = req.params.id;
    Area.findById(id).populate('comentarios').exec(function (err, areaEncontrada) {
        if (err) {
            console.log(err);
            req.flash('erro', 'Área de Camping não encontrada');
            res.redirect('/areas-de-camping');
        } else {
            res.render('areas-de-camping/show', {area: areaEncontrada});
        }
    });
});

// ========================
//   UPDATE
// ========================
router.get('/areas-de-camping/:id/edit', m.estaAutorizadoArea, function(req, res) {
    Area.findById(req.params.id, function (err, areaEncontrada) {
        res.render('areas-de-camping/edit', {area: areaEncontrada});
    });
});

router.put('/areas-de-camping/:id', m.estaAutorizadoArea, function(req, res) {

    Area.findByIdAndUpdate(req.params.id, req.body.area, function(err, areaEncontrada) {
        if(err) {
            console.log(err);
            req.flash('erro', 'Não foi possível alterar a Área de Camping');
        } else {
            req.flash('sucesso', 'Área de Camping alterada com sucesso');
        }
        res.redirect('/areas-de-camping/'+ areaEncontrada._id);
    });
});


// ========================
//   DELETE
// ========================
router.delete('/areas-de-camping/:id', m.estaAutorizadoArea, function(req, res) {

   Area.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           req.flash('erro', 'Não foi possível excluir a Área de Camping');
           console.log(err);
       } else {
           req.flash('sucesso', 'Área de Camping excluída com sucesso');
       }
       res.redirect('/areas-de-camping');
   });
});

// Export
module.exports = router;