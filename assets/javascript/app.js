
// 1.select a vacation (ex. beach, snow, city, forest)
// 2. show recommended cities for that vacation type and things to do
// 3. select a city
// 4. return lowest flight prices for that city







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






