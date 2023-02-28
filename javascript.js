const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
    .then(respuesta => respuesta.json())
    .then(data => cities.push(...data));

function findCities(typing, cities){
    return cities.filter(lugar => {
        const regularExpression = new RegExp(typing, "gi");
        return lugar.city.match(regularExpression) || lugar.state.match(regularExpression)
    })
}

const searchInput = document.querySelector(".search");
const sugerencias = document.querySelector(".suggestions");

function displayMatches(){
    let matchArray = findCities(this.value, cities);
    const html = matchArray.map(lugar => {
        const regularExpression2 = new RegExp(this.value, "gi");
        const cityName = lugar.city.replace(regularExpression2, `<span class="hl">${this.value}</span>`);
        const stateName = lugar.state.replace(regularExpression2, `<span class="hl">${this.value}</span>`);
        return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${lugar.population}</span>
        </li>
        `;
    })
    sugerencias.innerHTML = html;
}
searchInput.addEventListener("keyup", displayMatches)