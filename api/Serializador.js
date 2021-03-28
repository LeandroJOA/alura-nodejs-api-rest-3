const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {

    serializar(dados) {
        // Verifica se o conteudo recebido é do tipo JSON
        if (this.contentType === 'application/json') {
            // Passo pro metodo json os campos já filtrados
            return this.json(
                this.filtrar(dados)
            )
        }

        throw new ValorNaoSuportado(this.contentType)
    }

    // Filtragem do que pode ser retornado a qualquer usuario
    filtrarObjeto (dados) {
        const novoObjeto = {}

        // Preenche um novo objeto apenas com os campos publicos
        this.camposPublicos.forEach((campo) => {
            if (dados.hasOwnProperty(campo)) {
                novoObjeto[campo] = dados[campo]
            }
        })

        return novoObjeto
    }

    filtrar(dados) {
        // Verifica se o que sera filtrado é um array
        if (Array.isArray(dados)) {
            // Mapea o array, criando um novo objeto e o filtrando cada item
            dados = dados.map(item => {
                return this.filtrarObjeto(item)
            })
        } else {
            dados = this.filtrarObjeto(dados)
        }

        return dados
    }

    // Converte os dados recebidos para JSON
    json(dados) {
        return JSON.stringify(dados)
    } 
}

class SerializadorFornecedor extends Serializador {

    // Recebe o tipo de conteudo e os campos extras a serem retornados
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType  
        // Concatena os campos que podem ser retornados com os campos extras (caso não exista, usa uma lista vazia)
        this.camposPublicos = ['id', 'empresa', 'categoria'].concat(camposExtras || [])
    }
}

// Serializa os objetos de error
class SerializadorErro extends Serializador {

    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = ['id', 'mensagem'].concat(camposExtras || [])
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json']
}