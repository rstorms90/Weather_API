document.addEventListener("DOMContentLoaded", (e) => {

  //Grab user coordinates
  axios.get(`https://ipinfo.io`)
    .then(e => getCurrentWeather(e))
})

function getCurrentWeather(response) {
  let coords = response.data.loc.split(`,`)
  let lat = coords[0]
  let long = coords[1]

  //API for JSON object containing user's current data
  let api = `https://api.apixu.com/v1/current.json?key=e452323a9db841b187b164113180709&q=` + lat + `,` + long + ``

  axios.get(api)
    .then(e => updateUI(e))
}

function getForecastWeather(response3) {

  //API for JSON object containing user's forecast data
  let api = `https://api.apixu.com/v1/forecast.json?key=e452323a9db841b187b164113180709&q=` + lat + `,` + long + ``

  axios.get(api)
    .then(e => forecastUI(e))
}

function forecastUI(response3) {

}


function updateUI(response2) {
  let location = response2.data.location.name
  let state = response2.data.location.region
  let current = response2.data.current.condition.code
  let weather = response2.data.current.condition.text

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
  let degType = document.getElementById(`degType`)
  let temp = document.getElementById(`temp`)
  let fahrenheit = Math.round(response2.data.current.temp_f)
  let celsius = Math.round(response2.data.current.temp_c)
  degType.innerText = `Show ºC`
  temp.innerText = fahrenheit + `ºF`
  
  // Toggle ºC & ºF (button)
  degType.addEventListener(`click`, function(e) {
    if (degType.innerText === `Show ºF`) {
      degType.innerText = `Show ºC`
      temp.innerText = fahrenheit + `ºF`
    } else {
      degType.innerText = `Show ºF`
      temp.innerText = celsius + `ºC`
    }
  })


  // Declare More/Less Data variable
  let changeList = document.getElementById(`moreLess`)
  moreLess.innerText = `More Data`

  // Toggle More/Less Data (button)
  moreLess.addEventListener(`click`, function(e) {
    if (moreLess.innerText === `More Data`) {
      moreLess.innerText = `Less Data`
    } else {
      moreLess.innerText = `More Data`
    }
  }) 

  






  
  
  // Display user's local temperature & conditions
  // location.innerHTML = location
  // moreLess.innerHTML = `More Data`
  // weather.innerHTML = weather
  // windMph.innerHTML = `Wind Speed: ` + windMph + ` Mph`
  // windKm.innerHTML = `Wind Speed: ` + windKm + ` Km/h`
  // windDir.innerHTML = `Wind Direction: ` + windDir
  // precipMm.innerHTML = `Precipitation: ` + precipMm
  // precipIn.innerHTML = `Precipitation: ` + precipIn
  // humidity.innerHTML = `Humidity: ` + humidity
  // feelsLikeF.innerHTML = `Feels Like: ` + feelsLikeF + `º`
  // feelsLikeC.innerHTML = `Feels Like: ` + feelsLikeC + `º`
  // visMiles.innerHTML = `Visibility: ` + visMiles + ` Mi`
  // visKm.innerHTML = `Visibility: ` + visKm + ` Km`

}