const fs = require('fs');

// CRIA O MÓDULO PARA EXPORTAR AS FUNÇÕES REFERENTES AO CLIENTE
module.exports = {
    // CHAMA A PÁGINA CLIENTE PASSANDO A REQUISIÇÃO DO SERVIDOR E A RESPOSTA
    addClientePage: (req, res) => {
        res.render('add-cliente.ejs', {
            title: "Adicionar Cliente",
            message: ''
        });
    },
    // EXECUTA A INSERÇÃO DO CLIENTE POR MEIO DA REQUISIÇÃO DO SERVIDOR E A RESPOSTA
    addCliente: (req, res) => {

        let message = '';
        let nome = req.body.nome;
        let apelido = req.body.apelido;
        let cpf = req.body.cpf;
        let celular = req.body.celular;
        let cpfQuery = "SELECT * FROM `clientes` WHERE cpf = '" + cpf + "';";

        // VERIFICA O CPF, SE JÁ HOUVER OUTRO CPF CADASTRADO, BARRE O INFELIZ!! É SILADA BINHO!!
        db.query(cpfQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            // MAS NÃO SEJA DESELEGANTE, AVISE A ELE QUE ELE É UMA SILADA
            // LÓGICA: SE HOUVER ALGUM RESULTADO NA CONSULTA, SIGNIFICA QUE JÁ HÁ ALGUÉM COM ESSE CPF
            // ENTÃO NEM PRECISA CADASTRAR, SÓ MANDA SE FODER MESMO E ACABOU!!
            if (result.length > 0) {
                message = 'Este CPF já está cadastrado';
                res.render('add-cliente.ejs', {
                    message,
                    title: "Adicionar Clientes"
                });
            } else {
                // SE O CANGANDO NÃO FOR UMA SILADA, UM KAGEBUNSHIN, LIBERA O CADASTRO
                let query = "INSERT INTO `clientes` (nome, apelido, cpf, celular) VALUES ('" +
                    nome + "', '" + apelido + "', '" + cpf + "', '" + celular + "');";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
                   
            }
        });
    },
    // CHAMA A PÁGINA EDITAR CLIENTE PASSANDO A REQUISIÇÃO DO SERVIDOR E A RESPOSTA
    editarClientePage: (req, res) => {
        let clienteId = req.params.id;
        let query = "SELECT * FROM `clientes` WHERE cliente = '" + clienteId + "';";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-cliente.ejs', {
                title: "Editar  Cliente",
                cliente: result[0],
                message: ''
            });
        });
    },
    // EXECUTA A EDIÇÃO DO CLIENTE POR MEIO DA REQUISIÇÃO DO SERVIDOR E A RESPOSTA
    editarCliente: (req, res) => {
        let clienteId = req.params.id;
        let nome = req.body.nome;
        let apelido = req.body.apelido;
        let cpf = req.body.cpf;
        let celular = req.body.celular;

        let query = "UPDATE `clientes` SET `nome` = '" + nome + "', `apelido` = '" + apelido + "', `cpf` = '" + cpf + "', `celular` = '" + celular + "' WHERE `clientes`.`cliente` = '" + clienteId + "';";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },

    // EXECUTA A EXCLUSÃO DO CLIENTE POR MEIO DA REQUISIÇÃO DO SERVIDOR E A RESPOSTA
    deleteCliente: (req, res) => {
        let clienteId = req.params.id;
        let deleteClienteQuery = 'DELETE FROM clientes WHERE cliente = "' + clienteId + '";';
        db.query(deleteClienteQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};
