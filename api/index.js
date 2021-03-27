const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())

// config.get - Captura a porta da API, a partir do arquivo json de config
app.listen(config.get('api.porta'), () => console.log('A api está funcionando!'))