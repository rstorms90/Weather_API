document.addEventListener("DOMContentLoaded", (e) => {

  //Grab user coordinates
  axios.get(`https://ipinfo.io`)
    .then(e => getCurrentWeather(e))
})


function getCurrentWeather(response) {
  let coords = response.data.loc.split(`,`)
  let lat = coords[0]
  let long = coords[1]

  //API for JSON object containing user's current weather data
  let api = `https://api.apixu.com/v1/forecast.json?key=e452323a9db841b187b164113180709&q=` + lat + `,` + long + `&days=7`

  axios.get(api)
    .then(e => updateUI(e))
}


function updateUI(response2) {
  let location = response2.data.location.name
  let state = response2.data.location.region
  let current = response2.data.current.condition.code
  let weatherCondition = response2.data.current.condition.text

  let {
    visMiles,
    visKm,
    windMph,
    windKm,
    windDir,
    precipMm,
    precipIn,
    humidity
  } = response2.data.current

  let feelsLikeF = Math.round(response2.data.current.feelslike_f)
  let feelsLikeC = Math.round(response2.data.current.feelslike_c)


  // Declare temp variables
  let degTypeF = document.getElementById(`degTypeF`)
  let degTypeC = document.getElementById(`degTypeC`)
  let temp = document.getElementById(`temp`)
  let fahrenheit = Math.round(response2.data.current.temp_f)
  let celsius = Math.round(response2.data.current.temp_c)
  degTypeF.innerText = `ºF`
  degTypeC.innerText = `ºC`



  //Set default to fahrenheit, gray out celsius
    temp.innerText = fahrenheit + `º`
    degTypeF.classList.add(`on`)
    degTypeC.classList.add(`off`)
  

  // Toggle ºC & ºF (button)
  degTypeF.addEventListener(`click`, function(e) {
    temp.innerText = fahrenheit + `º`
    degTypeF.classList.replace(`off`, `on`)
    degTypeC.classList.replace(`on`, `off`)
  })

  degTypeC.addEventListener(`click`, function(e) {
    temp.innerText = celsius + `º`
    degTypeF.classList.replace(`on`, `off`)
    degTypeC.classList.replace(`off`, `on`)
  })

}