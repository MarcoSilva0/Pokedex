//Função para buscar os pokemons
const fetchPokemon = () => {
    //url api e deixo ela dinamica por do uso de
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonPromises = []

    //loop para pegar todos os pokemons
    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            //reduzo o array para uma string
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                //aqui eu pego os tipos filtro para pegar só o name
                const type = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                <li class="card ${type[0]}">
                    <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class="card-subtitle">${type.join(' | ')}</p>
                </li>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemons
        })

}

fetchPokemon()