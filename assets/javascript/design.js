var from = "";
var to = "";
var fromDate= "";
var toDate="";

$(document).on("click", "#run-submit", function () {
    event.preventDefault();
    clearSearch();

   from = $("#fromCity").val();
    to = $("#toDestination").val();
    fromDate = $("#startDate").val();
    toDate = $("#endDate").val();


    console.log("from: " + from);
    console.log("from: " + to);
    console.log("from: " + fromDate);
    console.log("from: " + toDate);
    var toDestination= to.concat(" ","+");
    console.log(to.length);
    var queryURL = "https://pixabay.com/api/?key=10849663-53e62b6c16040677cfacbb330&q=" + to + "&image_type=photo&per_page=3&category='places'";
    console.log("Query" + queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.hits[0].userImageURL);
        $("#imagePlace").append(
        "<img src=" + response.hits[0].previewURL + " width='150px' height='150px' class='rounded-circle mx-auto d-block'>");
    });
});


function clearSearch() {
    $("#imagePlace").text("");
    
}