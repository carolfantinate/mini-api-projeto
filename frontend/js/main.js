import { carregarTarefas } from "./tarefas.js";
import { criarTarefa } from "./api.js";

const form = document.getElementById('formTarefa')

//carregar tarefas no inicio
carregarTarefas()

//ao clicar no submit
form.addEventListener('submit', function (event) {
    event.preventDefault()

    const titulo = document.getElementById('titulo').value
    const tarefa = {
        titulo: titulo
    }

    criarTarefa(tarefa)
        .then(() => {
            carregarTarefas()
            document.getElementById('titulo').value = ''
        })
}) 