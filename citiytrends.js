// Initialize Firebase
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

$(document).on("click", "#run-submit", function () {
    event.preventDefault();
  
    destinationSearch = $("#toDestination").val();

    // Test for the existence of certain keys within a DataSnapshot
    var refcity = firebase.database().ref("destinations/" + destinationSearch);

    refcity.once("value")
    .then(function(snapcity) {
        console.log(snapcity.val());
        var cityExist = snapcity.exists(); 
        console.log("cityExist: " + cityExist);

        if (cityExist) {
                console.log("updating")
                console.log(snapcity.val());
                var counterIA = snapcity.val().counter;
                console.log("counterIA: " + counterIA);
                var newCount = counterIA + 1;
                console.log("ths is the new count " + newCount);
                refcity.update({
                    counter: newCount,
                    counterSort: newCount * -1,
                    dateUpdated: firebase.database.ServerValue.TIMESTAMP
                });     
        }
        else {
            refcity.set({
                counter: 1,
                counterSort: -1,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
         }
        });
    });
   

    loadInfo();

function loadInfo(snapshot) {

    database.ref("destinations").orderByChild("counterSort").limitToFirst(10).on('value', function (snapshot) {
        //Clean Destination Display
        $(".destinations").remove();

        console.log("loading");
        console.log(snapshot.val());
        snapshot.forEach(function (child) {

            $("#listSearches").append("<tr class='destinations'><td>" + child.key + " : " + child.val().counter + "</td></tr>");

        });
    });
}
