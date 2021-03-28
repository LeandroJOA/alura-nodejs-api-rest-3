const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}) {
        this.id = id
        this.empresa = empresa
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    async criar() {
        // Campos que a serem verificados
        const campos = ['empresa', 'email', 'categoria']

        // Verifica se os campos enviados são do tipo String e não estão vazios
        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor !== 'string' || valor.length === 0) {
                throw new Error(`ERROR! O campo '${campo}' é invalido`)
            }
        })

        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    async carregar() {
        const encontrado = await TabelaFornecedor.pegarPorId(this.id)
        this.empresa = encontrado.empresa
        this.email = encontrado.email
        this.categoria = encontrado.categoria
        this.dataCriacao = encontrado.dataCriacao
        this.dataAtualizacao = encontrado.dataAtualizacao
        this.versao = encontrado.versao
    }

    async atualizar() {
        // Veriricando se o fornecedor a ser altera existe
        await TabelaFornecedor.pegarPorId(this.id)

        // Campos que a serem verificados
        const campos = ['empresa', 'email', 'categoria']
        const dados = {}

        // Verifica se os campos enviados são do tipo String e não estão vazios
        campos.forEach((campo) => {
            const valor = this[campo]

            if (typeof valor === 'string' && valor.length > 0) {
                dados[campo] = valor
            }
        })

        // Lnaça um erro caso todos os dados estejam vazio ou são de tipo invalido
        if (Object.keys(dados).length === 0) {
            throw new Error('ERROR! Não foram fornecidos dados para atualizar')
        }

        await TabelaFornecedor.atualizar(this.id, dados)
    }
}

module.exports = Fornecedor