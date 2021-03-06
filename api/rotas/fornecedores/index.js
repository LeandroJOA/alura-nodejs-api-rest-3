const roteador = require('express').Router()

const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor

// Rota para listar todos os fornecedores 
roteador.get('/', async (req, res) => {
    // Espera o metodo listar ser realizado
    const resultados = await TabelaFornecedor.listar()

    // Status OK
    res.status(200)

    // Instanciando nosso serializador e enviando o tipo de conteudo usado
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )

    // Retorna os resultados como JSON
    res.send(
        serializador.serializar(resultados)
    )
})

// Rota para cadastro de fornecedores
roteador.post('/', async (req, res, proximo) => {
    try {
        // Capturando os dados enviados
    const dadosRecebidos = req.body

    const fornecedor = new Fornecedor(dadosRecebidos)

    //Espera o metodo criar ser executado
    await fornecedor.criar()
    
    // Status Created
    res.status(201)

    // Instanciando nosso serializador e enviando o tipo de conteudo usado
    const serializador = new SerializadorFornecedor(
        res.getHeader('Content-Type')
    )

    // Respondendo com os dados adicionados
    res.send(
        serializador.serializar(fornecedor)
    )
    } catch (error) {
        proximo(error)
    }
})

// Rota para listar um unico fornecedor
roteador.get('/:idFornecedor',async (req, res, proximo) => {
    try {
        // Capturando o parametro de id
        const id = req.params.idFornecedor

        const fornecedor = new Fornecedor({ id: id })

        // Espera o metodo carregar ser executado
        await fornecedor.carregar()

        // Status OK
        res.status(200)

        // Instanciando nosso serializador e enviando o tipo de conteudo usado e indicando quais campos extras devem ser retornados
        const serializador = new SerializadorFornecedor(
            res.getHeader('Content-Type'),
            ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        res.send(
            serializador.serializar(fornecedor)
        )
    } catch (error) {
        proximo(error)
    }
})

// Rota para alterar um fornecedor
roteador.put('/:idFornecedor', async (req, res, proximo) => {
    try {
        // Capturando o id e os dados recebidos
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        // Mesclando os dados recebidos com o id em um s?? objeto
        const dados = Object.assign({}, dadosRecebidos, { id: id })

        const fornecedor = new Fornecedor(dados)

        // Espera pelo metodo atualizar ser executado
        await fornecedor.atualizar()

        // Status No Content
        res.status(204)
        // Encerra a requisi????o
        res.end()
    } catch (error) {
        proximo(error)
    }
})

// Rota para deletar um fornecedor
roteador.delete('/:idFornecedor', async (req, res, proximo) => {
    try {
        // Capturando o id 
        const id = req.params.idFornecedor

        // Esperando pelo metodo remover ser executado
        await TabelaFornecedor.remover(id)

        // Status No Content
        res.status(204)
        // Encerrando requisi????o
        res.end()
    } catch (error) {
        proximo(error)
    }
})

module.exports = roteador