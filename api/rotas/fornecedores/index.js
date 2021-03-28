const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')

// Criando rota para listar todos os fornecedores 
roteador.use('/', async (req, res) => {
    // Espera o metodo listar ser realizado
    const resultados = await TabelaFornecedor.listar()
    // Retorna os resultados como JSON
    res.send(
        JSON.stringify(resultados)
    )
})

module.exports = roteador