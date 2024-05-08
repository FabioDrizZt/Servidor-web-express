const retornoCard = (contenido)=> {
    const {id, poster, titulo, categoria, gen} = contenido
    return `<div class="card">
                <div class="card-picture">
                    <img src="${poster}" alt="${titulo}" title="${titulo}">
                </div>
                <div class="card-bottom">
                    <p class="card-bottom-title">${titulo}</p>
                    <p>${categoria}</p>
                </div>
            </div>`
}

const retornoError = ()=> {
    return `<div class="error">
                <h1 class="red-text">La función está demorada</h1>
                <p>Estamos haciendo algunos ajustes 🍿</p>
                <p>Intenta nuevamente en algunos instantes... 🎞</p>
            </div>`
}

const retornoGenero = (gen)=> {
return `<article class="genero">
            <h2>${gen}</h2>
        </article>`
}