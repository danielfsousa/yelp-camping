var mongoose = require('mongoose');
var passportMongoose = require('passport-local-mongoose');

var usuarioSchema = new mongoose.Schema({
    username: String,
    password: String
});

usuarioSchema.plugin(passportMongoose);

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;