const jsontoxml = require('jsontoxml')

const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

class Serializador {

    serializar(dados) {
        // Filtra os dados recebidos, retornando apenas os campos publicos e extras
        dados = this.filtrar(dados)

        // Verifica se o conteudo recebido é do tipo JSON
        if (this.contentType === 'application/json') {
            // Passo pro metodo json os campos já filtrados
            return this.json(dados)
        // Verifica se é do tipo XML    
        } else if (this.contentType === 'application/xml') {
            // Passo pro metodo xml os campos já filtrados
            return this.xml(dados)
        }

        // Caso não seja nenhum das opções acima, lança um error
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

    // Converte os dados recebidos para XML
    xml(dados) {
        // Nomo do campo no singular
        let tag = this.tagSingular

        // Verifica se os dados a serem retornados são um lista
        if (Array.isArray(dados)) {
            // Utiliza a tag no plural
            tag = this.tagPlural
            // Mapea todos os dados da lista, criando um novo objeto com todos os fornecedores separados 
            dados = dados.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }

        return jsontoxml({ [tag]: dados })
    }
}

class SerializadorFornecedor extends Serializador {

    // Recebe o tipo de conteudo e os campos extras a serem retornados
    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType  
        // Concatena os campos que podem ser retornados com os campos extras (caso não exista, usa uma lista vazia)
        this.camposPublicos = ['id', 'empresa', 'categoria'].concat(camposExtras || [])
        this.tagSingular = 'fornecedor'
        this.tagPlural = 'fornecedores'
    }
}

// Serializa os objetos de error
class SerializadorErro extends Serializador {

    constructor(contentType, camposExtras) {
        super()
        this.contentType = contentType
        this.camposPublicos = ['id', 'mensagem'].concat(camposExtras || [])
        this.tagSingular = 'error'
        this.tagPlural = 'errors'
    }
}

module.exports = {
    Serializador: Serializador,
    SerializadorFornecedor: SerializadorFornecedor,
    SerializadorErro: SerializadorErro,
    formatosAceitos: ['application/json', 'application/xml']
}