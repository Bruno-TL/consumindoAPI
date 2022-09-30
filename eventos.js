const API_url = 'http://localhost:3000'

function buscarParaEditar(id){
    fetch(API_url +'/compras/'+ id)
        .then( response => response.json())
        .then( dados => {
            input_editar_id.value = dados.id;
            input_editar_item.value = dados.item;
            input_editar_quantidade.value = dados.quantidade;
        });
}

function editar() {
    event.preventDefault();
    const iD = parseInt(input_editar_id.value)

    let dados = {
        item: input_editar_item.value,
        quantidade: input_editar_quantidade.value
    }
    fetch(API_url+ '/compras/'+iD, {
        method: 'PATCH',
        body: JSON.stringify(dados),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then( () => atualizarLista());

        let x = document.querySelector('[data-bs-dismiss="offcanvas"]');

        x.dispatchEvent(new Event('click'));
}

function inserir() {
    event.preventDefault();

    

    let dados = {
        item:input_item.value,
        quantidade: parseInt(input_quantidade.value),
    };

    fetch(API_url + '/compras',{
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
    fetch(API_url + '/compras', {method: 'GET'})
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
                            <button onclick="buscarParaEditar(${cadaItem.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEditar" type="button" class="btn btn-warning">
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

    await fetch(API_url + '/compras/'+ id, {
        method:'DELETE'
    });

    atualizarLista();
}
