// weather section

const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';
const parkWeather = document.querySelector('#park-forecast');
let parkNameWeather = "";
// 
let parkLatLon = document.querySelector("#park-buttons")


//rewrite functions to use for loop like createOnPackClick

function displayCurrent(current) {
    document.getElementsByClassName("title").innerHTML = "";
    currentWeatherText = document.createElement("h4")
    currentWeatherText.textContent = "Current Weather"
    // console.log(parkNameWeather);
    let weatherInfo = document.createElement("p")
    weatherInfo.setAttribute("class", "info")
    weatherInfo.innerHTML = `<img src="http://openweathermap.org/img/wn/10d@2x.png"></img><div> Temp: ${current.temp} F</div>
    <div> Wind: ${current.wind_speed} MPH</div>
    <div> Humidity: ${current.humidity}%</div>
    <div> UV Index: ${current.uvi}</div>`;
    parkWeather.appendChild(currentWeatherText);
    parkWeather.appendChild(weatherInfo);
  }
  
  function displayFiveDay(daily) {
    currentForecastText = document.createElement("h4")
    currentForecastText.textContent = "Current Weather:"
    // console.log(daily)
    //clear existing park forecast
    // document.getElementsByClassName("future-forecast").innerHTML = "";
    const forecastName = document.querySelector('.future-forecast');
    // console.log(forecastName);
    
    forecastName.textContent = "5-Day Forecast:";
    parkWeather.appendChild(forecastName);
    for (let i =1; i < 6; i++) {
      let weatherInfo = document.createElement("div")
      const weatherIcon = document.createElement("img");
      const icon = daily[i].weather[0].icon
      console.log(icon);
      weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
      weatherInfo.setAttribute("class", "info")
      weatherInfo.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png"></img><p></p><p> Temp: ${daily[i].temp.day} F</p>
      <p> Wind: ${daily[i].wind_speed} MPH</p>
      <p> Humidity: ${daily[i].humidity}%</p>
      <p> UV Index: ${daily[i].uvi}</p>`;
    parkWeather.appendChild(weatherInfo);
    }
  }


// pull lat lon from button clicked. enter into weather api.
// return weather if possible for lat lon

let selectedLatLonArr = []
const genWeatherCards = parkLatLon.addEventListener('click', function(event) {
    // console.log(this); console.log(event.target);
    // document.getElementsByClassName("future-forecast").innerHTML = "";
    let selectedLatLon = event.target.getAttribute("data-lat-lon") // parkNameWeather = event.target.innerText; //console.log(parkNameWeather);
    console.log(selectedLatLon);
    // split lat -long from button
    selectedLatLonArr = selectedLatLon.split(",")
    console.log("split lat lon", selectedLatLonArr);
    //assign lat long to variables
    let latPark = selectedLatLonArr[0].substr(4,9);
    console.log(latPark);
    let lonPark = selectedLatLonArr[1].substr(6,9);
    console.log(lonPark);
    // weather call begin
    fetch(`${weatherApiRootUrl}/data/2.5/onecall?lat=${latPark}&lon=${lonPark}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`)
    .then(response => response.json())
    .then(body => {
        const current = body.current;
        const daily = body.daily;
        console.log("current", current, "daily Weather", daily)
        displayCurrent(current);
        displayFiveDay(daily);
    })
})
// end weather section

// function to create buttons of Parks in the state. Click on one to see weather and 
let searchId = 1;
//pulls description, activities,and parkName and places them on-click
const createOnPackClick = function(activities,description,parkName){
   return function () {
       document.querySelector("#parkName").innerHTML = parkName;
       document.querySelector("#parkDescription").innerHTML = description;
    let mainBodyEl = document.querySelector("#activities");
    mainBodyEl.innerHTML= "";
     activities.forEach((activity) => { genParkActivities(activity.name) } );
   }
}

const genNationalParkNameButtons = function(NpsName, latLon, activities, description) {
    let mainBodyEl = document.querySelector("#park-buttons");
    let NpsNameEl = document.createElement("button");
    NpsNameEl.setAttribute("id", "natPark"+searchId++);
    NpsNameEl.setAttribute("type", "Submit");
    NpsNameEl.classList = "btn btn-secondary text-center col-6 park-button";
    // add if statement to shorten park name if over X amount of characters
    NpsNameEl.textContent = NpsName;
    NpsNameEl.setAttribute("data-lat-lon", latLon)
    NpsNameEl.addEventListener("click", createOnPackClick(activities, description,NpsName));
    mainBodyEl.appendChild(NpsNameEl);
}; 

// const addLatLonToParkName = function(latLon) {
//     NpsNameEl.setAttribute("data-latlon", latLon)
// }

let searchIdAct = 1;
const genParkActivities = function(parkActivities) {
    let mainBodyEl = document.querySelector("#activities");
    let NpsActivityEl = document.createElement("div")
    NpsActivityEl.setAttribute("id", "natParkActivity"+searchIdAct++);
    NpsActivityEl.setAttribute("type", "Submit");
    NpsActivityEl.classList = "card-title text-center col-6";
    NpsActivityEl.textContent = parkActivities;
    mainBodyEl.appendChild(NpsActivityEl);
};

const NPSBaseLinkState = "https://developer.nps.gov/api/v1/parks?stateCode=";
const NPSBaseLink = "https://developer.nps.gov/api/v1/parks?"; //removed parkCode= testing
const NPSAfterPark = "&api_key="; //&limit=100
const NPSApiKey = "EpGp2F62PA1Qt4BOsP2ogdUQLLd9FjcjP5Obxgbw";
let parkSearch = "";
let testParkSearch = "";
function change_stateName(value){
    testParkSearch = value;
}
function searchParks() {
    searchNPSApi(testParkSearch);
}

function getState(selectObject) {
    let value = selectObject.value;
    let testParkSearch=value;
    document.getElementById("state").innerHTML = "You selected: " + value;
    // console.log(value);
}

//
// example API link https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=EpGp2F62PA1Qt4BOsP2ogdUQLLd9FjcjP5Obxgbw
//goal pull NPS api.

// blank list to hold park names
let parkNamesReturned = [];
let parkLatLongsReturned = [];

function searchNPSApi() {
    let NPSApiCall = NPSBaseLinkState + testParkSearch + NPSAfterPark + NPSApiKey;
    // console.log(NPSApiCall)
    fetch(NPSApiCall)
    .then(response => response.json())
    .then(body => { //test response later
        // console.log(body.data); 
        // show park names
        // body.data.forEach((parkName) => {genNationalParkNameButtons(parkName.fullName) } );
        //update park name array
        body.data.forEach((parkName) => {parkNamesReturned.push(parkName.fullName) } );
        // console.log(parkNamesReturned);
        //update lat long array to match against
        body.data.forEach((saveLatLon) => {parkLatLongsReturned.push(saveLatLon.latLong) } );
        // console.log(parkLatLongsReturned);
        // body.data.forEach((parkName) => {console.log(parkName.fullName), console.log(parkName.latLong) } );
        document.querySelector("#park-buttons").innerHTML = "";
        // body.data.forEach((parkName) => {console.log(parkName.fullName), addLatLonToParkName(parkName.latLong) } );
        //Added activities and description
        body.data.forEach((parkName) => { genNationalParkNameButtons(parkName.fullName, parkName.latLong, parkName.activities, parkName.description) } );
        // console.log(body.data[0].latLong)
        let lon = body.data[0].longitude;
        let lat = body.data[0].latitude;
    })
}

