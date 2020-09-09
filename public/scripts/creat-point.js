function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //res => res.json()
    .then ( states => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) //res => res.json()
    .then ( cities => {

        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
// pegar todos os lis
const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const iten of itensToCollect){
    iten.addEventListener("click", handleSelectedIten)
}

const collectedItens = document.querySelector("input[name=itens]")


let selectedItens = []

function handleSelectedIten(event) {
    const itenLi = event.target
// adicionar ou remover uma classe
    itenLi.classList.toggle("selected")

    const itenId = itenLi.dataset.id

    //verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItens.findIndex( iten => {
        const itenFound = iten == itenId // isso será true ou false
        return itenFound
    })

    // se já estiver selecionado, tirar da seleção
    if( alreadySelected >= 0){
        //tirar da seleção
        const filteredItens = selectedItens.filter( iten => {
            const itenIsDifferent = iten != itenId //false
            return itenIsDifferent
        })

        selectedItens = filteredItens
    }else{
        // se não estiver selecionado, adicionar à seleção
        selectedItens.push(itenId)
    }

    // atualizar o campo escondido com os itens selecionados
    collectedItens.value = selectedItens
}