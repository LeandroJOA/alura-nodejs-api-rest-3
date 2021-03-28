const Modelo = require('./ModeloTabelaFornecedor')

// Traduzindo o metodo findAll do Sequelize
module.exports = {
    listar () {
        return Modelo.findAll()
    }
}