const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {logarUsuario} = require('./routes/index');
const {addClientePage, addCliente, deleteCliente, editarCliente, editarClientePage} = require('./routes/cliente');
const port = 2000;

// CRIA CONEXÃO COM O BANCO DE DADOS
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'viveiro_ranzini'
});

// CONECTA AO BANCO
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao Banco de Dados');
});
// TORNA A VARIÁVEL db GLOBAL (ESTÁ SENDO USADA EM DIVERSAS PARTES)
global.db = db;

// TORNA A VARIÁVEL sessao GLOBAL (ESTÁ SENDO USADA EM DIVERSAS PARTES PARA VERIFICAR SE O USUARIO JÁ ESTÁ LOGADO OU NÃO)
global.sessao = false;

// CONFIGURANDO O INTERMEDIÁRIO (CARINHA QUE PADRONIZA AS PASTAS, AS ROTAS, PERMITI INTERCEPTAR OS DADOS TRAFEGADOS E ETC...)
app.set('port', process.env.port || port); // SETA A PORTA PARA O SERVIDOR
app.set('views', __dirname + '/views'); // SETA O APP PARA PROCURAR AS NOSSAS VIEWS DENTRO DESSA PASTA (COM ISSO, SÓ PRECISAREMOS PASSAR O NOME DOS ARQUIVOS)
app.set('view engine', 'ejs'); // CONFIGURA O MECANISMO DE TEMPLATE (NO NOSSO CASO O EJS, QUE SUPORTA A ESTRUTURA HTML BASE E RECEBER OS DADOS PASSADOS PELO NODE)
app.use(express.static(path.join(__dirname, 'public'))); // SETA A PASTA public COMO O PATH PARA NOSSOS ARQUIVOS DE CSS, IMAGENS E AFINS (SEM ISSO DA UM ERRO DE PERMISSÃO MUITO LOUCO, NÃO CONSEGUI RESOLVER DE OUTRA MANEIRA)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // CONVERTE OS DADOS PASSADOS NAS REQUISIÇÕES (TODOS EM UM PACOTE JSON, POR PADRÃO) DE MODO QUE POSSAMOS UTILIZÁ-LO

// ROTAS DA APLICAÇÃO

// ROTA RAIZ
app.get('/', function(req,res){
    if(sessao == false){
    	res.render('login.ejs',{
            erro: "" // ESTOU TESTANDO ISSO AINDA PARA TENTAR IMPRIMIR A MENSAGEM DE ERRO... DEPOIS EXPLICO
        });
    }else{
        sessao = true;
        res.render('index.ejs');
    }
});

// ROTA PARA ADICIONAR CLIENTE
app.get('/add', function(req, res){
    if (sessao == false) {
        res.redirect('/');
    }else{
        addClientePage(req,res);
    }
});

// ROTA PARA EDITAR CLIENTE
app.get('/edit/:id', editarClientePage);

// ROTA PARA DELETAR CLIENTE
app.get('/delete/:id', deleteCliente);

// INTERCEPTA TODA E QUALQUER REQUISIÇÃO DO TIPO POST DENTRO DO DIRETÓRIO ADD (add-cliente.ejs)
app.post('/add', addCliente);

// INTERCEPTA TODA E QUALQUER REQUISIÇÃO DO TIPO POST DENTRO DO DIRETÓRIO RAIZ (edit-cliente.ejs)
app.post('/edit/:id', editarCliente);

// INTERCEPTA TODA E QUALQUER REQUISIÇÃO DO TIPO POST DENTRO DO DIRETÓRIO RAIZ (login.ejs)
app.post('/', logarUsuario);




// set the app to listen on the port
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});