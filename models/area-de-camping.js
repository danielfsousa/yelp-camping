var mongoose = require('mongoose');

// Schema Setup
var areaSchema = new mongoose.Schema({
    nome: String,
    imagem: String,
    descricao: String,
    autor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        usuario: String
    },
    comentarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comentario'
        }
    ]
});

module.exports = mongoose.model('Area', areaSchema);