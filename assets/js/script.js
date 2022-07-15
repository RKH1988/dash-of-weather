//api to get all weather
var apiEnd = "&exclude=minutely,hourly,alerts&appid=5a4b1c36c3275dd441fc4329cc80e586&units=imperial";
var apiBegin = "https://api.openweathermap.org/data/2.5/onecall?&lat=";

//weather icon href link
var iconStartUrl = "http://openweathermap.org/img/wn/";
var iconEndUrl = "@2x.png";
var icon = "";

//api to get lat and lon from city name
var coordUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
var apiKey = "&limit=5&appid=5a4b1c36c3275dd441fc4329cc80e586";

//variables for querySelectors
var userFormEl=document.querySelector("#user-form");
var cityInputEl=document.querySelector("#city");
var currentContainerEl=document.querySelector("#current");
var cityDisplayEl = document.querySelector("#city-name");
var currDateEl=document.querySelector("#currDate");
var currTempEl=document.querySelector("#currTemp");
var currWindEl=document.querySelector("#currWind");
var currHumidityEl=document.querySelector("#currHumidity");
var currUvEl=document.querySelector("#currUv");
var date1El=document.querySelector("#date1");
var date2El=document.querySelector("#date2");
var date3El=document.querySelector("#date3");
var date4El=document.querySelector("#date4");
var date5El=document.querySelector("#date5");
var img1El=document.querySelector("#img1");
var img2El=document.querySelector("#img2");
var img3El=document.querySelector("#img3");
var img4El=document.querySelector("#img4");
var img5El=document.querySelector("#img5");
var temp1El=document.querySelector("#Temp1");
var temp2El=document.querySelector("#Temp2");
var temp3El=document.querySelector("#Temp3");
var temp4El=document.querySelector("#Temp4");
var temp5El=document.querySelector("#Temp5");
var wind1El=document.querySelector("#Wind1");
var wind2El=document.querySelector("#Wind2");
var wind3El=document.querySelector("#Wind3");
var wind4El=document.querySelector("#Wind4");
var wind5El=document.querySelector("#Wind5");
var humidity1El=document.querySelector("#Humidity1");
var humidity2El=document.querySelector("#Humidity2");
var humidity3El=document.querySelector("#Humidity3");
var humidity4El=document.querySelector("#Humidity4");
var humidity5El=document.querySelector("#Humidity5");

var cityArr=[];
//function to submit the city entered in the input
var formSubmitHandler = function(event) {
    //prevent page from refreshing
    event.preventDefault();

    //get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCoordinates(city);
        saveCity(city);

        //clear old content
        cityInputEl.value = ""

    } else {
        alert("Please enter a city name");
    }
};

//function to get lat and lon from city name using api
var getCoordinates = function(city) {
    //format the url
    var apiUrl = coordUrl + city + apiKey;
    console.log(apiUrl);

    //fetch lat and lon and display city name
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

//function that calls the functions that get current and forecast weather data based on submitted lon and lat
var getCurrWeather = function(lat,lon){
    var apiUrl=apiBegin +lat +"&lon="+lon+apiEnd;
    console.log(apiUrl);

    fetch(apiUrl).then(function(response){
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data);
                displayCurrWeather(lat,lon);
                displayForecast(lat,lon);
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
                currDateEl.textContent="  ("+ moment(current.dt).format("M/D/YYYY")+")";
                var currImgEl=document.querySelector("#currImg");
                var icon=data.current.weather[0].icon;
                currImgEl.setAttribute("src",iconStartUrl+icon+iconEndUrl);
                currTempEl.textContent=data.current.temp+"°F";
                currWindEl.textContent=data.current.wind_speed+" MPH";
                currHumidityEl.textContent=data.current.humidity+"%";
                currUvEl.textContent=parseInt(data.current.uvi);
                editUvIndex(currUvEl);
            });           
        } else {
            alert("Error: City Not Found");
        }    
    });
};

//updates uv color based on favorable/unfavorable uv conditions
var editUvIndex = function(currUvEl) {
    if (currUvEl<=3){
        currUvEl.classList.remove("badge", "badge-danger");
        currUvEl.classList.remove("badge", "badge-warning");
        currUvEl.classList.add("badge", "badge-success");
    } else if (currUvEl>3 ) {
        currUvEl.classList.remove("badge", "badge-success");
        currUvEl.classList.remove("badge", "badge-warning");
        currUvEl.classList.add("badge", "badge-danger");
    } else {
        currUvEl.classList.remove("badge", "badge-success");
        currUvEl.classList.remove("badge", "badge-danger");
        currUvEl.classList.add("badge", "badge-warning");
    }
};


//fetches 5 day forecast information
var displayForecast = function(lat,lon) {
    var apiUrl=apiBegin +lat +"&lon="+lon+apiEnd;
    fetch(apiUrl).then(function(response){
        if(response.ok) {
            console.log(response);
            response.json().then(function(data){
                console.log(data)
                //display dates
                date1El.textContent= moment(current.dt).add(1,"days").format("M/D/YYYY");
                date2El.textContent=moment(current.dt).add(2,"days").format("M/D/YYYY");
                date3El.textContent=moment(current.dt).add(3,"days").format("M/D/YYYY");
                date4El.textContent=moment(current.dt).add(4,"days").format("M/D/YYYY");
                date5El.textContent=moment(current.dt).add(5,"days").format("M/D/YYYY");
                //display weather icon
                img1El.setAttribute("src",iconStartUrl+data.daily[0].weather[0].icon+iconEndUrl);
                img2El.setAttribute("src",iconStartUrl+data.daily[1].weather[0].icon+iconEndUrl);
                img3El.setAttribute("src",iconStartUrl+data.daily[2].weather[0].icon+iconEndUrl);
                img4El.setAttribute("src",iconStartUrl+data.daily[3].weather[0].icon+iconEndUrl);
                img5El.setAttribute("src",iconStartUrl+data.daily[4].weather[0].icon+iconEndUrl);
                //display high temperature
                temp1El.textContent=data.daily[0].temp.max+"°F";
                temp2El.textContent=data.daily[1].temp.max+"°F";
                temp3El.textContent=data.daily[2].temp.max+"°F";
                temp4El.textContent=data.daily[3].temp.max+"°F";
                temp5El.textContent=data.daily[4].temp.max+"°F";
                //display wind speed
                wind1El.textContent=data.daily[0].wind_speed+" MPH";
                wind2El.textContent=data.daily[1].wind_speed+" MPH";
                wind3El.textContent=data.daily[2].wind_speed+" MPH";
                wind4El.textContent=data.daily[3].wind_speed+" MPH";
                wind5El.textContent=data.daily[4].wind_speed+" MPH";
                //display humidity
                humidity1El.textContent=data.daily[0].humidity+"%";
                humidity2El.textContent=data.daily[1].humidity+"%";
                humidity3El.textContent=data.daily[2].humidity+"%";
                humidity4El.textContent=data.daily[3].humidity+"%";
                humidity5El.textContent=data.daily[4].humidity+"%";
            });           
        } else {
            alert("Error: City Not Found");
        }    
    });
};

//save to local storage
var saveCity = function(city){
    cityArr.push(city);
    console.log(cityArr);
    localStorage.setItem("cityArr",JSON.stringify(cityArr));
}

var loadCity = function(){
    cityArr =localStorage.getItem("cityArr");

    if(!cityArr) {
        cityArr=[];
        return false;
    }

    cityArr=JSON.parse(cityArr);
 

    for(var i=0; i<cityArr.length; i++) {
        addSearchHistoryEl(cityArr[i]);
    };
};


var addSearchHistoryEl = function(cityArr) {
    var searchHistoryEl = document.querySelector("#searchHistory");
    var searchDivEl = document.createElement("div")
    var searchButtonEl=document.createElement("button");

    searchDivEl.classList="row";
    
    searchButtonEl.classList = "btn btn-secondary btn-lg btn-block col mb-3";
    searchButtonEl.textContent=cityArr;
    searchHistoryEl.appendChild(searchDivEl);
    searchDivEl.appendChild(searchButtonEl);

    searchButtonEl.addEventListener("click",function(){
        getCoordinates(searchButtonEl.textContent);
    });
};


// add event listener to form
userFormEl.addEventListener('submit', formSubmitHandler);

//set local city so that form always has content
getCoordinates("Greensboro");

loadCity();