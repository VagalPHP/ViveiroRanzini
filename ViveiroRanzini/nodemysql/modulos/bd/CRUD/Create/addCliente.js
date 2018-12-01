// PARA UTILIZAR ESSA FUNÇÃO É NECESSÁRIO PASSAR O OBJETO DA CONEXÃO COM O BANCO E A LISTA DE CLIENTES
// COMO CRIAR UMA LISTA? -> var lista = [];
/* EXEMPLO DE LISTA -> 
      var cliente1 = ['Vinicius', 'Vini', '12345678912', '11963986174'];
      var cliente2 = ['Vinicius', 'Vini', '12345678912', '11963986174'];
      var cliente3 = ['Vinicius', 'Vini', '12345678912', '11963986174'];
      var clientes = [cliente1, cliente2, cliente3];
*/

exports.addCliente = function (conn, cliente){
  const sql = "INSERT INTO Clientes (nome, apelido, cpf, celular) VALUES ?";
  
  conn.query(sql, [cliente], function (error, results, fields){
          if(error) return console.log(error);
          console.log('Adicionou registros!');
          conn.end(); //fecha a conexão
      });
}

