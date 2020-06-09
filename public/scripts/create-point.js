

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => {
            return res.json()
                .then(states => {

                    for (const state of states) {
                        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

                    }
                })
        })
}
populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
        .then((res) => {
            return res.json()
                .then(cities => {

                    for (const city of cities) {
                        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

                    }
                    citySelect.disabled = false
                })
        })
}

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta

const ItemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of ItemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const conllectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    // adicionar ou remover uma classe com JS
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = event.target.dataset.id

    // Verificar se existem itens selecionados. 
    // Se sim, pegar os itens selecionados.
    const alreadySelected = selectedItems.findIndex(function (item) {
        const itemFound = item == itemId // Será true or false
        return itemFound
    })
    // Se já estiver selecionado, tirar da seleção.
    if (alreadySelected >= 0) {
        const filterdItems = selectedItems.filter((item) => {
            const itemIsDiffrent = item != itemId
            return itemIsDiffrent
        })
        selectedItems = filterdItems
    } else {
        // Se não estiver selecionado, adicionar a seleção.
        selectedItems.push(itemId)
    }

    // Atualizar o campo escondido com os itens selecionados.
    conllectedItems.value = selectedItems

}


