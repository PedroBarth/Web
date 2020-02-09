const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieparser = require('cookie-parser');

const app = express();

app.use(session({
    secret: 'minha super frase secreta hehe',
    resave: false,
    saveUninitialized: false
}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public')); //o padrao é /public, então pode ser omitido

const rotas = require('./rotas/rotas');
app.use(rotas);

const loginRoutes = require('./rotas/loginRoutes');
app.use(loginRoutes);

const isAdmin = (req, res, next) => {
    console.log("Verificando se é professor: ");
    if (req.session.isadmin) {
        console.log("É prof");
        next();
    } else {
        console.log("Não é prof");
        res.render('login', {
            erro : "Voce precisa estar logado como admin",
            pageTitle: "Página de Login",
            logado: req.session.loggedIn,
            user : req.session.user,
        });
    }
}

const professorRoutes = require('./rotas/professorRoutes');
app.use('/prof', isAdmin, professorRoutes);



app.use(cookieparser());

const mongoURL = "mongodb://arthur:arthur123@cluster0-shard-00-00-vrfuh.gcp.mongodb.net:27017,cluster0-shard-00-01-vrfuh.gcp.mongodb.net:27017,cluster0-shard-00-02-vrfuh.gcp.mongodb.net:27017/Ymedu?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(mongoURL, {useNewUrlParser: true}).then(result => {
    app.listen(3000, () => console.log("Listening at 3000"));
})
