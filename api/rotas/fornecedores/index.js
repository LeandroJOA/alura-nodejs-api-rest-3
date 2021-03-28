const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

// Rota para listar todos os fornecedores 
roteador.get('/', async (req, res) => {
    // Espera o metodo listar ser realizado
    const resultados = await TabelaFornecedor.listar()
    // Retorna os resultados como JSON
    res.send(
        JSON.stringify(resultados)
    )
})

// Rota para cadastro de fornecedores
roteador.post('/', async (req, res) => {
    // Capturando os dados enviados
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)

    //Espera o metodo criar ser executado
    await fornecedor.criar()
    
    // Respondendo com os dados adicionados
    res.send(
        JSON.stringify(fornecedor)
    )
})

// Rota para listar um unico fornecedor
roteador.get('/:idFornecedor',async (req, res) => {
    try {
        // Capturando o parametro de id
        const id = req.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })

        // Espera o metodo carregar ser executado
        await fornecedor.carregar()

        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

module.exports = roteador