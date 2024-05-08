const container = document.querySelector(".container")
let agrupado
generos.sort()
const getContenido = async (URL)=> {
    armoHTML = ""
    try {
        const response = await fetch(URL)
        const data = await response.json()
            contenido = await data
            if (contenido.length > 0) {
                //debugger
                generos.forEach(gen => {
                    resultado = contenido.filter(cont => cont.gen === gen)
                    if (resultado.length > 0) {
                        armoHTML += retornoGenero(gen)
                        resultado.forEach(contenidoFiltrado => armoHTML += retornoCard(contenidoFiltrado))
                    }
                })
            }
    } catch (error) {
        armoHTML = retornoError()
    } finally {
        container.innerHTML = armoHTML
    }    
}

setTimeout(() => {
    getContenido(URL)
}, 2000)