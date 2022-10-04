function acionarBotaoExcluir() {

    let todosOsChecks = document.querySelectorAll('[data-check="acao"]')

    let quantidade = 0;

    todosOsChecks.forEach( (cadaCheck) => {
        cadaCheck.checked === true && quantidade++;
    })
    if(quantidade > 0) {
        btn_remove_all.classList.remove('d-none');
    }else {
        btn_remove_all.classList.add('d-none');
    }
}

function excluirSelecionados() {
    if(false === confirm('Tem certeza')){
        return;
    }

    let todosOsChecks = document.querySelectorAll('[data-check="acao"]');
    todosOsChecks.forEach( async (cadaCheck) => {
        if(cadaCheck.checked === true) {
            await fetch(API_url + '/compras/' + cadaCheck.value,{
                method: 'DELETE'
            })
        }
    })
    
    atualizarLista();
}

// //Pegando todos os inputs (checkboxes) que estão na tabela
// 

// //percorrendo todos os checkboxes
// todosOsChecks.forEach( (cadaCheck) => {
//     cadaCheck.addEventListener('click', () => {
//         acionarBotaoExcluir()
//     })
// })