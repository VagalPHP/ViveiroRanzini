const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão

app.set('view engine', 'ejs'); // Instancia o EJS
app.use(express.static('views')); // Torna estático o uso da pasta views como referência das rotas
app.set('views', __dirname + '/views'); // Padroniza as rotas das views

// IMPORTA A CONEXÃO COM O BANCO DE DADOS
var conexao = require('./modulos/bd/connection');
var conn = conexao.conectar();

// IMPORTA O MÓDULO DE CRIAÇÃO DE TABELAS 
var criarTabelas = require('./modulos/bd/CRUD/Create/create-table');
criarTabelas(); // SEMPRE É NECESSÁRIO INICIALIZAR O MÓDULO IMPORTADO (PODE SER FEITO DENTRO DE UMA VARIÁVEL EM CASOS ONDE É NECESSÁRIO VERIFICAÇÕES)

// -------------------------------------------------------- SEÇÃO PARA O CRUD ---------------------------------------

// ------------------------------> CREATE

// IMPORTA O MÓDULO DE INSERÇÃO DE CLIENTES
/*
var insertCliente = require('./modulos/bd/CRUD/Create/addCliente');
insertCliente.addCliente(conn, clientes);
*/


// ------------------------------> READ
// IMPORTA O MÓDULO DE BUSCA DE CLIENTES 
var buscaClienteNome = require('./modulos/bd/CRUD/Read/buscaCliente');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('json spaces', 2); // Numero de espaços entre os resultados para identação
//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => {
  buscaClienteNome.buscaCliente("Vinicius",res);
}); // ROTA RAIZ
/*
// ROTA PARA LISTAR TODOS OS CLIENTES CADASTRADOS NO SISTEMA
router.get('/clientes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE cliente=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM clientes' + filter, res);
});

// ROTA PARA APAGAR OS CLIENTES
router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM clientes WHERE cliente=' + parseInt(req.params.id), res);
});

// PROCEDIMENTO REALIZADO AO SER EFETUADA UMA REQUISIÇÃO POST NA ROTA '/clientes'
router.post('/clientes', (req, res) =>{
    const nome = req.body.nome.substring(0,40);
    const apelido = req.body.apelido.substring(0,20);
    const cpf = req.body.cpf.substring(0,11);
    const celular = req.body.celular.substring(0,11);
    execSQLQuery(`INSERT INTO Clientes (nome, apelido, cpf, celular) VALUES ('${nome}', '${apelido}', '${cpf}', '${celular}')`, res);
});

router.patch('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,40);
    const apelido = req.body.apelido.substring(0,20);
    const cpf = req.body.cpf.substring(0,11);
    const celular = req.body.celular.substring(0,11);
    execSQLQuery(`UPDATE clientes SET nome='${nome}', apelido='${apelido}', cpf='${cpf}, celular='${celular}'' WHERE cliente=${id}`, res);
});
*/
app.use('/', router); // FAZ COM QUE QUALQUER REQUISIÇÃO INICIAL COMEÇE DA RAIZ ('/') E PASSEM PELO ROTEADOR

//inicia o servidor
app.listen(port);
console.log('API funcionando!');
/*
// FUNÇÃO QUE EXECUTA AS FUNÇÕES SQL
// RECEBE COMO PARÂMETROS UM QUERY SQL QUALQUER (sqlQry) E UMA FUNÇÃO DE CALLBACK (res)
function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'viveiro_ranzini'
  });

  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('Executou!');
  });
}
*/