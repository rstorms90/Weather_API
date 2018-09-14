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
  let weather = response2.data.current.condition.text
  let fahrenheit = Math.round(response2.data.current.temp_f)
  let celcius = Math.round(response2.data.current.temp_c)
  let degrees
  let moreLess = true
  let windMph = response2.data.current.wind_mph
  let windKm = response2.data.current.wind_kph
  let windDir = response2.data.current.wind_dir
  let precipMm = response2.data.current.precip_mm
  let precipIn = response2.data.current.precip_in
  let humidity = response2.data.current.humidity
  let feelsLikeF = Math.round(response2.data.current.feelslike_f)
  let feelsLikeC = Math.round(response2.data.current.feelslike_c)
  let visMiles = response2.data.current.vis_miles
  let visKm = response2.data.current.vis_km
  let changeList = document.getElementById(`moreData`)
  let america = document.getElementsByClassName(`america`)
  let world = document.getElementsByClassName(`world`)
  let current = response2.data.current.condition.code
  let weatherWords = weather.split(` `)
  // let keywords
  // let imageUrl

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