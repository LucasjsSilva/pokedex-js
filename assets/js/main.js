
function convertPokemonToLi(pokemon){
    return ` 
            <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol id="pokemonlist" class="types">
                        <li class="type">
                            Grass
                        </li>
                        <li class="type">
                            Poison
                        </li>
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt=${pokemon.name}>
                </div>
            </li> 
        `
}

const pokemonList = document.getElementById("pokemonlist")

pokeApi.getPokemons().then((pokemons) => {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        pokemonList.innerHTML += convertPokemonToLi(pokemon)         
    }
})