

function createTableCliente(conn){

      // CRIAÇÃO DA TABELA Clientes
      const sql = "CREATE TABLE IF NOT EXISTS Clientes (\n"+
                  "cliente INT NOT NULL AUTO_INCREMENT,\n"+
                  "nome varchar(40) NOT NULL,\n"+
                  "apelido varchar(20) NOT NULL,\n"+
                  "cpf char(11) NOT NULL,\n"+
                  "celular char(11) NOT NULL,\n"+
                  "PRIMARY KEY (cliente)\n"+
                  ");";

      // VERIFICA SE A QUERY FOI EXECUTADA COM SUCESSO OU NÃO           
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('Criou a tabela Clientes!');
      });
}

function createTableUsuario(conn){

      // CRIAÇÃO DA TABELA Usuarios
      const sql = "CREATE TABLE IF NOT EXISTS Usuarios (\n"+
                  "user INT NOT NULL AUTO_INCREMENT,\n"+
                  "usuario varchar(20) NOT NULL,\n"+
                  "senha varchar(10) NOT NULL,\n"+
                  "nome varchar(30) NOT NULL,\n"+
                  "PRIMARY KEY (user)\n"+
                  "UNIQUE(usuario)\n"+
                  ");";
      // VERIFICA SE A QUERY FOI EXECUTADA COM SUCESSO OU NÃO           
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('Criou a tabela Usuarios!');
      });
}

function createTableProdutos(conn){

      // CRIAÇÃO DA TABELA Produtos
      const sql = "CREATE TABLE IF NOT EXISTS Produtos (\n"+
                  "produto INT NOT NULL AUTO_INCREMENT,\n"+
                  "descricao varchar(50) NOT NULL,\n"+
                  "qtde INT,\n"+
                  "preco decimal(3,2) NOT NULL,\n"+
                  "PRIMARY KEY (produto)\n"+
                  "INDEX(produto)\n"+
                  ");";

      // VERIFICA SE A QUERY FOI EXECUTADA COM SUCESSO OU NÃO           
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('Criou a tabela Produtos!');
      });
}

function createTablePromocao(conn){

      // CRIAÇÃO DA TABELA Produtos
      const sql = "CREATE TABLE IF NOT EXISTS Promocao (\n"+
                  "promocao INT NOT NULL AUTO_INCREMENT,\n"+
                  "data_inicio date,\n"+
                  "data_termino date,\n"+
                  "PRIMARY KEY (promocao)\n"+
                  "INDEX(promocao)\n"+
                  ");";

      // VERIFICA SE A QUERY FOI EXECUTADA COM SUCESSO OU NÃO           
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('Criou a tabela Promoção!');
      });
}

function createTableItens_Promo(conn){

      // CRIAÇÃO DA TABELA Produtos
      const sql = "CREATE TABLE IF NOT EXISTS Itens_Promo (\n"+
                  "item INT NOT NULL AUTO_INCREMENT,\n"+
                  "promo INT NOT NULL,\n"+
                  "prod INT NOT NULL,\n"+
                  "desconto FLOAT,\n"+
                  "preco_desc DECIMAL(4,2),\n"+
                  "PRIMARY KEY (item)\n"+
                  "INDEX(item),\n"+
                  "FOREIGN KEY(promo) REFERENCES Promocao(promocao),\n" +
                  "FOREIGN KEY(prod) REFERENCES Produtos(produto)" +
                  ");";

      // VERIFICA SE A QUERY FOI EXECUTADA COM SUCESSO OU NÃO           
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('Criou a tabela Itens_Promo!');
      });
}

function createTableLista_Promo(conn){

      // CRIAÇÃO DA TABELA Produtos
      const sql = "CREATE TABLE IF NOT EXISTS Lista_Promo (\n"+
                  "item INT NOT NULL AUTO_INCREMENT,\n"+
                  "promo INT NOT NULL,\n"+
                  "prod INT NOT NULL,\n"+
                  "desconto FLOAT,\n"+
                  "preco_desc DECIMAL(4,2),\n"+
                  "PRIMARY KEY (item)\n"+
                  "INDEX(item),\n"+
                  "FOREIGN KEY(promo) REFERENCES Promocao(promocao),\n" +
                  "FOREIGN KEY(prod) REFERENCES Produtos(produto)" +
                  ");";
                  
                  "CREATE TABLE IF NOT EXISTS Lista_Promo(" +
        "item INT NOT NULL," +
        "promo INT NOT NULL," +
        "FOREIGN KEY(item) REFERENCES Itens_Promo(item)," +
        "FOREIGN KEY(promo) REFERENCES Promocao(promocao)" +
        ");";
      // VERIFICA SE A QUERY FOI EXECUTADA COM SUCESSO OU NÃO           
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('Criou a tabela Lista_Promo!');
      });
}


// CRIAÇÃO DO MÓDULO PARA SER USADO POR OUTROS ARQUIVOS

module.exports = function () {
  return {
    tabelaCliente: createTableCliente(connection),
    tabelaUsuario: createTableUsuario(connection),
    tabelaPromocao: createTablePromocao(connection),
    tabelaItemPromo: createTableItens_Promo(connection),
    tabelaListaPromo: createTableLista_Promo(connection)
  }
}