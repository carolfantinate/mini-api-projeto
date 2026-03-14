const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'lista_tarefas'
})

connection.connect((erro)=>{
    if (erro) {
        console.log('Erro ao conectar ao MySql:', erro)
    } else {
        console.log('Conectado ao MySql')
    }
})

module.exports = connection