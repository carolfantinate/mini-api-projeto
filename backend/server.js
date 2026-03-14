const http = require('http')
const tarefasRoute = require('./routes/tarefasRoutes')

const server = http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {

        res.writeHead(200)
        res.end()
        return

    }

    tarefasRoute(req, res)
})

server.listen(3000, () => {
    console.log('sevidor rodando em http://localhost:3000')
})