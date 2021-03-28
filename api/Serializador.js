const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {
    serializar(dados) {
        // Verifica se o conteudo recebido é do tipo JSON
        if (this.contentType === 'application/json') {
            return this.json(dados)
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    // Converte os dados recebidos para JSON
    json(dados) {
        return JSON.stringify(dados)
    } 
}

class SerializadorFornecedor extends Serializador{
    constructor(contentType) {
        super()
        this.contentType = contentType  
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatosAceitos: ['application/json']
}