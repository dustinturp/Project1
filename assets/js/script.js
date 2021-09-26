// weather section

const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

let parkLatLon = document.querySelector("#park-buttons")

// pull lat lon from button clicked. enter into weather api.
// return weather if possible for lat lon


const genWeatherCards = parkLatLon.addEventListener('click', function(event) {
    // let parkLatLon = event.document.querySelector("#park-buttons")
    let selectedLatLon = event.target.getAttribute("data-lat-lon")
    // split lat lon into separate coordinates. 
    

    // console.log(selectedLatLon)
    //get value from click
    // parkLatLon
    // parkLatLon.addEventListener("click",console.log("button clicked"))
    console.log("button clicked") 
})
// end weather section

// function to create buttons of Parks in the state. Click on one to see weather and 
let searchId = 1;
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
    let mainBodyEl = document.querySelector("#park-buttons");
    let NpsNameEl = document.createElement("button");
    let npsNameContainerEl = document.createElement("span");
    NpsNameEl.setAttribute("id", "natPark"+searchId++);
    NpsNameEl.setAttribute("type", "Submit");
    NpsNameEl.classList = "btn btn-secondary text-center col-6";
    npsNameContainerEl.classList = "button-text"
    npsNameContainerEl.textContent = NpsName;
    NpsNameEl.setAttribute("data-lat-lon", latLon)
    NpsNameEl.addEventListener("click", createOnPackClick(activities, description,NpsName));
    mainBodyEl.appendChild(NpsNameEl);
    NpsNameEl.appendChild(npsNameContainerEl)
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

function searchNPSApi(stateSearched) {
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
        // console.log("Test begin");
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

