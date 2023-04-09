const personCards = document.querySelector('.person_cards');
const filter = document.querySelector('.filter select');
const search = document.querySelector('.search')
const reset = document.querySelector('.btn-reset')

const getData = () => fetch('dbimage/dbHeroes.json')
    .then(response => response.json())
    .then(person => {
        const searchValue = search.value.toLowerCase()
        const filterValue = filter.value
        let result = person.filter(item => item.name.toLowerCase().indexOf(searchValue) !== -1)
        if (filterValue) {
            result = result.filter(item => item.hasOwnProperty('movies') && item.movies.indexOf(filterValue) !== -1)
        }


        heroCards(result)
    })
    .catch(error => console.log(error))

const getMovies = () => fetch('dbimage/dbHeroes.json')
    .then(response => response.json())
    .then(person => createFilter(person))
    .catch(error => console.log(error))


const heroCards = (person) => {
    personCards.innerHTML = ''
    person.forEach((e) => {
        let data = ''
        for (const key in e) {
            if (!(key === 'photo')) {
                if (key === 'movies') {
                    data += `<div><span class="fw700">${key}</span>: ${e[key].join(', ')}</div>`
                } else {
                    data += `<div><span class="fw700">${key}</span>: ${e[key]}</div>`
                }
            }
        }
        const newEl = document.createElement('div')
        newEl.classList.add('person_card')
        newEl.dataset.aos = "fade-up"
        newEl.dataset.aosEasing = "linear"
        newEl.dataset.aosDuration = "1000"
        newEl.innerHTML = `
            <div class="front">
                <div class="base_line">
                    <div class="person_card__name">${e.name}</div>
                </div>

                <div class="photo_hero">
                    <img alt="Ancient One" src="./dbimage/${e.photo}" />
                </div>
            </div>

            <div class="back">
                <div class="content">
                    ${data}
                </div>
            </div>
        `

        personCards.append(newEl)

    })
    AOS.init();
}

const createFilter = (person) => {
    let movies = [];
    person.forEach((e) => {
        if (e.hasOwnProperty('movies')) {
            e.movies.forEach((movie) => {
                if (movies.indexOf(movie) === -1) {
                    movies.push(movie)
                }
            })
        }
    })

    movies.sort()
    movies.forEach((movie) => {
        const newEl = document.createElement('option')
        newEl.innerHTML = movie
        newEl.value = movie
        filter.append(newEl)
    })
}

const resetFn = () => {
    search.value = '';
    filter.value = '';

}

search.addEventListener('input', () => {
    getData()
})

filter.addEventListener('change', () => {
    getData()
})

reset.addEventListener('click', () => {
    resetFn();
    getData();
})


getData();
getMovies()