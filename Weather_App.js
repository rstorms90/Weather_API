document.addEventListener("DOMContentLoaded", (e) => {
  //Grab user coordinates
  axios.get(`https://ipinfo.io`)
    .then(x => getWeather(x))
})

function getWeather(response) {
  let coords = response.data.loc.split(`,`)
  let lat = coords[0]
  let long = coords[1]

  //API for JSON object containing user's local data
  let api = `https://api.apixu.com/v1/current.json?key=e452323a9db841b187b164113180709&q=` + lat + `,` + long + ``

  axios.get(api)
    .then(x => updateUI(x))
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

  let moreLess = true
  let degrees = null

  let feelsLikeF = Math.round(response2.data.current.feelslike_f)
  let feelsLikeC = Math.round(response2.data.current.feelslike_c)
  let fahrenheit = Math.round(response2.data.current.temp_f)
  let celcius = Math.round(response2.data.current.temp_c)
  
  let changeList = document.getElementById(`moreData`)
  let america = document.getElementsByClassName(`america`)
  let world = document.getElementsByClassName(`world`)
  let weatherWords = weather.split(` `)



  // Toggle ºC & ºF
  function changeDegrees() {
    if (degrees === true) {
      degrees === false;
    } else {
      degrees === true;
    }
    if (degrees === true) {
      document.getElementById(`degType`).innerHTML = `Show ºC`
      document.getElementById(`temp`).innerHTML = fahrenheit + `º`
      world.classList.replace(`on`, `off`)
      america.classList.replace(`off`, `on`)
    } else {
      document.getElementById(`degType`).innerHTML = `Show ºF`
      document.getElementById(`temp`).innerHTML = celcius + `º`
      america.classList.replace(`off`, `on`)
      world.classList.replace(`on`, `off`)
    }
  }


                // APPEND TO MORE DATA BUTTON
              //   <p class="world" id="windKm"></p>
              //   <p class="world" id="precipMm"></p>
              //   <p class="world" id="feelsLikeC"></p>
              //   <p class="world" id="visKm"></p>
              //   <p class="america" id="windMph"></p>
              //   <p class="america" id="precipIn"></p>
              //   <p class="america" id="feelsLikeF"></p>
              //   <p class="america" id="visMiles"></p>
              //   <p id="windDir"></p>
              //   <p id="humidity"></p>

  // Toggle More & Less Data
  function changeMoreLess() {
    if (moreLess === true) {
      moreLess === false;
    } else {
      moreLess === true;
    }
    if (moreLess === true) {
      moreLess.innerHTML = `More Data`
      changeList.style.opacity = `0`
    } else {
      moreLess.innerHTML = `Less Data`
      changeList.style.opacity = `1`
    }
  }

  // Use location to determine initial unit type
  if (`america`) {
    degrees === false;
    changeDegrees();
  } else {
    degrees === true;
    changeDegrees();
  }


  // Display user's local temperature & conditions
  location.innerHTML = location
  moreLess.innerHTML = `More Data`
  weather.innerHTML = weather
  windMph.innerHTML = `Wind Speed: ` + windMph + ` Mph`
  windKm.innerHTML = `Wind Speed: ` + windKm + ` Km/h`
  windDir.innerHTML = `Wind Direction: ` + windDir
  precipMm.innerHTML = `Precipitation: ` + precipMm
  precipIn.innerHTML = `Precipitation: ` + precipIn
  humidity.innerHTML = `Humidity: ` + humidity
  feelsLikeF.innerHTML = `Feels Like: ` + feelsLikeF + `º`
  feelsLikeC.innerHTML = `Feels Like: ` + feelsLikeC + `º`
  visMiles.innerHTML = `Visibility: ` + visMiles + ` Mi`
  visKm.innerHTML = `Visibility: ` + visKm + ` Km`

  // 'Click' functions for toggle buttons
  document.getElementById(`degType`)
  degType.addEventListener(`click`, function(e) {
    changeDegrees()
  })
  
  moreLess.addEventListener(`click`, function(e) {
    changeMoreLess()
  })
}