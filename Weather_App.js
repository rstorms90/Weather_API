//// ON DOCUMENT READY \\\\

document.addEventListener("DOMContentLoaded", (e) => {

  let searchbar = document.getElementById(`searchbar`)
  let dropdown = document.getElementById(`dropdown`)

  if (localStorage.getItem(`favoriteCities`)){
    let favorites = JSON.parse(localStorage.getItem(`favoriteCities`))
    

    for (let i = 0; i < favorites.length; i++) {
      let option = `<a class="dropdown-item" href="#" id="${favorites[i]}"><i class="fas fa-trash delete" aria-hidden="true"></i>${favorites[i]}</a>`
      dropdown.innerHTML += option
    }
  }

  //// DROPDOWN ARROW MENU - LOCAL STORAGE \\\\
  dropdown.addEventListener(`click`, (event) => {
    document.getElementById(`searchbar`).value = ``
    if (event.target.classList.contains(`delete`)) {
      let arrOfCities = JSON.parse(localStorage.getItem(`favoriteCities`))
      let deleteInd = arrOfCities.indexOf(event.target.parentNode.id)
      let trash = arrOfCities.splice(deleteInd, 1)
      localStorage.setItem(`favoriteCities`, JSON.stringify(arrOfCities))

      dropdown.removeChild(event.target.parentNode)
    } else {
      getCall(event.target.text)
    }
  })

  getLocalWeather()

  //// VARIABLES FOR WEATHER INFO \\\\
  let maxF
  let minF
  let maxC
  let minC
  let fahrenheit
  let celsius
  let degTypeF = document.getElementById(`degTypeF`)
  let degTypeC = document.getElementById(`degTypeC`)
  let temp = document.getElementById(`temp`)
  let location = document.getElementById(`location`)
  

  //// FORM TO SEARCH CITIES \\\\
  let form = document.getElementById(`search`)

  form.addEventListener(`submit`, submitEvent)


  function submitEvent(event) {
    searchbar = document.getElementById(`searchbar`).value
    event.preventDefault()
    getCall(searchbar)
  }


  //// LOCAL STORAGE - ADD A BUTTON FOR FAVORITE CITIES \\\\
  let favorites = JSON.parse(localStorage.getItem(`favoriteCities`))
  let favCityButton = document.getElementById(`favCityButton`)
  let arrow = document.getElementById(`arrow`)

  //// DROPDOWN BUTTON \\\\
  arrow.addEventListener(`click`, () => {
    favorites = JSON.parse(localStorage.getItem(`favoriteCities`))
    })


  //// "ADD CITY" BUTTON \\\\
  favCityButton.addEventListener(`click`, function (e) {
    let searchbar = document.getElementById(`searchbar`).value
    let option = document.createElement(`a`)

      let city = document.getElementById(`city`)
      favorites = JSON.parse(localStorage.getItem(`favoriteCities`)) || []
      
      if (favorites.indexOf(location.innerText) === -1) {
        favorites.push(location.innerText)
        localStorage.setItem(`favoriteCities`, JSON.stringify(favorites))
        dropdown.appendChild(option)
        option.classList.add(`dropdown-item`)
        
        for (let i = 0; i < favorites.length; i++) {
          option.innerHTML = `<i class="fas fa-trash delete" aria-hidden="true"></i> ${favorites[i]}`
      }
        
      } else {
        alert(`This city is in your favorites!`)
      }
  })


  //// API CALL FOR ANY CITY \\\\
  function getCall(location) {
    axios.get(`https://api.apixu.com/v1/forecast.json?key=bef89cdff8d8407684220054182409&q=${location}&days=7`)
      .then((response) => updateUI(response))
      .catch(error => {
      console.log(error)
      if (error.response.status === 400) {
        alert(`City not found. Try again!`)
      }
      })
  }


  function getLocalWeather() {
    //// GRAB USER COORDINATES \\\\
    axios.get(`https://ipinfo.io`)
      .then(e => {
        let coords = e.data.loc.split(`,`)
        let lat = coords[0]
        let long = coords[1]

        //// API FOR JSON OBJECT CONTAINING USER'S CURRENT WEATHER DATA \\\\
        let api = `https://api.apixu.com/v1/forecast.json?key=bef89cdff8d8407684220054182409&q=` + lat + `,` + long + `&days=7`

        axios.get(api)
          .then(e => updateUI(e))
      })
  }

  //// TOGGLE ºC & ºF (BUTTONS)
  degTypeF.addEventListener(`click`, function (e) {
    temp.innerText = fahrenheit + `º`
    degTypeF.classList.add(`focus-tempType`)
    degTypeC.classList.remove(`focus-tempType`)

    let tempElements = document.getElementsByClassName(`hi-temps`)
    for (let i = 0; i < tempElements.length; i++) {
      tempElements[i].innerText = maxF[i]
    }

    tempElements = document.getElementsByClassName(`low-temps`)
    for (let i = 0; i < tempElements.length; i++) {
      tempElements[i].innerText = minF[i]
    }
  })

  degTypeC.addEventListener(`click`, function (e) {
    temp.innerText = celsius + `º`
    degTypeC.classList.add(`focus-tempType`)
    degTypeF.classList.remove(`focus-tempType`)

    let tempElements = document.getElementsByClassName(`hi-temps`)
    for (let i = 0; i < tempElements.length; i++) {
      tempElements[i].innerText = maxC[i]
    }

    tempElements = document.getElementsByClassName(`low-temps`)
    for (let i = 0; i < tempElements.length; i++) {
      tempElements[i].innerText = minC[i]
    }
  })

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



    //// DECLARE TEMP VARIABLES \\\\
    fahrenheit = Math.round(response2.data.current.temp_f)
    celsius = Math.round(response2.data.current.temp_c)
    degTypeF.innerText = `ºF`
    degTypeC.innerText = `ºC`


    //// APPEND CURRENT LOCATION
    if (country === `United States of America`) {
      country = `US`
      
      //// SET DEFAULT TO FAHRENHEIT, GRAY OUT CELSIUS \\\\
      temp.innerText = fahrenheit + `º`
      degTypeF.classList.add(`focus-tempType`)
      degTypeC.classList.remove(`focus-tempType`)
    } else {
      temp.innerText = celsius + `º`
      degTypeF.classList.remove(`focus-tempType`)
      degTypeC.classList.add(`focus-tempType`)
    }
    location.innerText = curLocation + `, ` + country



    //// CHANGE DATES TO CORRESPONDING DAYS \\\\
    let daysOfWeek = [`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`]

    ////APPEND 6 DAY FORECAST WEATHER \\\\
    let forecastRow = document.getElementById(`forecast`)
    let forecastCol = document.getElementById(`col`)
    let forecast = response2.data.forecast.forecastday.slice(1)
    let highRow = document.getElementById(`highRow`)
    let lowRow = document.getElementById(`lowRow`)

    //// CLEAR OUT MIN/MAX TEMPERATURES \\\\
    maxF = []
    minF = []
    maxC = []
    minC = []


    //// LOOP THROUGH FORECAST DAYS AND SET TO BOTTOM \\\\
    for (let i = 0; i < forecast.length; i++) {
      let date = forecast[i].date
      let day = document.createElement(`div`)
      day.setAttribute(`class`, `col-md-2`)
      forecastRow.appendChild(day)
      let dayInfo = new Date(date)
      let dayName = dayInfo.getDay()
      day.innerText = daysOfWeek[dayName]

      //// SET HIGHS AND LOWS FOR EACH FORECAST \\\\
      maxF.push(Math.round(forecast[i].day.maxtemp_f))
      minF.push(Math.round(forecast[i].day.mintemp_f))
      maxC.push(Math.round(forecast[i].day.maxtemp_c))
      minC.push(Math.round(forecast[i].day.mintemp_c))

      let hiTemp = document.createElement(`div`)
      let lowTemp = document.createElement(`div`)

      //// FORECAST HIGH TEMPS \\\\
      hiTemp.setAttribute(`class`, `col-md-2 hi-temps`)
      if (country === `US`) {
        hiTemp.innerText = maxF[i]
      } else {
        hiTemp.innerText = maxC[i]
      }
      highRow.appendChild(hiTemp)


      //// FORECAST LOW TEMPS \\\\
      lowTemp.setAttribute(`class`, `col-md-2 low-temps`)
      if (country === `US`) {
        lowTemp.innerText = minF[i]
      } else {
        lowTemp.innerText = minC[i]
      }
      lowRow.appendChild(lowTemp)
    }


    //// APPEND CONDITIONS \\\\
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


    //// CHANGING WEATHER COLOR BACKGROUND \\\\
    let hr = document.getElementsByClassName(`hr`)[0]
    let body = document.getElementById(`background`)

    let tempValue = fahrenheit
    let gradColors
    if (tempValue >= 80) {
      gradColors = ['#e58d1b', '#800000']
    } else if (tempValue >= 70) {
      gradColors = ['#f9c920', '#e58d1b']
    } else if (tempValue >= 60) {
      gradColors = ['#0D47A1', '#5a97f2']
    } else {
      gradColors = ['#072A60', '#0D47A1']
    }
    body.style.background = `-webkit-linear-gradient(left, ${gradColors[0]}, ${gradColors[1]})`
    hr.style.background = `-webkit-linear-gradient(left, ${gradColors[0]}, white, ${gradColors[1]})`

    //// CHANGING WEATHER PICTURES \\\\
    let icon = response2.data.current.condition.icon
    let iconsPH = document.getElementById(`icons`)
    iconsPH.setAttribute(`src`, icon)
  }
})