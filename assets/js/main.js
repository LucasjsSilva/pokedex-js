
function convertPokemonToLi(pokemon){
    return ` 
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol id="pokemonlist" class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt=${pokemon.name}>
                </div>
            </li> 
        `
}

const pokemonList = document.getElementById("pokemonlist")

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += newList = pokemons.map(convertPokemonToLi).join('')
})