const API_URL = 'http://localhost:3000/tarefas'

export function buscarTarefas() {
    return fetch(API_URL)
        .then(res => res.json())
}

// criar tarefa
export function criarTarefa(tarefa) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(tarefa)
    })
        .then(res => res.json())
}

//deletar tarefa
export function deletarTarefa(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
}

//editar tarefa
export function editarTarefa(id, dados) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
}