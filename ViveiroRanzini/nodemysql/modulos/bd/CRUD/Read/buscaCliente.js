var conexao = require('../../connection');
var conn = conexao.conectar();

// SQL'S USADAS PARA BUSCAR CLIENTES 
const buscaCliNome = "SELECT cliente, nome, apelido, cpf, celular FROM clientes WHERE nome = ?"; //BUSCA POR NOME
const todosClientes = "SELECT cliente, nome, apelido, cpf, celular FROM clientes"; //BUSCA POR NOME

exports.buscaCliente = function(nome, res) {
	conn.query(buscaCliNome,[nome], function(error, results, fields){
		if (error) return console.log("Erro na Busca de Cliente por Nome: " + error);
		else{
			res.render('home.ejs');
			return resultados;
		} 
	});
}

exports.todosClientes = function (res) {
	conn.query(buscaCliNome, function(error, results, fields){
		if (error) return console.log("Erro na Busca de Todos os Clientes: " + error);
		else return res.json({TodosClientes: results});
	});
}