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
  let {
    windMph,
    windKm,
    windDir,
    humidity
  } = response2.data.current

  let feelsLikeF = Math.round(response2.data.current.feelslike_f)
  let feelsLikeC = Math.round(response2.data.current.feelslike_c)



  //Append current location
  let location = document.getElementById(`location`)
  if (country = `United States of America`) {
    country = `US`
  }
  location.innerText = curLocation + `, ` + country


  // Declare temp variables
  let degTypeF = document.getElementById(`degTypeF`)
  let degTypeC = document.getElementById(`degTypeC`)
  let temp = document.getElementById(`temp`)
  let fahrenheit = Math.round(response2.data.current.temp_f)
  let celsius = Math.round(response2.data.current.temp_c)
  degTypeF.innerText = `ºF`
  degTypeC.innerText = `ºC`



  //Change dates to corresponding days
  let daysOfWeek = [`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`]

  //Append 6 day forecast weather
  let forecastRow = document.getElementById(`forecast`)
  let forecastCol = document.getElementById(`col`)
  let forecast = response2.data.forecast.forecastday.slice(1)
  let high = document.getElementById(`high`)
  let low = document.getElementById(`low`)

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
    high.appendChild(hiTemps)
    hiTemps.innerText = maxF

    //Forecast low temps
    lowTemps.setAttribute(`class`, `col-md-2`)
    low.appendChild(lowTemps)
    lowTemps.innerText = minF
  }

  //Set default to fahrenheit, gray out celsius
  temp.innerText = fahrenheit + `º`
  degTypeF.classList.add(`on`)
  degTypeC.classList.add(`off`)


  // Toggle ºC & ºF (buttons)
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





  //API call for value of search bar (city, country)

  //Changing weather pictures

  //Changing weather color background

  //Append conditions
    //Day TIME
    //Condition
      
    //Wind
    //Humidity


}