const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
    serializar(dados) {
        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    json(dados) {
        return JSON.stringify(dados)
    } 
}