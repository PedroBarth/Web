const User = require('../models/User');

const Curso = require('../models/Curso');

const mongoose = require('mongoose');

exports.DetalharCurso = (req, res) => {

    let id = req.params.id;

    Curso.findById(id).then( cursoEncontrado =>{
        res.render('detalhar', {
            curso: cursoEncontrado,
            pageTitle: cursoEncontrado.courseTitle
        });
    })
    .catch(erro => {
        res.render('error/errorPage',{
            pageTitle: "Error Page",
            erro: erro
        })
    })

}

exports.PesquisaEnd = (req, res) => {

    let end = req.params.search;
    
    Curso.find().where('end').equals(end)
    .then( cursoEncontrado =>{
        res.render('cursosBusca', {
            palavra : end,
            cursos: cursoEncontrado,
            pageTitle: "Pesquisa",
            user : req.session.user
        });
    })
    .catch(erro => {
            console.log(erro);
    })

}


exports.PesquisaCurso = (req, res) => {

    let busca = req.body.searchWord;


    Curso.find({
        "courseTitle": new RegExp(".*"+busca+".*", "i")
    })
    .then( cursoEncontrado =>{
        res.render('cursosBusca', {
            palavra : busca,
            cursos: cursoEncontrado,
            pageTitle: "Pesquisa",
            user : req.session.user
        });
    })
    .catch(erro => {
        console.log(erro)
    })

}