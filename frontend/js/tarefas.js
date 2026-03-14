import { buscarTarefas, deletarTarefa, editarTarefa } from './api.js'

const lista = document.getElementById('listaTarefas')

//carregar tarefas
export function carregarTarefas() {
    buscarTarefas()
        .then(tarefas => {
            lista.innerHTML = ''
            tarefas.forEach(tarefa => {
                const item = document.createElement('li')

                const checkbox = document.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = tarefa.concluida

                const titulo = document.createElement('span')
                titulo.textContent = tarefa.titulo

                if (tarefa.concluida) {
                    titulo.classList.add('concluida')
                }

                const acoes = document.createElement('div')
                acoes.classList.add('acoes')

                checkbox.addEventListener('change', () => {

                    editarTarefa(tarefa.id, {
                        titulo: tarefa.titulo,
                        concluida: checkbox.checked
                    })
                        .then(() => carregarTarefas())

                })

                //botao excluir
                const btnExcluir = document.createElement('button')
                btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>'
                btnExcluir.classList.add('btn-excluir')

                btnExcluir.addEventListener('click', () => {
                    deletarTarefa(tarefa.id)
                        .then(() => carregarTarefas())
                })

                //botao editar
                const btnEditar = document.createElement('button')
                btnEditar.innerHTML = '<i class="fa-solid fa-pen"></i>'
                btnEditar.classList.add('btn-editar')


                btnEditar.addEventListener('click', () => {
                    const novoTitulo = prompt('Digite o novo título da tarefa:')

                    if (!novoTitulo) return

                    editarTarefa(tarefa.id, {
                        titulo: novoTitulo,
                        concluida: tarefa.concluida
                    })
                        .then(() => carregarTarefas())
                })

                acoes.appendChild(btnEditar)
                acoes.appendChild(btnExcluir)

                item.appendChild(checkbox)
                item.appendChild(titulo)
                item.appendChild(acoes)

                lista.appendChild(item)
            })
        })
}