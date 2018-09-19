document.addEventListener("DOMContentLoaded", (e) => {

  //Grab user coordinates
  axios.get(`https://ipinfo.io`)
    .then(e => getCurrentWeather(e))


  //Declare to search for cities
  let form = document.getElementById(`search`)

  form.addEventListener(`submit`, submitEvent)


  function submitEvent(event) {
    let searchbar = document.getElementById(`searchbar`).value
    getCall(searchbar)
  }

  function getCall(location) {
    axios.get(`https://api.apixu.com/v1/forecast.json?key=e452323a9db841b187b164113180709&q=${location}`)
      .then((response) => updateUI(response))
  }



  function getCurrentWeather(response) {
    let coords = response.data.loc.split(`,`)
    let lat = coords[0]
    let long = coords[1]

    //API for JSON object containing user's current weather data
    let api = `https://api.apixu.com/v1/forecast.json?key=e452323a9db841b187b164113180709&q=` + lat + `,` + long + `&days=7`

    axios.get(api)
      .then(e => updateUI(e))
  }

  function removeElementsChildren(id) {
    let element = document.getElementById(id)
    while (element.hasChildNodes()) {
      element.removeChild(element.childNodes[0])
    }
  }

  function updateUI(response2) {
    removeElementsChildren(`conditions`)
    removeElementsChildren(`forecast`)
    removeElementsChildren(`highRow`)
    removeElementsChildren(`lowRow`)
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
      degTypeF.addEventListener(`click`, function (e) {
        temp.innerText = fahrenheit + `º`
        degTypeF.classList.replace(`off`, `on`)
        degTypeC.classList.replace(`on`, `off`)
        hiTemps.innerText = maxF
        lowTemps.innerText = minF
      })

      degTypeC.addEventListener(`click`, function (e) {
        temp.innerText = celsius + `º`
        degTypeF.classList.replace(`on`, `off`)
        degTypeC.classList.replace(`off`, `on`)
        hiTemps.innerText = maxC
        lowTemps.innerText = minC
      })
    }


    //Append conditions
    let todaysDate = response2.data.forecast.forecastday[0].date
    let today = new Date(todaysDate) //Current Day
    let todaysName = today.getDay()

    let conditions = document.getElementById(`conditions`)
    conditions.innerHTML = `
    <div class="today">${daysOfWeek[todaysName]}</div>
    <div class="condition">${weatherCondition}</div>
    <div class="wind">Wind: ${windMph} Mph</div>
    <div class="windDirection">Wind Direction: ${windDir}</div>
    <div class="humidity">Humidity: ${humidity}%</div>`

    
    // Changing weather color background (FIX THIS - Gradient as background)
    let hr = document.getElementsByClassName(`hr`)[0]
    let body = document.getElementById(`background`)
    let tempValue = parseInt(temp.innerHTML, 10)
    if (tempValue >= 80) {
      body.style.backgroundImage = `-webkit-linear-gradient(left, #e58d1b, #800000)`
      hr.style.backgroundImage = `-webkit-linear-gradient(left, #e58d1b, white, #800000)`
    } else if (tempValue >= 70) {
      body.style.backgroundImage = `-webkit-linear-gradient(left, #f9c920, #e58d1b)`
      hr.style.backgroundImage = `-webkit-linear-gradient(left, #f9c920, white, #e58d1b)`
    } else if (tempValue >= 60) {
      body.style.backgroundImage = `-webkit-linear-gradient(left, #0D47A1, #5a97f2)`
      hr.style.backgroundImage = `-webkit-linear-gradient(left, #5a97f2, white, #5a97f2)`
    } else if (tempValue <= 59) {
      body.style.backgroundImage = `-webkit-linear-gradient(left, #072A60, #0D47A1)`
      hr.style.backgroundImage = `-webkit-linear-gradient(left, #0D47A1, white, #0D47A1)`
    }

    //Changing weather pictures
    // let icon = response2.data.current.condition.icon
    // let iconsPH = document.getElementById(`icons`)
    // iconsPH.setAttribute(`src`, icon)


    //API call for value of search bar (city, country)

    //local storage

    //tests


  }

})