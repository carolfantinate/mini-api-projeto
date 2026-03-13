const tarefas = require('../data/tarefas')

//listar tarefas
function listarTarefas(req, res) {
    res.writeHead(200, { 'Content-Type': "application/json" })
    res.end(JSON.stringify(tarefas))
}

//criar tarefa
function criarTarefa(req, res) {

    let body = ''

    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', () => {

        const novaTarefa = JSON.parse(body)

        novaTarefa.id = tarefas.length + 1

        tarefas.push(novaTarefa)

        res.writeHead(201, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify(novaTarefa))

    })

}

//deletar tarefa
function deletarTarefa(req, res, id) {

    const index = tarefas.findIndex(t => t.id === id)

    if (index !== -1) {

        tarefas.splice(index, 1)

        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify({
            mensagem: 'Tarefa removida'
        }))

    } else {

        res.writeHead(404, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify({
            mensagem: 'Tarefa não encontrada'
        }))

    }

}

//editar tarefa
function editarTarefa(req, res, id) {

    let body = ''

    req.on('data', chunk => {
        body += chunk
    })

    req.on('end', () => {

        const dados = JSON.parse(body)

        const tarefa = tarefas.find(t => t.id === id)

        if (tarefa) {

            tarefa.titulo = dados.titulo

            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify(tarefa))

        } else {

            res.writeHead(404, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify({
                mensagem: 'Tarefa não encontrada'
            }))

        }

    })

}

module.exports = {
    listarTarefas,
    criarTarefa,
    deletarTarefa,
    editarTarefa
}