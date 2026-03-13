import { buscarTarefas, deletarTarefa, editarTarefa } from './api.js'

const lista = document.getElementById('listaTarefas')

//carregar tarefas
export function carregarTarefas() {
    buscarTarefas()
        .then(tarefas => {
            lista.innerHTML = ''
            tarefas.forEach(tarefa => {
                const item = document.createElement('li')
                item.textContent = tarefa.titulo + ' '

                //botao excluir
                const btnExcluir = document.createElement('button')
                btnExcluir.textContent = 'Excluir'

                btnExcluir.addEventListener('click', () => {
                    deletarTarefa(tarefa.id)
                        .then(() => carregarTarefas())
                })

                //botao editar
                const btnEditar = document.createElement('button')
                btnEditar.textContent = 'Editar'

                btnEditar.addEventListener('click', () => {
                    const novoTitulo = prompt('Digite o novo título da tarefa:')

                    if (!novoTitulo) return

                    editarTarefa(tarefa.id, { titulo: novoTitulo })
                        .then(() => carregarTarefas())
                })

                item.appendChild(btnExcluir)
                item.appendChild(btnEditar)
                lista.appendChild(item)
            })
        })
}