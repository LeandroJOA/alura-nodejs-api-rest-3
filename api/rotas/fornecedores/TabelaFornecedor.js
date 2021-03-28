const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

// Traduzindo o metodo findAll do Sequelize
module.exports = {
    listar() {
        // Lista todos os fornecedores
        return Modelo.findAll({ raw: true })
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
            throw new NaoEncontrado()
        }

        return encontrado
    },
    atualizar(id, dadosParaAtualizar) {
        // Atualiza o fornecedor de id escolhido com os dados recebidos 
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: { id: id }
            }
        )
    },
    async remover(id) {
        // Deleta o fornecedor com mesmo id
        const deletado = await Modelo.destroy({
            where: { id: id }
        })

        // Verifica se o fornecedor foi deletado
        if (!deletado) {
            throw new Error('ERROR! Fornecedor não encontrado')
        }

        return deletado
    }
}