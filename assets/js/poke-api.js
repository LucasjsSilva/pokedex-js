
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon
    pokemon.id = pokeDetail.id
    pokemon.number = pokeDetail.id.toString().padStart(3, '0')
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default

    pokemon.height = (pokeDetail.height * 0.1).toFixed(1)
    pokemon.weight = (pokeDetail.weight * 0.1).toFixed(1)

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.ability = ability

    const stats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    pokemon.stats = stats
    if (pokeDetail.id === 1){
        pokemon.previous = 151;
        pokemon.idPrevious = 151
    }
    else{
        pokemon.previous = ((pokeDetail.id)-1).toString().padStart(3, '0')
        pokemon.idPrevious = (pokeDetail.id)-1
    }

    if (pokeDetail.id === 151){
        pokemon.next = (1).toString().padStart(3, '0');
        pokemon.idNext = 1
    }
    else{
        pokemon.next = (pokeDetail.id+1).toString().padStart(3, '0')
        pokemon.idNext = pokeDetail.id+1
    }

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => { 
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)   
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetail) => pokemonsDetail)
}

pokeApi.getPokemon = (id) => { 
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => convertPokeApiDetailToPokemon(pokemon))
}