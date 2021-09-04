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