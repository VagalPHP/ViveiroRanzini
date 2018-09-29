const mysql = require('mysql');
const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'',
    database:'viveiro_ranzini'
});

conexao.connect(function (erro) {
    if (erro) return console.log(erro);
    console.log("Conexão estabelecida com suceso");
});

function createTableUser() {
    const sql = "CREATE TABLE Usuarios(" +
        "id_usuario int NOT NULL AUTO INCREMENT," +
        "usuario varchar(20)," +
        "senha varchar(10)," +
        "nome varchar(30)," + 
        "UNIQUE(usuario)," + 
        "PRIMARY KEY(id_usuario)"
    ");";
    conexao.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log("Tabela Usuario criada");
    });
}

function createTableCliente() {
    const sql = "CREATE TABLE Clientes(" +
        "id_cliente int NOT NULL AUTO INCREMENT," +
        "nome varchar(40)," +
        "apelido varchar(20)," +
        "cpf char(11),"+
        "celular char(11)" +
        "PRIMARY KEY(id_cliente)" +
    ");";
    conexao.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log("Tabela Cliente criada");
    });
}

function createTableProduto() {
    const sql = "CREATE TABLE Produtos(" +
        "id_produto int NOT NULL AUTO INCREMENT," +
        "descricao varchar(50)," +
        "qtde int," +
        "preco decimal(3,2)," +
        "PRIMARY KEY(id_produto)" +
        ");";
    conexao.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log("Tabela Produto criada");
    });
}

function createTablePromo() {
    const sql = "CREATE TABLE Promocao(" +
        "id_promocao int NOT NULL AUTO INCREMENT," +
        "data_inicio date," +
        "data_termino date," +
        "PRIMARY KEY(id_promocao)" +
        ");";
    conexao.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log("Tabela Promoção criada");
    });
}

function createTablePromo() {
    const sql = "CREATE TABLE Promocao(" +
        "id_promocao int NOT NULL AUTO INCREMENT," +
        "data_inicio date," +
        "data_termino date," +
        "PRIMARY KEY(id_promocao)" +
        ");";
    conexao.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log("Tabela Promoção criada");
    });
}