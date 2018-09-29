const expect = chai.expect

describe("Check tests are running", () => {
  it("Ran a test", () => {
    expect(true).to.equal(true)
  })
})

document.addEventListener(`DOMContentLoaded`, () => {
  let searchbarTest = document.getElementById(`searchbar`)
  let locationTest = document.getElementById(`location`)
  let goButtonTest = document.getElementById(`go`)

  describe("searches for city", () => {
    it("checks your location", () => {
      expect(locationTest.innerText).to.equal(`Your Location`)
    })
  })

  describe("axios gets data", () => {
    it("gets London weather", () => {
      axios.get(`https://api.apixu.com/v1/forecast.json?key=bef89cdff8d8407684220054182409&q=London&days=7`)
      .then((response) => {
        expect(response.data.location.name).to.equal(`London, United Kingdom`)
      })
    })
  })

  describe("toggle imperial/metric", () => {
    it("toggles temp type", () => {
      let degTypeCTest = document.getElementById(`degTypeC`)
      degTypeCTest.click()
      expect(degTypeCTest.classList.contains(`focus-tempType`)).to.equal(true)
    })
  })
})