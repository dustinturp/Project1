// $(document).ready(function() {
//     console.log("ready");

//show time in current weather section
// const displayTime = setInterval(myTimer, 1000);

// function myTimer() {
//   let d = new Date();
//   let t = d.toLocaleTimeString();
//   let date = d.toLocaleDateString();
//   document.getElementById("current-day-weather").innerHTML = date + "    " + t;
// };

// may not need lat and lon for weather api can accept cities. 
// const weatherApiKey = "889a9dfc6fa2d18eaaf5c4787cb0cb11";
// const weatherBaseApiUrl = 'https://api.openweathermap.org'
// //example call https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=889a9dfc6fa2d18eaaf5c4787cb0cb11

// function searchCityWeather(cityName) {
//     console.log("City Name is", cityName);
//     // https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&limit=5&appid=" + apiKey https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=889a9dfc6fa2d18eaaf5c4787cb0cb11"
//     let apiCall ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&limit=5&appid=" + apiKey;
//     console.log("API call", apiCall)
//     fetch(apiCall)
//     .then(function (response) {
//         if(response.ok);
//         console.log(response);
//         return response.json()
//     })
//     .then(function (body){
//         console.log('body', body);
//         let lon = body[0].lon;
//         let lat = body[0].lat;
//         console.log(lat,lon);
//         return fetch(`${baseApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}`)
//         //return fetch(`${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`)
//     })
    // .then() fill out current day
    // .then() fill out extended day forecast
// };

// const cityNameSubmit = function(cityName) {
//     // event.preventDefault();
// //    let cityName = cityNameEl.value.trim();
//    console.log("City Name is", cityName);
//    if(cityName){
//     searchCityWeather(cityName);
//     cityNameEl.textContent = '';
//     searchHistoryButton(cityName);
//    }
// };

// //  did not like the variable placement at the top of the doc
// let cityNameEl = document.querySelector("#search-box-text");
// let searchButton = document.querySelector("#search-box-button");
// listen for whole area clicks
// cityInputEl.addEventListener("click", cityNameSubmit)
// });
// searchButton.onclick = function() {
//     console.log("button clicked")
//     let cityName = cityNameEl.value.trim();
//     if(cityName){
//         console.log("City Name is", cityName);
//         cityNameSubmit(cityName);
//     }
// };
// 09/20 updates
// function to create buttons of Parks in the state. Click on one to see weather and 
let searchId = 0;
//pulls descripion, activities,and parkName and places them on-click
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
    let mainBodyEl = document.querySelector("#body");
    let NpsNameEl = document.createElement("button");
    let npsNameContainerEl = document.createElement("span");
    NpsNameEl.setAttribute("id", "natPark"+searchId++);
    NpsNameEl.setAttribute("type", "Submit");
    NpsNameEl.classList = "btn btn-secondary text-center col-6";
    npsNameContainerEl.classList = "button-text"
    npsNameContainerEl.textContent = NpsName;
    NpsNameEl.setAttribute("data-latlon", latLon)
    NpsNameEl.addEventListener("click", createOnPackClick(activities, description,NpsName));
    mainBodyEl.appendChild(NpsNameEl);
    NpsNameEl.appendChild(npsNameContainerEl)
}; 

// const addLatLonToParkName = function(latLon) {
//     NpsNameEl.setAttribute("data-latlon", latLon)
// }

const genParkActivities = function(parkActivities) {
    let mainBodyEl = document.querySelector("#activities");

    let searchId = 0;
    let NpsActivityEl = document.createElement("div")
    NpsActivityEl.setAttribute("id", "natParkActivity"+searchId++);
    NpsActivityEl.setAttribute("type", "Submit");
    NpsActivityEl.classList = "card-title text-center";
    NpsActivityEl.textContent = parkActivities;
    mainBodyEl.appendChild(NpsActivityEl);
};

//




//
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

//
function getState(selectObject) {
    let value = selectObject.value;
    let testParkSearch=value;
    document.getElementById("state").innerHTML = "You selected: " + value;
    console.log(value);

}

//
// example API link https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=EpGp2F62PA1Qt4BOsP2ogdUQLLd9FjcjP5Obxgbw
//goal pull NPS api.

// blank list to hold park names
let parkNamesReturned = [];
let parkLatLongsReturned = [];

function searchNPSApi(stateSearched) {
    let NPSApiCall = NPSBaseLinkState + testParkSearch + NPSAfterPark + NPSApiKey;
    console.log(NPSApiCall)
    fetch(NPSApiCall)
    .then(response => response.json())
    .then(body => { //test response later
        console.log(body.data);
        // show park names
        // body.data.forEach((parkName) => {genNationalParkNameButtons(parkName.fullName) } );
        //update park name array
        body.data.forEach((parkName) => {parkNamesReturned.push(parkName.fullName) } );
        //update lat long array to match against
        body.data.forEach((saveLatLon) => {parkLatLongsReturned.push(saveLatLon.latLong) } );
        // console.log(parkNamesReturned);
        console.log("Test begin");
        // body.data.forEach((parkName) => {console.log(parkName.fullName), console.log(parkName.latLong) } );
        document.querySelector("#body").innerHTML = "";

        // body.data.forEach((parkName) => {console.log(parkName.fullName), addLatLonToParkName(parkName.latLong) } );
        //Added activities and description
        body.data.forEach((parkName) => { genNationalParkNameButtons(parkName.fullName, parkName.latLong, parkName.activities, parkName.description) } );
        // let NPSId = body.data[0].id;
        // let latLong = body.data[0].latLong;
        console.log(body.data[0].latLong)
        let lon = body.data[0].longitude;
        let lat = body.data[0].latitude;
        // console.log(lat, lon);

        // let NPSId = data[0][0].id; get activities https://www.nps.gov/subjects/developer/api-documentation.htm#/activities/getActivities
        // console.log(NPSId);
        // console.log(lat,lon);
        // let activities = data[0].activities;
        // console.log(activities);

        //once the park is picked from the list/drop down search then finish the activites. 
        // body.data[0].activities.forEach((activity) => { console.log(activity.name) } )
     // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    })
    //Fetch from State code


    // .then(function (response){
    //     if(response.ok)
    //     console.log(response);
    //    response.json()
    // })
    // .then(function (body){
    //     console.log('body', body);
    //     let lon = data[0].longitude;
    //     let lat = data[0].latitude;
    //     console.log(lat,lon);
    // })
}

// NPS noties needs [0].actiities for activities create little cards with the name of them.