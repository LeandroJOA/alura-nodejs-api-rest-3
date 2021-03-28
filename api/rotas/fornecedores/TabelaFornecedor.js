const Modelo = require('./ModeloTabelaFornecedor')

// Traduzindo o metodo findAll do Sequelize
module.exports = {
    listar() {
        return Modelo.findAll()
    },
    inserir(fornecedor) {
        return Modelo.create(fornecedor)
    }
}