'use strict';
// INSTANCIAS DE PACOTES [SQL, BODY-PARSER, EJS, EXPRESS]
var express = require('express'); // Framework para constru��o de aplica��es Node
var bodyParser = require('body-parser'); // Para converter as requisi��es e usar os valores passados

// CONFIGURA��O DA APLICA��O
var app = express(); // Criando aplica��o com Express
app.set('view engine', 'ejs'); // Instancia o EJS
app.use(express.static('views')); // Torna est�tico o uso da pasta views como refer�ncia das rotas
app.set('views', __dirname + '/views'); // Padroniza as rotas das views
app.use(bodyParser.json()); // Concede ao servidor acesso aos dados passados nas requisi��es
app.use(bodyParser.urlencoded({ extended: false }));

// INSTANCIA��O DO PACOTE E DEFINI��O DO MYSQL COMO O BANCO PRINCIPAL

// AUTENTICA��ES
/*
app.all('*', verificarUser); // Obriga todas as p�ginas a verificarem o usu�rio

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
var port = process.env.PORT || 1337; // Verifica a porta, se n�o encontrar usa a porta 1337
app.listen(port, function () {
    console.log("A aplicacao est� rodando na porta ", port);
});



