console.log("script agregado correctamente")

const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3a752bfe2cmsh23a95e3673fb426p13cfb4jsn29cf8edb91a8',
		'X-RapidAPI-Host': 'football-web-pages1.p.rapidapi.com'
	}
}

const fetchInfo = id => {
    return fetch(`https://football-web-pages1.p.rapidapi.com/team.json?team=${id}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.error(err))
}

const $form = document.querySelector("#form")
const $input = document.querySelector("#input")
const $submit = document.querySelector("#submit")
const $results = document.querySelector("#results")
const $contentInfo = document.querySelector("#contentInfo")

//Datos DOM a JSON
const $name = document.querySelector("#name")
const $stadium = document.querySelector("#stadium")
const $capacity = document.querySelector("#capacity")
const $webSite = document.querySelector("#webSite")
const $address = document.querySelector("#address")


$form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const value = $input.value // Accede al valor del input
    console.log("Valor de la IP ingresada:", value) // Verificar el valor capturado
    if (!value) return
  
    $submit.setAttribute("disabled", "")
    $submit.setAttribute("aria-busy", "true")
  
    const playerInfo = await fetchInfo(value)
    console.log("Respuesta de la API:", playerInfo) // Verificar la respuesta de la API
  
    if (playerInfo) {
      //$results.innerHTML = JSON.stringify(playerInfo, null, 2)

      $name.innerHTML = "Nombre: " + playerInfo.team.name
      $stadium.innerHTML = "Estadio: " + playerInfo.team.ground
      $capacity.innerHTML = "Capacidad: " + playerInfo.team.capacity
      $address.innerHTML = "Direccion: " + playerInfo.team.address
      $webSite.innerHTML = "Web: " + playerInfo.team.website
      
    }
  
  
    $submit.removeAttribute("disabled")
    $submit.removeAttribute("aria-busy")
  })
  

