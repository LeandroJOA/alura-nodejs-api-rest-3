class NaoEncontrado extends Error {
    
    constructor() {
        super('ERROR! Fornecedor não foi encontrado')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}

module.exports = NaoEncontrado