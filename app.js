// ========================
//   Dependências
// ========================
var mongoose         = require('mongoose');
var bodyParser       = require('body-parser');
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var passportMongoose = require('passport-local-mongoose');
var methodOverride   = require('method-override');
var express          = require('express');
var expressSession   = require('express-session');
var flash            = require('connect-flash');
var app              = express();

var Comentario       = require('./models/comentario');
var Area             = require('./models/area-de-camping');
var Usuario          = require('./models/usuario');
var seedDB           = require('./seeds');

var indexRoutes = require('./routes/index');
var comentariosRoutes = require('./routes/comentarios');
var areasDeCampingRoutes = require('./routes/areas-de-camping');

var PORTA = process.env.PORT || 3000;

// ========================
//   Config
// ========================
mongoose.connect('mongodb://localhost/yelp_camping');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

app.use(expressSession({
    secret: 'what the fuck motherfucker',
    resave: false,
    saveUninitialized: false
}));

// ========================
//   Passport
// ========================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Usuario.authenticate()));
passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());

app.use(function(req, res, next) {
    res.locals.usuario = req.user;
    res.locals.erro = req.flash('erro');
    res.locals.sucesso = req.flash('sucesso');
    next();
});

// ========================
//   Routes
// ========================
app.use(indexRoutes);
app.use(comentariosRoutes);
app.use(areasDeCampingRoutes);

app.get('/', function (req, res) {
    res.redirect('/areas-de-camping');
});

// ========================
//   Init
// ========================
app.listen(PORTA, function() {
    console.log('servidor iniciado');
});
