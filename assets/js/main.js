
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
            <li class="pokemon ${pokemon.type}"  onclick="mostrarPaginaTemporaria(${pokemon.id})">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
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

function mostrarPaginaTemporaria(id) {
    
    pokeApi.getPokemon(id).then((pokemon) =>
        individual.innerHTML = newhtml = `
        <div class="antes-depois">
                <button onclick="mostrarPaginaTemporaria(${pokemon.idPrevious})">
                    #${pokemon.previous}
                </button>                
                <button onclick="fecharPaginaTemporaria()">
                    Pokedex
                </button>                
                <button onclick="mostrarPaginaTemporaria(${pokemon.idNext})">
                    #${pokemon.next}
                </button>
        </div>
        <h1>${pokemon.name} <span class="number">#${pokemon.number}</span></h1>
        <div class="detail-individual">
            <div class="foto-stats">
                <div class="foto-individual ${pokemon.type}">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <div class="div-stats">
                    <span class="titles">
                        Stats
                    </span>
                    <ul class="base-stats">
                        <li>
                            <span>
                                HP
                            </span>
                            <span class="title">
                                ${pokemon.stats[0]} 
                            </span>
                        </li>                              
                        <li>
                            <span>
                                Attack
                            </span>
                            <span class="title">
                                ${pokemon.stats[1]} 
                            </span>
                        </li> 
                        <li>
                            <span>
                                Defense
                            </span>
                            <span class="title">
                                ${pokemon.stats[2]} 
                            </span>
                        </li>
                        <li>
                            <span>
                                Special Attack
                            </span>
                            <span class="title">
                                ${pokemon.stats[3]} 
                            </span>
                        </li> <li>
                            <span>
                                Special Defense
                            </span>
                            <span class="title">
                                ${pokemon.stats[4]} 
                            </span>
                        </li> 
                        <li>
                            <span>
                                Speed
                            </span>
                            <span class="title">
                                ${pokemon.stats[5]} 
                            </span>
                        </li> 
                    </ul>
                </div>                
            </div>
            <div class="div-atributes-types">
                <div class="div-atributes">
                    <span class="titles">
                        About
                    </span>
                    <ol class="atributes">
                        <li>
                            <span class="title">
                                Height
                            </span>
                            <span>
                                ${pokemon.height}m
                            </span>
                        </li>
                        <li> 
                            <span class="title">
                                Weight
                            </span>
                            <span>
                                ${pokemon.weight}kg
                            </span>  
                        </li>
                        <li>
                            <span class="title">
                                Abilities
                            </span>
                            <span>
                                ${pokemon.ability} 
                            </span>                         
                        </li>
                    </ol>    
                </div>
                <div class="div-types">
                    <span class="titles">
                        Type
                    </span>
                    <ol>
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
            </div>
        </div>`
    )
    pokedex.style.display = 'none'
    individual.style.display = 'block'
}

function fecharPaginaTemporaria() {
    individual.style.display = 'none';
    pokedex.style.display = 'block';
}