var apiEnd = "&exclude=minutely,hourly,alerts&appid=5a4b1c36c3275dd441fc4329cc80e586&units=imperial";
var apiBegin = "https://api.openweathermap.org/data/2.5/onecall?&lat=";

var iconStartUrl = "http://openweathermap.org/img/wn/";
var iconEndUrl = "@2x.png";
var icon = "";

var coordUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var apiKey = "&limit=5&appid=5a4b1c36c3275dd441fc4329cc80e586";

var saveBtn=$("#save");

var sHistoryArr=[];
var userFormEl=document.querySelector("#user-form");
var cityInputEl=document.querySelector("#city");
var currentContainerEl=document.querySelector("#current");
var cityDisplayEl = document.querySelector("#city-name");
var currDateEl=document.querySelector("#currDate");
var currTempEl=document.querySelector("#currTemp");
var currWindEl=document.querySelector("#currWind");
var currHumidityEl=document.querySelector("#currHumidity");
var currUvEl=document.querySelector("#currUv");

var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCoordinates(city);

        //clear old content
        //currentContainerEl.textContent="";
        cityInputEl.value="";
    } else {
        alert("Please enter a city name");
    }
};

var getCoordinates = function(city) {
    //format the url
    var apiUrl = coordUrl + city + apiKey;
    console.log(apiUrl);

    //fetch lat and lon
    fetch(apiUrl).then(function(response){
        //request was successful
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                var lat = data[0].lat;
                var lon = data[0].lon;
                cityDisplayEl.textContent=city;
                getCurrWeather(lat,lon);
            });
        } else {
            alert("Error: City Not Found");
        }
    })
    .catch (function(error){
        alert("Unable to connect to OpenWeather")
    });
};

var getCurrWeather = function(lat,lon){
    var apiUrl=apiBegin +lat +"&lon="+lon+apiEnd;
    console.log(apiUrl);
    
    //fetch current weather data
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                displayCurrWeather(lat,lon);
            });
        } else {
            alert("Error: City Not Found");
        }
    });
};

//current weather fetch
var displayCurrWeather = function(lat, lon) {
    var apiUrl=apiBegin +lat +"&lon="+lon+apiEnd;
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data)
                currDateEl.textContent="  "+ moment(current.dt).format("M/D/YYYY");
                var currImgEl=document.querySelector("#currImg");
                var icon=data.current.weather[0].icon;
                currImgEl.setAttribute("src",iconStartUrl+icon+iconEndUrl);
                currTempEl.textContent=data.current.temp+"°F";
                currWindEl.textContent=data.current.wind_speed+"MPH";
                currHumidityEl.textContent=data.current.humidity+"%";
                currUvEl.textContent=data.current.uvi;
                editUvIndex(lat,lon);
            });           
        } else {
            alert("Error: City Not Found");
        }    
    });
};

var editUvIndex = function(lat,lon) {
    var apiUrl=apiBegin +lat +"&lon="+lon+apiEnd;
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data)
                var uV = data.current.uvi;
                
            });           
        } else {
            alert("Error: City Not Found");
        }    
    });
};

//convert Unix Timestamp to date
 //  moment(dt).format("M/D/YYYY");


// add event listener to form
userFormEl.addEventListener('submit', formSubmitHandler);