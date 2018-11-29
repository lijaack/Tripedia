//Paul adding API for yelp search

// console.log("testing js file")

// $(document).ready(function () {

//     // Eliminate CORS issues
//     jQuery.ajaxPrefilter(function (options) {
//         if (options.crossDomain && jQuery.support.cors) {
//             options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//         }
//     });

//     $(".yelp").on("submit", function () {
//         event.preventDefault()


//         var location = $("#location").val()

//         $.ajax({
//             url: 'https://api.yelp.com/v3/businesses/search?term=activities' + '&location=' + location + '',
//             method: "GET",
//             // Below with yelp API Key
//             headers: {
//                 authorization: "Bearer 8ldJWpM7u31LuDTTQXmQZ7pJb8PGvrEzgMWXOYN8EXy6C7tEY59Cdd-9EpslvK0K8jg2hLLW7GCWEGQpmdcy0ry4LLc6dKaG739eZGCCWWvUW4Szt7HpOeG7BvH-W3Yx"
//             }
//         }).then(function (response) {
//             console.log(response)

//             for (var i = 0; i < response.businesses.length; i++) {
//                 $(".container").append('<img class="thumbnail" src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
//             }

//         });

//         // =========================================================

//     });
// });







//
//================================================================Jack's AJAX for flight prices + location information==================================================
//


$("#submit").on("click", function(){
    event.preventDefault();
    var originName = $("#origin").val();
    var destinationName = $("#destination").val();
    var startDate = $("#start-date").val();
    var endDate = $("#end-date").val();
    var originIATA = "";
    var destinationIATA = "";
    var airlineCode ="";
    var airlineName ="";
    for (var i=0; originName.length > i; i++){
        if (originName[i] === " "){
            originName[i] === "%20"
        }
    };

    for (var i=0; destinationName.length > i; i++){
        if (destinationName[i] === " "){
            destinationName[i] === "%20"
        }
    };
    var originIataURL = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&term=" + originName;
    var destinationIataURL = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&term=" + destinationName;
    
    $.ajax({
        url: originIataURL, 
        method: "GET",
    }).then(function(response) {
    
        originIATA = response[0].value;
    
    }).then(function(){

        $.ajax({
            url: destinationIataURL,
            method: "GET",
        }).then(function(response) {

            destinationIATA = response[0].value;

        }).then(function(){ 

            console.log(originIATA)
            console.log(destinationIATA)
            var locationInfoURL = "https://api.sandbox.amadeus.com/v1.2/location/" + destinationIATA + "/?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7"
            var flightURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&origin=" + originIATA + "&destination=" +destinationIATA + "&departure_date=2018-12-25&return_date=2018-12-25";
    
            $.ajax({
                url: flightURL,
                method: "GET"
            }).then(function(response) {
                
                // flightInfo.append("<>")
                console.log(response)
                for (var i = 0; i < 10; i++){
                    airlineCode =  response.results[i].itineraries[0].outbound.flights[0].marketing_airline;

                    // var testURL = "https://aviation-edge.com/v2/public/airlineDatabase?key=470c64-b93ed4&codeIataAirline=" + airlineCode;

                    // $.ajax({
                    //     url: testURL,
                    //     method: "GET"
                    // }).then(function(response) {
                    //     console.log(response)
                    //     airlineName = response;
                    //     console.log("hello")
                    //     console.log(airlineName[0])
                
                    // });
                    console.log(response.results[i])
                    console.log(response.results[i].fare.price_per_adult.total_fare)
                    console.log(response.results[i].itineraries[0].inbound.flights[0].marketing_airline)
                    console.log(response.results[i].itineraries[0].outbound.flights[0].marketing_airline)
                    flightInfo.append("<h3> Airlines:" + response.results[i].itineraries[0].inbound.flights[0].marketing_airline + "</h3>" )
                    flightInfo.append("<p> Price:"+ response.results[i].fare.price_per_adult.total_fare + "</p>")
                    $("#flight-info").append(flightInfo)

                }
               

            })


        })
    
            // $.ajax({
            //     url: locationInfoURL,
            //     method: "GET"
            // }).then(function(response) {



            //     console.log(response)




            // });
    });
})  
    // append this div
    var flightInfo = $("<div>")
    


    // var testURL = "https://aviation-edge.com/v2/public/airlineDatabase?key=470c64-b93ed4&codeIataAirline=ua";



    // $.ajax({
    //     url: testURL,
    //     method: "GET"
    // }).then(function(response) {



    //     console.log(response)




    // });









