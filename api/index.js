const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')

const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')

const app = express()

app.use(bodyParser.json())

app.use('/api/fornecedores', roteador)

// Verificação de erros
app.use((error, req, res, proximo) => {
    if (error instanceof NaoEncontrado) {
        res.status(404)
    } else {
        res.status(400)
    }
    res.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idErro
        })
    )
})

// config.get - Captura a porta da API, a partir do arquivo json de config
app.listen(config.get('api.porta'), () => console.log('A api está funcionando!'))