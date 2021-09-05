const URL_API = 'https://pokeapi.co/api/v2';
const headers = {'Content-Type': 'application/json'};

export async function getAll() {
    const url = `${URL_API}/pokemon`;
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    .then(_ => _.ok ? _.json() : null)

    return response;
}

export async function getData(url) {
    const response = await fetch(url)
    .then(_ => _.ok ? _.json() : null)

    return response;
}

export function savePokemon(data) {
    const ownedPokemon = JSON.parse(localStorage.getItem('ownedPokemon'));
    if (ownedPokemon) {
        ownedPokemon.push(data);
        localStorage.setItem('ownedPokemon', JSON.stringify(ownedPokemon));
    } else {
        localStorage.setItem('ownedPokemon', JSON.stringify([data]))
    }
}

export function getOwnedPokemon() {
    return JSON.parse(localStorage.getItem('ownedPokemon'));
}

export function deleteOwnedPokemon(nickname) {
    const ownedPokemon = JSON.parse(localStorage.getItem('ownedPokemon'));
    if (ownedPokemon) {
        const idx = ownedPokemon.findIndex(data => data.nickname === nickname);
        ownedPokemon.splice(idx, 1);
        localStorage.setItem('ownedPokemon', JSON.stringify(ownedPokemon));
    }
}