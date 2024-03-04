console.log("script agregado correctamente")

const OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3a752bfe2cmsh23a95e3673fb426p13cfb4jsn29cf8edb91a8',
		'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com'
	}
}

const fetchInfo = id => {
    return fetch(`https://api-football-beta.p.rapidapi.com/transfers?player=${id}`, OPTIONS)
    .then(res => res.json())
    .catch(err => console.error(err))
}

const $form = document.querySelector("#form")
const $input = document.querySelector("#input")
const $submit = document.querySelector("#submit")
const $results = document.querySelector("#results")
const $contentInfo = document.querySelector("#contentInfo")

//Datos DOM -JSON
const $namePlayer = document.querySelector("#namePlayer")
const $transfer1In = document.querySelector("#transfer1In")
const $transfer1Out = document.querySelector("#transfer1Out")


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
      // $results.innerHTML = JSON.stringify(playerInfo, null, 2)
      $namePlayer.innerHTML = playerInfo.response[0].player.name;
      
      var cantidadTransferencias = playerInfo.response[0].transfers.length
      //pasar a negativo el numero
      cantidadTransferencias = cantidadTransferencias - cantidadTransferencias*2
      console.log("CANTIDAD: " + cantidadTransferencias)

    //aca hay que invertir los fichajes 
        for (let i=0; i<1; i++){
            var team1 = document.createElement("p");
            var team2 = document.createElement("p");
            
            team1.innerHTML = playerInfo.response[0].transfers[i].teams.in.name;
            team2.innerHTML = playerInfo.response[0].transfers[i].teams.out.name;

            $contentInfo.appendChild(team1)
            $contentInfo.appendChild(team2)

            for(let k=1; k<10; k++){
                var team3 = document.createElement("p");
                team3.innerHTML = playerInfo.response[0].transfers[k].teams.out.name;
                $contentInfo.appendChild(team3)
            }

        }
      
      // $transfer1In.innerHTML = playerInfo.response[0].transfers[0].teams.in.name;
      // $transfer1Out.innerHTML = playerInfo.response[0].transfers[0].teams.out.name;



    }
  
  
    $submit.removeAttribute("disabled")
    $submit.removeAttribute("aria-busy")
  })
  

