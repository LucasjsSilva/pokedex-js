
const offset = 0;
const limit = 20;
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
fetch(url)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
    .finally(() => console.log("Terminou"))