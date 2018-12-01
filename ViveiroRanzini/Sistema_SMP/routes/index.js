module.exports = {
    logarUsuario: (req, res) => {
        var user = req.body.usuario;
        var senha = req.body.senha;
        let query = "SELECT * FROM `clientes` ORDER BY cliente ASC"; // QUERY PARA PEGAR TODOS OS CLIENTES
        let login = "SELECT * FROM `usuarios` WHERE usuario ='" + user + "' AND senha='" + senha + "';"; // QUERY PARA CHECAR O CANDANGO QUE TENTAR LOGAR

        // EXECUTA A QUERY PARA VERIFICAR O USUÁRIO E LOGÁ-LO
        db.query(login, (err, result) => {
            // SE DER RUIM, REDIRECIONA ELE PARA A TELA INICIAL (login.ejs)
            if (err) {
                sessao = false;
                res.redirect('/');
            }else{
            //SE DER BOM (NÃO TIVER ERRO NA SQL), VERIFICA SE ENCONTROU O RESULTADO QUE QUEREMOS (NO CASO, 1, VULGO, O NOSSO USUÁRIO)
                if (result == 0) {
                    // CASO O RESULTADO VENHA COM 0, QUER DIZER QUE NÃO HÁ USUÁRIO NO BANCO COM O USUARIO E SENHA INFORMADO
                    // OU SEJA, TENTA DE NOVO SUA PIRANHA VAGABUNDA, MENTE PRA MIM NÃO!!
                    sessao = false;
                    res.redirect('/');
                }else{
                    // SE O RESULTADO FOR 1, ENTÃO O INDIVÍDUO ESTÁ CADASTRADO
                    // LIBERA O ACESSO PRA ELE, MAS ANTES, EXECUTA A QUERY QUE PROCURA OS CLIENTES CADASTRADOS
                    // E PASSA ISSO PRA PRÓXIMA TELA
                    // MUITA ATENÇÃO AQUI!! 
                    // A LÓGICA QUE FOI USADA AQUI, SERÁ REPETIDA EM OUTRAS PARTES, FAREMOS UMA QUERY NO BANCO
                    // E PASSAREMOS O RESULTADO DELA ADIANTE PARA A PRÓXIMA VIEW ONDE IREMOS UTILIZAR OS VALORES
                    db.query(query, (err, resultado) => {
                        sessao = true;
                        res.render('index.ejs', {
                            title: "Bem vindo, Marcelo!",
                            cliente: resultado
                        });
                    });
                } 
            }
        });
    },
};