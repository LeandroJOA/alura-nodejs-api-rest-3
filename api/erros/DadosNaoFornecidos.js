class DadosNaoFornecidos extends Error {
    constructor() {
        super('ERROR! Não foram fornecidos dados para atualizar')
        this.name = 'DadosNaoFornecidos'
        this.idErro = 2
    }
}

module.exports = DadosNaoFornecidos