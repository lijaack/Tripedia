//Paul adding API for yelp search

console.log("testing js file")

$(document).ready(function () {

    // Eliminate CORS issues
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    $(".yelp").on("submit", function () {
        event.preventDefault()


        var location = $("#location").val()

        $.ajax({
            url: 'https://api.yelp.com/v3/businesses/search?term=activities' + '&location=' + location + '',
            method: "GET",
            // Below with yelp API Key
            headers: {
                authorization: "Bearer 8ldJWpM7u31LuDTTQXmQZ7pJb8PGvrEzgMWXOYN8EXy6C7tEY59Cdd-9EpslvK0K8jg2hLLW7GCWEGQpmdcy0ry4LLc6dKaG739eZGCCWWvUW4Szt7HpOeG7BvH-W3Yx"
            }
        }).then(function (response) {
            console.log(response)

            //  this returns 3 results to the main page
            for (var i = 0; i < 3; i++) {
                $(".container").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
            }
            // this returns all results to the modal page
            for (var i = 0; i < response.businesses.length; i++) {
                $(".modal-body").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
            }

        });
        // =========================================================

    });
});







//
//================================================================Jack's AJAX for flight prices + location information==================================================
//

// need to get API to convert "City name" to IATA code

// var cityName = cityInput from html doc
//     for (var i = 0; i < cityName.length; i++){
//         if (cityName[i] === " "){
//             cityName[i] = "%20"
//         }
//     }


// var iataURL = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&term="+ cityName;

var iataURL = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&term=san%20francisco"

// var flightURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&origin=" + originCity + "&destination=" + destinationIATA + "&departure_date=" +departureDATE + "&return_date=2018-12-25";

var flightURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&origin=SFO&destination=NYC&departure_date=2018-12-25&return_date=2018-12-25";
var locationInfoURL = "https://api.sandbox.amadeus.com/v1.2/location/NYC/?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7"

$.ajax({
    url: iataURL,
    method: "GET",
}).then(function(response) {
    console.log(response)
    console.log(response[0].value)
});


$.ajax({
    url: flightURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
});

$.ajax({
    url: locationInfoURL,
    method: "GET"
}).then(function(response) {
    console.log(response)
});






