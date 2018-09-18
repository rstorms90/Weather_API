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
  let curLocation = response2.data.location.name
  let country = response2.data.location.country
  let weatherCondition = response2.data.current.condition.text
  let windMph = response2.data.current.wind_mph
  let windKm = response2.data.current.wind_kph
  let windDir = response2.data.current.wind_dir
  let humidity = response2.data.current.humidity

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

  //Append current location
  let location = document.getElementById(`location`)
  if (country === `United States of America`) {
    country = `US`
    //Set default to fahrenheit, gray out celsius
    temp.innerText = fahrenheit + `º`
    degTypeF.classList.add(`on`)
    degTypeC.classList.add(`off`)
  } else {
    temp.innerText = celsius + `º`
    degTypeF.classList.add(`off`)
    degTypeC.classList.add(`on`)
  }
  location.innerText = curLocation + `, ` + country

  

  //Change dates to corresponding days
  let daysOfWeek = [`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`]

  //Append 6 day forecast weather
  let forecastRow = document.getElementById(`forecast`)
  let forecastCol = document.getElementById(`col`)
  let forecast = response2.data.forecast.forecastday.slice(1)
  let highRow = document.getElementById(`highRow`)
  let lowRow = document.getElementById(`lowRow`)


  //Loop through forecast days and set to bottom
  for (let i = 0; i < forecast.length; i++) {
    let date = forecast[i].date
    let day = document.createElement(`div`)
    day.setAttribute(`class`, `col-md-2`)
    forecastRow.appendChild(day)
    let dayInfo = new Date(date)
    let dayName = dayInfo.getDay()
    day.innerText = daysOfWeek[dayName]

    //Set highs and lows for each forecast
    let maxF = Math.round(forecast[i].day.maxtemp_f)
    let minF = Math.round(forecast[i].day.mintemp_f)
    let maxC = Math.round(forecast[i].day.maxtemp_c)
    let minC = Math.round(forecast[i].day.mintemp_c)

    let hiTemps = document.createElement(`div`)
    let lowTemps = document.createElement(`div`)

    //Forecast high temps
    hiTemps.setAttribute(`class`, `col-md-2`)
    highRow.appendChild(hiTemps)
    hiTemps.innerText = maxF

    //Forecast low temps
    lowTemps.setAttribute(`class`, `col-md-2`)
    lowRow.appendChild(lowTemps)
    lowTemps.innerText = minF


    // Toggle ºC & ºF (buttons)
    degTypeF.addEventListener(`click`, function(e) {
      temp.innerText = fahrenheit + `º`
      degTypeF.classList.replace(`off`, `on`)
      degTypeC.classList.replace(`on`, `off`)
      hiTemps.innerText = maxF
      lowTemps.innerText = minF
    })

    degTypeC.addEventListener(`click`, function(e) {
      temp.innerText = celsius + `º`
      degTypeF.classList.replace(`on`, `off`)
      degTypeC.classList.replace(`off`, `on`)
      hiTemps.innerText = maxC
      lowTemps.innerText = minC
    })
  }


  //Append conditions

  let conditions = document.getElementById(`conditions`)
  let todaysDate = response2.data.forecast.forecastday[0].date

  //Current Day
  let today = new Date(todaysDate)
  let todaysName = today.getDay()
  let todayBlock = document.createElement(`div`)
  todayBlock.classList.add(`today`)
  conditions.appendChild(todayBlock)
  todayBlock.innerText = daysOfWeek[todaysName]

  //Current Condition
  let currentCondition = document.createElement(`div`)
  currentCondition.classList.add(`condition`)
  conditions.appendChild(currentCondition)
  currentCondition.innerText = weatherCondition

  //Current Wind
  let winds = document.createElement(`div`)
  winds.classList.add(`wind`)
  conditions.appendChild(winds)
  winds.innerText = `Wind: ` + windMph + ` Mph`

  //Wind Direction
  let windDirection = document.createElement(`div`)
  windDirection.classList.add(`windDirection`)
  conditions.appendChild(windDirection)
  windDirection.innerText = `Wind Direction: ` + windDir

  //Humidity
  let humid = document.createElement(`div`)
  humid.classList.add(`humidity`)
  conditions.appendChild(humid)
  humid.innerText = `Humidity: ` + humidity + `%`


  //Changing weather color background
  let hr = document.getElementById(`hr`)
  let body = document.getElementById(`background`)
  if (temp >= `80º`) {
    body.style.backgroundColor = `#800000`
    hr.style.backgroundImage = `-webkit-linear-gradient(left, #800000, white, #800000)`
  } else if (temp < `80º`) {
    body.style.backgroundColor = `#ffcc00`
    hr.style.backgroundImage = `-webkit-linear-gradient(left, #ffcc00, white, #ffcc00)`
  } else if (temp <= `70º`) {
    body.style.backgroundColor = `#5a97f2`
    hr.style.backgroundImage = `-webkit-linear-gradient(left, #5a97f2, white, #5a97f2)`
  } else if (temp < `60º`) {
    body.style.backgroundColor = `#0D47A1`
    hr.style.backgroundImage = `-webkit-linear-gradient(left, #0D47A1, white, #0D47A1)`
  }
  


  //Changing weather pictures
  // let icon = response2.data.current.condition.icon
  // let iconsPH = document.getElementById(`icons`)
  // iconsPH.setAttribute(`src`, icon)


  //API call for value of search bar (city, country)



}