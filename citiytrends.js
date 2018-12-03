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
    });
   

loadInfo();

function loadInfo(snapshot) {

    database.ref("destinations").orderByChild("counterSort").limitToFirst(10).on('value', function (snapshot) {
        //Clean Destination Display
        $(".destinations").remove();

        snapshot.forEach(function (child) {

            $("#listSearches").append("<tr class='destinations'><td>" + child.val().cityNameDisplay + " : " + child.val().counter + "</td></tr>");

        });
    });
}
