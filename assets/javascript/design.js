var from = "";
var to = "";
var fromDate = "";
var toDate = "";
clearSearch();

$(document).on("click", "#run-submit", function () {
    event.preventDefault();
    clearSearch();
    showContainers();
    from = $("#fromCity").val();
    to = $("#toDestination").val();
    fromDate = $("#startDate").val();
    toDate = $("#endDate").val();

    addPlaceImage();
    addGoogleMaps();


});


function clearSearch() {
    $("#imagePlace").text("");
    $(".main-page").hide();
    $(".footer").hide();

    $("#modalFlightTitle").text("");
    $("#modal-flight-body").text("");

    $("#modalYelpTitle").text("");
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
    console.log("Query" + queryURL);

    // Call pixaBay
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("==============================================================================")
        console.log(response);
        console.log(response.hits[0].userImageURL);
        $("#imagePlace").append(
            "<img src=" + response.hits[0].previewURL + " width='150px' height='150px' class='rounded-circle mx-auto d-block'>");
    });

}

