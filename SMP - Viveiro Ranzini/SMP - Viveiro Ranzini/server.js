'use strict';
// INSTANCIAS DE PACOTES [SQL, BODY-PARSER, EJS, EXPRESS]
var express = require('express'); // Framework para construção de aplicações Node
var bodyParser = require('body-parser'); // Para converter as requisições e usar os valores passados

// CONFIGURAÇÃO DA APLICAÇÃO
var app = express(); // Criando aplicação com Express
app.set('view engine', 'ejs'); // Instancia o EJS
app.use(express.static('views')); // Torna estático o uso da pasta views como referência das rotas
app.set('views', __dirname + '/views'); // Padroniza as rotas das views
app.use(bodyParser.json()); // Concede ao servidor acesso aos dados passados nas requisições
app.use(bodyParser.urlencoded({ extended: false }));

// INSTANCIAÇÃO DO PACOTE E DEFINIÇÃO DO MYSQL COMO O BANCO PRINCIPAL

// AUTENTICAÇÕES
/*
app.all('*', verificarUser); // Obriga todas as páginas a verificarem o usuário

function verificarUser(req, res, next) {
    if (!req.body.usuario) {
        
    }
}
*/

app.get('/', function (req, res) {
    res.render('login.ejs');
    addUsuario();
});

app.post('/', function (req, res) {
    var usuario = req.body.usuario;
    var senha = req.body.senha;

    if (checarUsuario(usuario, senha)) {
        console.log(checarUsuario(usuario,senha));
        res.render('home.ejs',
            {
                usuario: usuario,

            }
        );
    } else {
        var select = checarUsuario(usuario, senha);
        console.log("Erro");
        console.log(select);
    }
    

});
// CRIANDO SERVIDOR
var port = process.env.PORT || 1337; // Verifica a porta, se não encontrar usa a porta 1337
app.listen(port, function () {
    console.log("A aplicacao está rodando na porta ", port);
});



