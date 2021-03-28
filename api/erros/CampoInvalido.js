class CampoInvalido extends Error {
    
    constructor(campo) {
        const mensagem = `ERROR! O campo '${campo}' é invalido`
        super(mensagem)
        this.name = 'CampoInvalido'
        this.idErro = 1
    }
}

module.exports = CampoInvalido