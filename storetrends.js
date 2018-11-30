// Initialize Firebase
var config = {
    apiKey: "AIzaSyAWdm6nqRzZeo-KiV3kAg7DrZrI_raQJ4s",
    authDomain: "destinationscities.firebaseapp.com",
    databaseURL: "https://destinationscities.firebaseio.com",
    projectId: "destinationscities",
    storageBucket: "destinationscities.appspot.com",
    messagingSenderId: "64416552997"
  };
  firebase.initializeApp(config);


/// this function will update the info of the destinations search, it will be used to calculate trends (we will store destination city, counter and timestamp added and timestamp updated, just in case we want to play with trends by year, month, etc...)
$("#run-submit").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    $("#error-text").text("");

    // Get the input values
    var destination = $("#toDestination").val().trim();
    
    // control if the input fields are empties
    if (destination === "") {
        $("#error-text").text("<--- All fields are mandatory, please complete the form --->");
        return;
    }
   
    ///// database search city, get the counter add 1 to the counter and update info or create it
    /// if the city exist update the counter and the dateUpdated

    console.log("storedata");

    // var counter = firebase.database().ref(destination + '/counter');
    // starCountRef.on('value', function(snapshot) {
    //   updateStarCount(postElement, snapshot.val());
    // });

    // database.ref().push({
    //     citydestination: destination,
    //     // counter: counter + 1,
    //     counter: 1,
    //     dateAdded: firebase.database.ServerValue.TIMESTAMP,
    //     dateUpdated: firebase.database.ServerValue.TIMESTAMP
    // });


    database.ref().push({
        "cities" : { 
        city : destination,
        // counter: counter + 1,
        counter: 1,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        dateUpdated: firebase.database.ServerValue.TIMESTAMP
        }
    });

    

});


function updatetrends() {
  /// this function will update the top trends destination of the year 
  /// it will get all the city from the DB sortedby counter and it will send to the box the top 10

    // i think we can read orderby and limit to 10 the results (pending)
    $("#listSearches").append("<li class='list-group-item'>" + destination + "</li>")
 };



//  dataRef.ref().orderBy("counter").limitToLast(5).on("child_added", function(snapshot) {
//     console.log("hello");
//     console.log(snapshot.val())
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);

