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

  let feelsLikeF = Math.round(response2.data.current.feelslike_f)
  let feelsLikeC = Math.round(response2.data.current.feelslike_c)
  let fahrenheit = Math.round(response2.data.current.temp_f)
  let celsius = Math.round(response2.data.current.temp_c)
  
  let moreLess = true
  let degrees = true
  // let changeList = document.getElementById(`moreData`)
  let weatherWords = weather.split(` `)


  

  // Use location to determine initial unit type
  if (`United States of America`) {
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






    // 'Click' functions for toggle buttons
    let degType = document.getElementById(`degType`)
    let temp = document.getElementById(`temp`)

    // Toggle ºC & ºF
    degType.addEventListener(`click`, function(e) {
      e.preventDefault()
      if (degType.innerText === `Show ºF`) {
        degType.innerText = `Show ºC`
        temp.innerText = fahrenheit + `º`
      } else {
        degType.innerText = `Show ºF`
        temp.innerText = celsius + `º`
      }
    })

  function changeDegrees() {
    if (degrees === true) {
      //World `OFF`
      //America `ON`
      document.getElementById(`degType`).innerText = `Show ºC`
      document.getElementById(`temp`).innerText = fahrenheit + `º`

    } else {
      //World `ON`
      //America `OFF`
      document.getElementById(`degType`).innerText = `Show ºF`
      document.getElementById(`temp`).innerText = celcius + `º`

    }
  }


    // Toggle More & Less Data
    // moreLess.addEventListener(`click`, function(e) {
    //   e.preventDefault()
    //   changeMoreLess()
    // })

  // function changeMoreLess() {
  //   if (moreLess === true) {
  //     moreLess.innerHTML = `More Data`
  //     changeList.style.opacity = `0`
  //   } else {
  //     moreLess.innerHTML = `Less Data`
  //     changeList.style.opacity = `1`
  //   }
  // }
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

}