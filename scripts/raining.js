$(document).ready(function() {
    var map;
    var date = new Date();
    var day = date.getDay();
    var month = date.getMonth();
    var numDate = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var time, lat, lon, url;

    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wedenesday', 'Thursday', 'Friday', 'Saturday'];
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
    $('#date').html(dayNames[day] + ', ' + monthNames[month] + ' ' + numDate + ' ' + year + ' - ' + hour + ':' + minute + ' ' + time);

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: lat,
                lng: lon
            },
            zoom: 15
        });
    }

    function getLocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            apiKey = "ec2ae657cf8282becb2d48fc4b8bbc27";
            url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
            var request = new XMLHttpRequest();

            request.open('GET', url);
            request.responseType = 'json';
            request.send();

            request.onload = function() {
                var data = request.response;
                populateData(data);
            }

            function populateData(data) {
                var location = json['coord']['display_location']['city'] + ', ' + json['current_observation']['display_location']['state_name'];
            }





            // $.getJSON(url, function(json) {
            //     var location = json['current_observation']['display_location']['city'] + ', ' + json['current_observation']['display_location']['state_name'];
            //     var f = json['current_observation']['temp_f'];
            //     var c = json['current_observation']['temp_c'];
            //     $(".f").append('Today\'s temperature is  ' + f + '<a>°F</a>');
            //     $(".c").append('Today\'s temperature is  ' + c + '<a>°C</a>');
            //     var weather = json['current_observation']['weather'];
            //     var icon = json['current_observation']['icon_url'];
            //     $('#geoloc').append(location);
            //     $('#temp a').on('click', function() {
            //         $('.f').toggleClass('hide');
            //         $('.c').toggleClass('hide');
            //     });
            //
            //     $('#icon').append(weather);
            //     $('#icon').append('<BR> <img src="' + icon + '"/>')
            // });

        });
    }


    $("#raining-button").click(function() {
        initMap()
        getLocation();
    });

})