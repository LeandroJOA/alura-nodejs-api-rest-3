const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/fornecedores')

app.use(bodyParser.json())

app.use('/api/fornecedores', roteador)

// config.get - Captura a porta da API, a partir do arquivo json de config
app.listen(config.get('api.porta'), () => console.log('A api está funcionando!'))