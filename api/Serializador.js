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

class SerializadorFornecedor extends Serializador{
    constructor(contentType) {
        super()
        this.contentType = contentType  
        // Campos que podem ser retornados
        this.camposPublicos = ['id', 'empresa', 'categoria']
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    formatosAceitos: ['application/json']
}