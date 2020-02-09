const User = require('../models/User');

const Curso = require('../models/Curso');

const Carrinho = require('../models/Carrinho');

const mongoose = require('mongoose');



exports.MostraCarrinho = (req, res) => {

    let user = req.session.user;
    let allCursos;      
    let carrinho;  

        Carrinho.findOne({userID : user._id})
        .then(carrinhoAtual => {
            if(carrinhoAtual){ // achou carrinho

                carrinho = carrinhoAtual;
                console.log("Cursos: " + carrinhoAtual.cursos);
                IDcursos = carrinhoAtual.cursos;
                
               
                Curso.find({"_id" : IDcursos})
                .then( cursosAchados =>{
                    console.log("Todos cursos " + cursosAchados);
                    let total = 0;
                    for(curso of cursosAchados){
                        total += curso.valor;
                    }

                    res.render('carrinho',{
                        pageTitle : "Carrinho",
                        user : req.session.user,
                        cursosCarrinho : cursosAchados,
                        valorTotal : total,
                        carrinho : carrinho
                    })

                })
                .catch(erro =>{
                    console.log(erro);
                })

                
            }

            else{ // n achou carrinho
                res.render('carrinho',{
                    pageTitle : "Carrinho",
                    user : req.session.user,
                    cursosCarrinho : null
                })
            }

        })
        .catch(erro =>{
            console.log(erro);
        })

            
}

exports.FreeCarrinho = (req, res) =>{
    let user = req.session.user;
    
    Carrinho.findOneAndRemove({userID : user._id})
    .then(ok =>{
        console.log(ok)
    })
    .catch(erro =>{
        console.log(erro);
    })
    
    res.redirect('/');

}

exports.AddCarrinho = (req, res) => {
    
    let user = req.session.user;

    let cursoID = req.params.id;

    let todosCursos;

    Carrinho
        .findOne({userID : user._id})
        .then(carrinhoAtual => {
            console.log("Carrinho: " + carrinhoAtual);

            if (!carrinhoAtual) {// nao achou carrinho

                let novoCarrinho = new Carrinho();
    
                novoCarrinho.userID = user._id;

                novoCarrinho.save()
                .then( ok => {
                    console.log("Carrinho criado com sucesso.");
                })
                .catch(erro => {
                    console.log(erro);
                })
                
            } //  achou carrinho

            if(carrinhoAtual){
               //Faz a inserção

               if(carrinhoAtual.cursos!=null){
                    todosCursos = carrinhoAtual.cursos;
                    todosCursos.push(cursoID);
                }
                else{
                    todosCursos = cursoID;
                } 

                Carrinho.findOneAndUpdate({userID : user._id}, {cursos : todosCursos})
                .then(ok => {
                    console.log(ok);
                })
                .catch(erro => {
                    console.log(erro);
                }) 
            }
                           
            

        })
        .catch(erro => {
            console.log(erro);
        })

    res.redirect('/');

}