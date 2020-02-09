const express = require('express');

const Controle = require('../controle/Controller.js');

const Login = require('../controle/Login');

const Pesquisa = require('../controle/Pesquisa');

const CarrinhoController = require('../controle/CarrinhoController');

const router = express.Router();

router.use(express.static('public')); 

const taLogado = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.render('login', {
            erro : "Você precisa estar logado",
            pageTitle: "Página de Login",
            user : req.session.user,
        });
    }
}

router.get('/', Controle.PaginaInicial);

router.get('/detalhar/:id', Pesquisa.DetalharCurso);

router.get('/pesquisa/:search', Pesquisa.PesquisaEnd);

router.post('/search', Pesquisa.PesquisaCurso);

router.get('/ver-usuarios', Controle.MostrarUsuarios);

router.post('/new-user', Controle.NovoUser);

router.get('/ver-carrinho', taLogado, CarrinhoController.MostraCarrinho);

router.get('/add-carrinho/:id', taLogado, CarrinhoController.AddCarrinho);

router.get('/finalizar-compra/:id', taLogado, CarrinhoController.FreeCarrinho);

module.exports = router;