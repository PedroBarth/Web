const express = require('express');

const Controle = require('../controle/Controller.js');

const Login = require('../controle/Login');

const Pesquisa = require('../controle/Pesquisa');

const router = express.Router();

router.use(express.static('public')); 

router.post('/new-course', Controle.NovoCurso);

router.get('/cadastrar-curso', Controle.CadastrarCurso)

router.get('/deleteCurso/:id', Controle.DeletarCurso);

router.get('/delete/:id', Controle.DeletarUser);

module.exports = router;