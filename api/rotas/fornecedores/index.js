const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

// Rota para listar todos os fornecedores 
roteador.get('/', async (req, res) => {
    // Espera o metodo listar ser realizado
    const resultados = await TabelaFornecedor.listar()

    res.status(200)
    // Retorna os resultados como JSON
    res.send(
        JSON.stringify(resultados)
    )
})

// Rota para cadastro de fornecedores
roteador.post('/', async (req, res) => {
    try {
        // Capturando os dados enviados
    const dadosRecebidos = req.body

    const fornecedor = new Fornecedor(dadosRecebidos)

    //Espera o metodo criar ser executado
    await fornecedor.criar()
    
    res.status(201)
    // Respondendo com os dados adicionados
    res.send(
        JSON.stringify(fornecedor)
    )
    } catch (error) {
        res.status(400)
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

// Rota para listar um unico fornecedor
roteador.get('/:idFornecedor',async (req, res) => {
    try {
        // Capturando o parametro de id
        const id = req.params.idFornecedor

        const fornecedor = new Fornecedor({ id: id })

        // Espera o metodo carregar ser executado
        await fornecedor.carregar()

        res.status(200)
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        res.status(404)
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

// Rota para alterar um fornecedor
roteador.put('/:idFornecedor', async (req, res) => {
    try {
        // Capturando o id e os dados recebidos
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        // Mesclando os dados recebidos com o id em um só objeto
        const dados = Object.assign({}, dadosRecebidos, { id: id })

        const fornecedor = new Fornecedor(dados)

        // Espera pelo metodo atualizar ser executado
        await fornecedor.atualizar()

        res.status(204)
        // Encerra a requisição
        res.end()
    } catch (error) {
        res.status(400)
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

// Rota para deletar um fornecedor
roteador.delete('/:idFornecedor', async (req, res) => {
    try {
        // Capturando o id 
        const id = req.params.idFornecedor

        // Esperando pelo metodo remover ser executado
        await TabelaFornecedor.remover(id)

        res.status(204)
        // Encerrando requisição
        res.end()
    } catch (error) {
        res.status(404)
        res.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

module.exports = roteador