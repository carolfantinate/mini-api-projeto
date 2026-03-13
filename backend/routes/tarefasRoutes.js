const {
    listarTarefas,
    criarTarefa,
    deletarTarefa,
    editarTarefa
} = require('../controllers/tarefasController')

function tarefasRoutes(req, res) {
    if (req.url === '/tarefas' && req.method === 'GET') {
        listarTarefas(req, res)
    }

    else if (req.url === '/tarefas' && req.method === 'POST') {
        criarTarefa(req, res)
    }

    else if (req.url.startsWith('/tarefas/') && req.method === 'DELETE') {
        const id = parseInt(req.url.split('/')[2])
        deletarTarefa(req, res, id)
    }

    else if (req.url.startsWith('/tarefas/') && req.method === 'PUT') {
        const id = parseInt(req.url.split('/')[2])
        editarTarefa(req, res, id)
    }

    else {
        res.writeHead(404, {'Content-Type':'application/json'})

        res.end(JSON.stringify({
            mensagem: 'Rota não encontrada'
        }))
    }
}

module.exports = tarefasRoutes