const User = require('../models/User');

const Curso = require('../models/Curso');

const Carrinho = require('../models/Carrinho');

const mongoose = require('mongoose');

exports.PaginaInicial = (req, res) => {

    Curso.find()
    .then( todosCursos =>{
        res.render('home', {
            cursos: todosCursos,
            logado: req.session.loggedIn,
            user: req.session.user,
            msg : null
        })
    })
    .catch( erro => {
        console.log(erro);
    })
    
}


exports.NovoUser = (req, res) => {

    let novoUser = new User(req.body);
    
    
    novoUser.save()
    .then( ok => {
        console.log("Usuario salvo com sucesso.\nUser" + ok);
        res.redirect('/');
    })
    .catch(erro => {
        console.log(erro);
    })
             

}

exports.MostrarUsuarios = (req, res) => {


    User.find()
    .then(users => {
        res.render('tabela', {
            pageTitle: "Todos Usuários",
            users: users
        });
    })
    .catch(erro => {
        res.render('error/errorPage',{
            pageTitle: "Error Page",
            error: JSON.stringify(erro)})
    });

}

exports.DeletarUser = (req, res) => {

    let id = req.params.id;

    User.findByIdAndRemove(id).then(ok => {
        res.redirect('/ver-usuarios');
    })

}


exports.CadastrarCurso = (req, res) => {

    res.render('cadastro-curso', {
        pageTitle: "Criar Curso",
        logado: req.session.loggedIn,
        user: req.session.user 
    });

}

exports.NovoCurso = (req ,res) => {

    let novocurso = new Curso(req.body);
    
    novocurso.autor = req.session.user.name;

    novocurso.autorID = req.session.user._id;

    novocurso.save()
    .then( ok => {
        console.log("Curso cadastrado");
        res.redirect('/');
    })
    .catch(erro => {
        res.render('error/errorPage',{
            pageTitle: "Error Page",
            error: JSON.stringify(erro)})
    })

}

exports.DeletarCurso = (req, res) => {

    let id = req.params.id;

    Curso.findByIdAndRemove(id).then(ok => {
        res.redirect('/');
    })

}

