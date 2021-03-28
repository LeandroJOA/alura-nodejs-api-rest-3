const ModeloTabela = require('../rotas/fornecedores/ModeloTabelaFornecedor')

// Utilizando Promises para criar a tabela fornecedor
ModeloTabela
    .sync()
    // Caso o metodo seja bem sucedido
    .then(() => console.log('Tabela criada com sucesso!'))
    // Caso não
    .catch(console.log)