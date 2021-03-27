const Sequelize = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
    // Captura os dados do banco descritos no arquivo de configuração "default.json", sem deixa-los visiveis
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),
    {
        host: config.get('mysql.host'),
        dialect: 'mysql'
    }
)

module.exports = instancia