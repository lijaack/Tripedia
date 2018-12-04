$(document).ready(function () {


// Eliminate CORS issues
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

//===================================================media query====================================================================

resize();
$(window).resize(function(){
    resize();
})


function resize(){
    if($(window).width() < 930){
        
        $('.search-box-pc').children().appendTo($('.search-box'));
    }
    else{
        $('.search-box').children().appendTo($('.search-box-pc'));
    }
}  


//
//================================================================on search click function==================================================
//








$("#run-submit").on("click", function(){
    event.preventDefault();
    $("#error").empty()
    from = $("#fromCity").val();
    to = $("#toDestination").val();
    fromDate = $("#startDate").val();
    toDate = $("#endDate").val();


    var afterNow = moment().isBefore($("#startDate").val(),"YYYY-MM-DD");
    var oneYearWindow = moment().add(1, 'year');
    var beforeWindow = moment(toDate,"YYYY-MM-DD").isBefore(oneYearWindow);
    var withinYear = moment(fromDate,"YYYY-MM-DD").isBefore(oneYearWindow);
    var afterFromDate = moment(toDate,"YYYY-MM-DD").isAfter(moment(fromDate,"YYYY-MM-DD"));

    if (afterNow && beforeWindow && withinYear && to.length > 0 && from.length > 0 && afterFromDate) {
        $("#error").empty()
        clearSearch();
        showContainers();
        runFirebase()
        addPlaceImage();
        addGoogleMaps();
        flightMain();
        yelpMain()
        $("#safeInfo").html($("<div class='container text-center'><img src='assets/images/loader.gif'></img></div>"))
        
        //smooth scroll
        $('html,body').animate({scrollTop: $("#search-result").offset().top}, 'slow');

    } else  if (to.length < 1 || from.length < 1) { 
        $("#error").append($("<p class='padding-zero text-center error' style='color: red'>").html("<strong>Make sure all inputs are filled in!</strong>"));
    } else {
        $("#error").append($("<p class='padding-zero text-center' style='color: red'>").html("<strong>Make sure the dates are correct</strong>"))
    }


    
})  



//
//================================================================firebase==================================================
//
var config = {
    apiKey: "AIzaSyDmgq0UdGAZGoVOK-cQXvcOqP3zEbxVJbU",
    authDomain: "travelsummary2018.firebaseapp.com",
    databaseURL: "https://travelsummary2018.firebaseio.com",
    projectId: "travelsummary2018",
    storageBucket: "travelsummary2018.appspot.com",
    messagingSenderId: "93557345644"
    };
    
    firebase.initializeApp(config);

    
// Create a variable to reference the database.

var database = firebase.database();

function runFirebase() {
  
    destinationSearch = $("#toDestination").val();
    destinationSearchLC = destinationSearch.toLowerCase();

    // Test for the existence of certain keys within a DataSnapshot
    var refcity = firebase.database().ref("destinations/" + destinationSearchLC);

    refcity.once("value")
    .then(function(snapcity) {

        var cityExist = snapcity.exists(); 

        if (cityExist) {

                var oldCounter = snapcity.val().counter;
                var newCounter = oldCounter + 1;

                refcity.update({
                    counter: newCounter,
                    counterSort: newCounter * -1,
                    dateUpdated: firebase.database.ServerValue.TIMESTAMP
                });     
        }
        else {
            refcity.set({
                cityNameDisplay: destinationSearch,
                counter: 1,
                counterSort: -1,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
         }
        });
    };
   

loadInfo();

function loadInfo(snapshot) {

    database.ref("destinations").orderByChild("counterSort").limitToFirst(10).on('value', function (snapshot) {
        //Clean Destination Display
        $(".destinations").remove();
        var rank = 1;

        snapshot.forEach(function (child) {
           
            $("#listSearches").append("<tr class='destinations'><td>" + rank + ". " + child.val().cityNameDisplay + "</td></tr>");
            rank++
        });
    });
}




//================================================================AJAX for flight information==================================================



function flightMain(){
    //give a variable to all the values pulled
    $("#flightInfo").empty();
    $("#modal-flight-body").empty();
    
    $("#flightInfo").html($("<div class='container text-center'><img src='assets/images/loader.gif'></img></div>"))


    var originName = $("#fromCity").val();
    var destinationName = $("#toDestination").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();
    var originIATA = "";
    var destinationIATA = "";
    // var airlineCode ="";
    // var airlineName ="";

    // checks name enter for spaces and change it to %20 for the browser
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

    // enters variables in parameters
    var originIataURL = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&term=" + originName;
    var destinationIataURL = "https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&term=" + destinationName;
    

    // make ajax call-1 to get the IATA code  for the origin location 
    $.ajax({
        url: originIataURL, 
        method: "GET",
    }).then(function(response) {
    
        originIATA = response[0].value;
    
    // // make ajax call-2 to get the IATA code  for the destination location 
    }).then(function(){

        $.ajax({
            url: destinationIataURL,
            method: "GET",
        }).then(function(response) {

            destinationIATA = response[0].value;
        
    //after both IATA codes, run this function

        }).then(function(){ 


        // put IATA codes into Parameters

            var flightURL = "https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7&origin=" + originIATA + "&destination=" +destinationIATA + "&departure_date=" + startDate + "&return_date=" + endDate;

        //then grab the flight informations available using IATA codes 
            $.ajax({
                url: flightURL,
                method: "GET"
            }).then(function(response) {
                
            // after the flight information is retrieved, append the information for the cheapest airline to the DOM

                    $("#flightInfo").empty();
               
                    var flightPrice = $("<div class='row'>")
                    var flightInfo = $("<div class='row'>")
                    var departureInfo = $("<div class='col-5'>")
                    var spaceInfo = $("<div class='col-2'>")
                    var returnInfo = $("<div class='col-5'>")


                    var departureCode = response.results[0].itineraries[0].inbound.flights[0].marketing_airline
                    var returnCode = response.results[0].itineraries[0].outbound.flights[0].marketing_airline
                    var departureIMG = $("<img style='width:50%' src='https://content.airhex.com/content/logos/airlines_" + departureCode + "_150_70_r.png'></img>");
                    var returnIMG =  $("<img  style='width:50%' src='https://content.airhex.com/content/logos/airlines_" + returnCode + "_150_70_r.png'></img>");
                    var departureDuration = response.results[0].itineraries[0].inbound.duration;
                    var returnDuration = response.results[0].itineraries[0].outbound.duration;


                    flightPrice.append("<h4 class='pl-3'> Cheapest flight: $"+ response.results[0].fare.price_per_adult.total_fare + "</h4>");
                  
                    departureInfo.append("<p><strong> Departure flight</strong></p>");
                    departureInfo.append(departureIMG);
                    departureInfo.append("<p><strong>Flight duration: </strong>" + departureDuration + "</p>");
      
                    returnInfo.append("<p><strong> Return flight</strong></p>");
                    returnInfo.append(returnIMG);
                    returnInfo.append("<p><strong>Flight duration: </strong>" + returnDuration + "</p>");
                    flightInfo.append(departureInfo);
                    flightInfo.append(spaceInfo);
                    flightInfo.append(returnInfo);

                    $("#flightInfo").append(flightPrice)
                    $("#flightInfo").append(flightInfo)




            // loop through the 10 cheapest airline and append the information to the flight information modal
    
                for (var i = 0; i < 10; i++){

                    var flightPrice = $("<div class='row'>")
                    var flightInfo = $("<div class='row'>")
                    var departureInfo = $("<div class='col-5'>")
                    var spaceInfo = $("<div class='col-2'>")
                    var returnInfo = $("<div class='col-5'>")


                    var departureCode = response.results[i].itineraries[0].inbound.flights[0].marketing_airline
                    var returnCode = response.results[i].itineraries[0].outbound.flights[0].marketing_airline
                    var departureIMG = $("<img style='width:50%' src='https://content.airhex.com/content/logos/airlines_" + departureCode + "_150_70_r.png'></img>");
                    var returnIMG =  $("<img  style='width:50%' src='https://content.airhex.com/content/logos/airlines_" + returnCode + "_150_70_r.png'></img>");
                    var departureDuration = response.results[i].itineraries[0].inbound.duration;
                    var returnDuration = response.results[i].itineraries[0].outbound.duration;


                    flightPrice.append("<h4> Flight cost: $"+ response.results[i].fare.price_per_adult.total_fare + "</h4>");
                  
                    departureInfo.append("<p><strong> Departure flight</strong></p>");
                    departureInfo.append(departureIMG);
                    departureInfo.append("<p><strong>Flight duration: </strong>" + departureDuration + "</p>");
      
                    returnInfo.append("<p><strong> Return flight</strong></p>");
                    returnInfo.append(returnIMG);
                    returnInfo.append("<p><strong>Flight duration: </strong>" + returnDuration + "</p>");
                    flightInfo.append(departureInfo);
                    flightInfo.append(spaceInfo);
                    flightInfo.append(returnInfo);

                    $("#modal-flight-body").append(flightPrice)
                    $("#modal-flight-body").append(flightInfo)
                    $("#modal-flight-body").append($("<hr>"))


                }
               

            })
            var locationInfoURL = "https://api.sandbox.amadeus.com/v1.2/location/" + destinationIATA + "/?apikey=MenRvMLXx9zCjtsAkpL5X2Bt1fxrMwL7"

            $.ajax({
                url: locationInfoURL,
                method: "GET"
            }).then(function(response) {


                var countryId = response.city.country;


                countryInfo(countryId);

            });


        })
        
    });

}




//
//================================================================on click function==================================================
//


var from = "";
var to = "";
var fromDate = "";
var toDate = "";
clearSearch();



function clearSearch() {
    $("#imagePlace").text("");
    $(".main-page").hide();
    $(".footer").hide();

    $("#modal-flight-body").text("");

    $("#modal-yelp-body").text("");

    $("#modalAdvisoryTitle").text("");
    $("#modal-advisory-body").text("");

}

function showContainers() {
    $(".main-page").show();
    $(".footer").show();
}


function addGoogleMaps() {
    //Send city to google maps DOM

    $("#googleMaps").attr("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyADKWCDVEQq0fb4Hp33enBpV0jNH7Rrslg&q=record+hotels+in+" + to);
}

function addPlaceImage() {
    var queryURL = "https://pixabay.com/api/?key=10849663-53e62b6c16040677cfacbb330&q=" + to + "&image_type=photo&per_page=3&category='places'";

    // Call pixaBay
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
     
        $("#imagePlace").append(
            "<img src=" + response.hits[0].largeImageURL + "  class='city-image mx-auto d-block'>");
    });

}







//
//================================================================Yelp Information==================================================
//





    function yelpMain() {

       

        $("#yelpInfo").empty();
        $("#yelp-modal-body").empty();
        $("#yelpInfo").html($("<div class='container text-center'><img src='assets/images/loader.gif'></img></div>"));
        var location = $("#toDestination").val()

        $.ajax({
            url: 'https://api.yelp.com/v3/businesses/search?term=activities' + '&location=' + location + '',
            method: "GET",
            // Below with yelp API Key
            headers: {
                authorization: "Bearer 8ldJWpM7u31LuDTTQXmQZ7pJb8PGvrEzgMWXOYN8EXy6C7tEY59Cdd-9EpslvK0K8jg2hLLW7GCWEGQpmdcy0ry4LLc6dKaG739eZGCCWWvUW4Szt7HpOeG7BvH-W3Yx"
            }
        }).then(function (response) {
            $("#yelpInfo").empty();
          //  for (var i = 0; i < response.businesses.length; i++) {
            for (var i = 0; i < 3; i++) {

                var businessName = response.businesses[i].name;
                var businessIMG = response.businesses[i].image_url;
                var businessPhone = response.businesses[i].display_phone ;
                var businessAddress = response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code;
               
                var yelpName= $("<div class='row text-center'>")
                var yelpInfo = $("<div class='row text-center'>")
                var yelpIMG = $("<div class='col-4'>")
                var yelpContact = $("<div class='col-8'>")
                if (businessPhone.length < 4 ){
                    businessPhone = "<span class='unavailable'>unavailable</span>";
                }

                if (businessAddress.length < 4 ){
                    businessAddress = "<span class='unavailable'>unavailable</span>";
                }
                yelpName.append('<h4 class="name pl-4">' + businessName + '</h2>')
                yelpIMG.append('<img class="thumbnail yelp-img"  src="' + businessIMG + '">');
                yelpContact.append('<p class="phone"><strong>Phone number:</strong> ' + businessPhone + '</p>')
                yelpContact.append('<p class="address"><strong>Address:</strong> ' + businessAddress + '</p>')
                yelpInfo.append(yelpIMG, yelpContact)

                $("#yelpInfo").append(yelpName, yelpInfo, $("<hr>"))

                // $("#yelpInfo").append('<img class="thumbnail yelp-img"  src="' + response.businesses[i].image_url + '"/><h2 class="name">' + response.businesses[i].name + '</h2><p class="phone">' + response.businesses[i].display_phone + '</p><p class="address">' + response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code + '</p><hr>')
      
            
            
            
            }
            // for modal
            for (var i = 0; i < response.businesses.length; i++) {
                var businessName = response.businesses[i].name;
                var businessIMG = response.businesses[i].image_url;
                var businessPhone = response.businesses[i].display_phone ;
                var businessAddress = response.businesses[i].location.address1 + ', ' + response.businesses[i].location.city + ' ' + response.businesses[i].location.zip_code;
              
                if (businessPhone.length < 4 ){
                   businessPhone = "<span class='unavailable'>unavailable</span>";
               }
               if (businessAddress.length < 4 ){
                businessAddress = "<span class='unavailable'>unavailable</span>";
                }
                var yelpName= $("<div class='row text-center'>")
                var yelpInfo = $("<div class='row text-center'>")
                var yelpIMG = $("<div class='col-4'>")
                var yelpContact = $("<div class='col-8'>")
               
                yelpName.append('<h4 class="name">' + businessName + '</h2>')
                yelpIMG.append('<img class="thumbnail yelp-img"  src="' + businessIMG + '">');
                yelpContact.append('<p class="phone"><strong>Phone number:</strong> ' + businessPhone + '</p>')
                yelpContact.append('<p class="address"><strong>Address:</strong> ' + businessAddress + '</p>')
                yelpInfo.append(yelpIMG, yelpContact)

                $("#yelp-modal-body").append(yelpName, yelpInfo, $("<hr>"))            }

        });

    };
        
//
//================================================================Advisory Information==================================================
//



    function countryInfo(countryId) {


        queryURLid = "https://api.tugo.com/v1/travelsafe/countries/" + countryId;
        
        $.ajax({
            type: "GET",
            url: queryURLid,
            headers: {
                "X-Auth-API-Key": "8rd59kunmnbv8ubnpwskjhcy"
            }
        
        }).then(function (response) {           
            console.log(response);
            displayInfo(response);
        });
    }
    
    
    function displayInfo(countryInfo) {
    
       
        $("#safeInfo").empty();
        var climateInfo = countryInfo.climate.description;
        if (climateInfo === null ){
            climateInfo = "<span class='unavailable'>unavailable</span>";
        }
    
        $("#safeInfo").html("<p><strong>General:  </strong>" + countryInfo.advisories.description + "</p><p><strong>Climate:  </strong>" + climateInfo + "</p><p><strong>Health:  </strong>" + countryInfo.health.description + "</p>");
        
        
        // info for the modal //
        // modal-advisory-body
        $("#modalAdvisoryTitle").append('<i class="fas  fa-info-circle">Advisory Information </i>');
    

        $("#modal-advisory-body").append("<p><strong>Required:  </strong><p id='required'></p><p><strong>Safety:  </strong><p id='safety'></p>")

        for (i=0; i < countryInfo.entryExitRequirement.requirementInfo.length; i++) {
             $("#required").append("<strong>" + countryInfo.entryExitRequirement.requirementInfo[i].category + "</strong>-->" + countryInfo.entryExitRequirement.requirementInfo[i].description + "<br>");
         }
        for (i=0; i < countryInfo.safety.safetyInfo.length; i++) {
            $("#safety").append("<strong>" + countryInfo.safety.safetyInfo[i].category + "</strong>-->" + countryInfo.safety.safetyInfo[i].description + "<br>");
         }
    }




});



