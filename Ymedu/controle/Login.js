const User = require('../models/User');

const Curso = require('../models/Curso');

const Carrinho = require('../models/Carrinho');

const mongoose = require('mongoose');

exports.Cadastro = (req, res) =>{
    res.render('cadastro', {
        pageTitle: "Página de Cadastro",
        erro : null
    });
}

exports.MostraLogin = (req, res) => {
    
    let user = req.session.user;

    if(user){
        res.render('error/errorPage', {
            pageTitle: "Ops",
            logado: req.session.loggedIn,
            erro: "Você já está logado.",
            user : req.session.user
        })
    }

    res.render('login', {
        pageTitle: "Página de Login",
        logado: req.session.loggedIn,
        erro: null,
        user : req.session.user
    })

}


exports.Deslogar = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.FazLogin = (req, res) => {

    const login = req.body.nickname;
    const senha = req.body.pass;

    User.findOne({
        nickname : login,
        pass : senha
    })
    .then(userFound => {
        console.log("User: "+ userFound);

        if (userFound) { // achou usuario
            req.session.user = userFound;
            req.session.loggedIn = true;
            if (userFound.isadmin) {
                req.session.isadmin = true;
                res.redirect('/');  
            } else {
                res.redirect('/');
            }
             
        } else { // nao achou usuario
            
            res.render('login', {
                            pageTitle: "Página de Login",
                            logado: req.session.loggedIn,
                            user : req.session.user,
                            erro: "Dados não conferem"   
                        });
        }
    })
    .catch(erro => {
        console.log(erro);
        res.write(JSON.stringify(erro));
        res.end();
    });
   
}

exports.MostraMudarSenha = (req, res) => {

    let user = req.session.user;

    if(!user){
        res.redirect('login');
    }
    else{
        res.render('mudar-senha', {
            pageTitle : "Mudar Senha",
            erro : null,
            user : req.session.user
        });
    }
    
}

exports.MudarSenha = (req, res) => {

    let senhaAtual = req.body.senhaAtual;
    let emailAtual = req.session.user.email;
    let novaSenha = req.body.novaSenha;


    User.findOneAndUpdate({pass : senhaAtual, email : emailAtual}, {pass : novaSenha})
    .then(userFound => {

        if (userFound){
            res.redirect('/');    
        }
        else{
            res.render('mudar-senha', {
                pageTitle : "Mudar Senha",
                erro : "Senha antiga inválida"
            });
        }

    })
    .catch(erro => {
        console.log(erro);
        res.write(JSON.stringify(erro));
        res.end();
    });

}

exports.VerificaLogin = (req, res) => {

    const login = req.params.login;

    console.log(login);
    console.log("Executei");

    User.findOne({nickname : login})
    .then(user =>{

        if(user){
            console.log("Achou user " + user.name)
        }
        else{
            return true;
        }

    })
    .catch(erro=>{
        console.log(erro);
    })

}

exports.MudarSenhaEmail = (req, res) => {

    res.render('mudar-senha-email', {
        pageTitle : "Nova Senha"
    });

}

exports.MandarEmail = (req, res) => {

    function generatePassword() {
        var length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    let novaSenha = generatePassword();


    const userEmail = req.body.email

    User.findOneAndUpdate({email : userEmail}, {pass : novaSenha})
    .then(userFound => {

        if (userFound) { // achou usuario com esse email

            console.log(userFound.nickname)

            var nodemailer = require('nodemailer');
            var sgTransport = require('nodemailer-sendgrid-transport');
             
            var options = {
                auth: {
                    api_key: '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'
                }
            }
                
            var mailer = nodemailer.createTransport(sgTransport(options));
            
            

            var email = {
                to: userEmail,
                from: 'Cursos-Ymedu@hotmail.com',
                subject: 'Redefina sua senha',
                text: 'Plataforma de cursos online',
                html: "Sua nova senha é " + novaSenha
            };
             
            mailer.sendMail(email, function(err, res) {
                if (err) { 
                    console.log(err) 
                }
                console.log(res);
            });

            res.render('login', {
                pageTitle: "Página de Login",
                logado: req.session.loggedIn,
                user : req.session.user,
                erro: "Entre com a senha que lhe enviamos" 
            });
        } else { // nao achou usuario
            
            res.render('login', {
                            pageTitle: "Página de Login",
                            logado: req.session.loggedIn,
                            user : req.session.user,
                            erro: "Não encontramos nenhum usuário com este email"   
                    });
        }
    })
    .catch(erro => {
        console.log(erro);
        res.write(JSON.stringify(erro));
        res.end();
    });

}