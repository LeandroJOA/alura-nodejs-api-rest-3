const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

// Criando rota para listar todos os fornecedores 
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
    const dadosRecebidos = req.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    
    res.send(
        JSON.stringify(fornecedor)
    )
})

module.exports = roteador