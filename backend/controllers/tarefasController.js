const tarefasModel = require('../models/tarefasModel')

//listar tarefas
function listarTarefas(req, res) {
    const sql = 'SELECT * FROM tarefas'

    tarefasModel.listarTarefas((erro, resultados) => {
        if (erro) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ erro: 'Erro no servidor' }))
            return
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(resultados))
    })
}

//criar tarefa
function criarTarefa(req, res) {

    let body = ''

    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', () => {

        const { titulo } = JSON.parse(body)

        tarefasModel.criarTarefa(titulo, (erro, resultado) => {
            if (erro) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ erro: 'Erro ao criar' }))
                return
            }
            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                id: resultado.insertId,
                titulo,
                concluida: false
            }))
        })
    })

}

//deletar tarefa
function deletarTarefa(req, res, id) {

    tarefasModel.deletarTarefa(id, (erro) => {
        if (erro) {
            res.writeHead(500, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ erro: 'Erro ao deletar' }))
            return
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ mensagem: 'Tarefa removida' }))
    })

}

//editar tarefa
function editarTarefa(req, res, id) {

    let body = ''

    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', () => {

        const { titulo, concluida } = JSON.parse(body)

        tarefasModel.editarTarefa(id, titulo, concluida, (erro) => {

            if (erro) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ erro: 'Erro ao atualizar' }))
                return
            }

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ mensagem: 'Tarefa atualizada' }))

        })

    })

}

module.exports = {
    listarTarefas,
    criarTarefa,
    deletarTarefa,
    editarTarefa
}