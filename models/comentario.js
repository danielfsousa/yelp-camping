var mongoose = require('mongoose');

var comentarioSchema = new mongoose.Schema({
    autor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        usuario: String
    },
    texto: String
});

var Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;