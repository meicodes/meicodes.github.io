var map, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 18
    });

    marker = new google.maps.Marker;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getLocation() {
    // check if geolocation api is enabled
    if ("geolocation" in navigator) {
        // geolocation is available

        // get location from user
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            marker.setPosition(pos);
            marker.setMap(map);
            map.setCenter(pos);

            console.log(`Your location is lon: ${pos.lng} and lat: ${pos.lat}.`);

            getWeather(pos.lat, pos.lng);


        });

    } else {
        // geolocation IS NOT available
        console.log("not available");
    }
}


function getDate() {
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var numDate = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wedenesday", "Thursday", "Friday", "Saturday"];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (hour > 12) {
        hour -= 12;
        time = 'pm';
    } else {
        time = 'am';
    }

    if (minute < 10) {
        minute = '0' + minute;
    }

    $("#geoloc").append(`${monthNames[month]} ${numDate} - ${hour}:${minute}${time} - `);
}

function getWeather(lat, lon) {
    var noResponse = ["nah, you're good!", "nope! have a nice day!", "negative. leave the umbrella at home."];
    var yesResponse = ["yep.", "yeah.", "better bring an umbrella!"]
    var laterResponse = ["not right now. but it might 👀", "no, but it's coming."];
    var apiKey = "ec2ae657cf8282becb2d48fc4b8bbc27";
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey + "&units=imperial";
    var icons = new Map();

    icons.set("Rain", "rain");
    icons.set("Clouds", "cloudy");
    icons.set("Clear", "day-sunny");
    icons.set("Snow", "snow");
    icons.set("Drizzle", "showers");
    icons.set("Thunderstorm", "thunderstorm");
    icons.set("Mist", "dust");
    icons.set("Haze", "dust");


    // fetch json data
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        // Work with JSON data here
        var condition = data["weather"][0]["main"];
        var high = data["main"]["temp_max"];
        var low = data["main"]["temp_min"];
        var location = data["name"] + ", " + data["sys"]["country"];
        var currTemp = data["main"]["temp"];

        if (condition === "Rain") {
            // rain stuff
            $("#rain-response").append(yesResponse[getRandomInt(yesResponse.length)]);
        } else {
            // not rain stuff
            $("#rain-response").append(noResponse[getRandomInt(noResponse.length)]);
        }

        $("#rain-icon").append(`<i class="wi wi-${icons.get(condition)}"></i>`);
        $("#rain-cond").append(`<b>${condition}</b> with a high of <span>${high}F</span> and a low of <span>${low}F</span>.`);
        $("#current-temp").append(`Currently ${currTemp}F`)
        $("#geoloc").append(location);


        console.log(condition);
    }).catch(err => {
        // Do something for an error here
        console.log("there was a problem.");
    });

}


$(document).ready(function() {
    getDate();


    $("#raining-button").click(function() {
        getLocation();
    });

});