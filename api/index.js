const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')

const app = express()

app.use(bodyParser.json())

app.use('/api/fornecedores', roteador)

// Verificação de erros
app.use((error, req, res, proximo) => {
    let status = 500

    if (error instanceof NaoEncontrado) {
        status = 404
    } else if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) {
        status = 400
    }
    res.status(status)
    res.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idErro
        })
    )
})

// config.get - Captura a porta da API, a partir do arquivo json de config
app.listen(config.get('api.porta'), () => console.log('A api está funcionando!'))