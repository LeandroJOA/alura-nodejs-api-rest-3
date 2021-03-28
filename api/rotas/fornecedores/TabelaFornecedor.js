const Modelo = require('./ModeloTabelaFornecedor')

// Traduzindo o metodo findAll do Sequelize
module.exports = {
    listar() {
        // Lista todos os fornecedores
        return Modelo.findAll()
    },
    inserir(fornecedor) {
        // Cria um novo fornecedor
        return Modelo.create(fornecedor)
    },
    async pegarPorId(id) {
        // Retorna um fornecedor em especifico
        const encontrado = await Modelo.findOne({
            where: { id: id }
        })

        // Caso não tenha sido encontrado
        if (!encontrado) {
            throw new Error('ERROR! Fornecedor não encontrado')
        }

        return encontrado
    }
}