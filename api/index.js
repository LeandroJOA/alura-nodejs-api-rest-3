const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro

const app = express()

app.use(bodyParser.json())

// Verifica se o conteudo recebido é valido 
app.use((req, res, proximo) => {
    // Identifica o formato de dados recebido
    let formatoRequisitado = req.header('Accept')

    // Se o formato for do tipo padrão "*/*" (get), transforma este em JSON
    if (formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json'
    }

    // Verifica se o formato recebido não está entre os aceitos
    if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
        // Status Not Acceptable
        res.status(406)
        // Finaliza a requisição
        res.end()
        // Termina a execução do codigo
        return
    }

    // Seta o formato de resposta para o mesmo que o recebido
    res.setHeader('Content-Type', formatoRequisitado)
    // Avança para o proximo middleware
    proximo()
})

app.use('/api/fornecedores', roteador)

// Verificação de erros
app.use((error, req, res, proximo) => {
    let status = 500

    if (error instanceof NaoEncontrado) {
        status = 404
    } else if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) {
        status = 400
    } else if (error instanceof ValorNaoSuportado) {
        status = 406
    }

    // Serializando a mensagem de erro
    const serializadorErro = new SerializadorErro(
        res.getHeader('Content-Type')
    )

    res.status(status)
    res.send(
        serializadorErro.serializar({
            mensagem: error.message,
            id: error.idErro
        })
    )
})

// config.get - Captura a porta da API, a partir do arquivo json de config
app.listen(config.get('api.porta'), () => console.log('A api está funcionando!'))