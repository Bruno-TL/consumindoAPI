function inserir() {
    event.preventDefault();

    

    let dados = {
        item:input_item.value,
        quantidade: parseInt(input_quantidade.value),
    };

    fetch('http://localhost:3000/compras',{
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then( resposta => resposta.json())
        .then( () => {
            atualizarLista()
        });

    form_add.reset();
}

function atualizarLista() {
    tabela_compras.innerHTML = '';
    fetch('http://localhost:3000/compras', {method: 'GET'})
        .then( function (resposta) {
            return resposta.json();
        })
        .then(function(lista) {
            lista.map( function(cadaItem) {
                tabela_compras.innerHTML += `
                    <tr>
                        <td>${cadaItem.id}</td>
                        <td>${cadaItem.item}</td>
                        <td>${cadaItem.quantidade}</td>
                        <td>
                            <button onclick="editar(${cadaItem.id})" type="button" class="btn btn-warning">
                                Editar
                            </button>
                            <button onclick="excluir(${cadaItem.id})" class="btn btn-info">
                                Excluir
                            </button>
                        </td>
                    </tr>
                `
            });
        })
}
atualizarLista();

async function excluir (id) {
    let resposta = confirm('Vc tem certeza')

    if(resposta !== true) {
        return
    }

    await fetch('http://localhost:3000/compras/'+ id, {
        method:'DELETE'
    });

    atualizarLista();
}


function editar(id){
    event.preventDefault();

    let dados = {
        item:prompt('Diga o nome'),
        quantidade: parseInt(prompt('Diga a quantidade'))
    }

    fetch("http://localhost:3000/compras/" + id,{
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then( resposta => resposta.json())
        .then( () => atualizarLista() )
}