const db = require('../config/db')

function listarTarefas(callback) {
    const sql = 'SELECT * FROM tarefas'
    db.query(sql, callback)
}

function criarTarefa(titulo, callback) {
    const sql = 'INSERT INTO tarefas (titulo) VALUES (?)'
    db.query(sql, [titulo], callback)
}

function deletarTarefa(id, callback) {
    const sql = 'DELETE FROM tarefas WHERE id = ?'
    db.query(sql, [id], callback)
}

function editarTarefa(id, titulo, concluida, callback) {
    const sql = 'UPDATE tarefas SET titulo = ?, concluida = ? WHERE id = ?'
    db.query(sql, [titulo, concluida, id], callback)
}

module.exports = {
    listarTarefas,
    criarTarefa,
    deletarTarefa,
    editarTarefa
}