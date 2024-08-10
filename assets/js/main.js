
const pokemonList = document.getElementById("pokemonlist")
const loadmorebutton = document.getElementById("loadmorebutton")

const individual = document.getElementById("individual")
const pokedex = document.getElementById("pokedex")

maxRecords = 151
const limit = 12
let offset = 0

function loadmorepokemonitems(offset, limit) {    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += newhtml = pokemons.map((pokemon) => ` 
            <li class="pokemon ${pokemon.type}"  onclick="mostrarPaginaTemporaria()">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol id="pokemonlist" class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt=${pokemon.name}>
                </div>
            </li> 
        `).join('')
        
    })
}

loadmorepokemonitems(offset, limit)

loadmorebutton.addEventListener('click', () =>{
    offset += limit
    const qtRecornexPage = offset + limit
    if (qtRecornexPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadmorepokemonitems(offset, newLimit)
        loadmorebutton.parentElement.removeChild(loadmorebutton)
    }else{
        loadmorepokemonitems(offset, limit)
    }
})

function mostrarPaginaTemporaria() {
    pokedex.style.display = 'none'
    individual.style.display = 'block'
}

function fecharPaginaTemporaria() {
    individual.style.display = 'none';
    pokedex.style.display = 'block';
}