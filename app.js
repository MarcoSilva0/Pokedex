//Função para buscar os pokemons
const fetchPokemon = () => {
    //Url da api
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    //Após a refatoração, foi criado uma const que tem um array com todos e usou-se o map para filtrar
    const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
        fetch(getPokemonUrl(index + 1)).then(response => response.json())
    )

    const pokemonPromises = generatePokemonPromises()

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