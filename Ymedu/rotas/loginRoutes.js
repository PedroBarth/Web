const express = require('express');

const Controle = require('../controle/Controller.js');

const Login = require('../controle/Login');

const Pesquisa = require('../controle/Pesquisa');

const router = express.Router();

router.use(express.static('public')); 

router.get('/cadastro', Login.Cadastro);

router.get('/login', Login.MostraLogin);

router.get('/deslogar', Login.Deslogar);

router.post('/login', Login.FazLogin);

router.get('/mudar-senha', Login.MostraMudarSenha);

router.post('/mudar-senha', Login.MudarSenha);

router.get('/mudar-senha-email', Login.MudarSenhaEmail);

router.post('/mandar-email', Login.MandarEmail);

router.get('/verifica-login/:login', Login.VerificaLogin);

module.exports = router;