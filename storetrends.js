  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBEG-CsDkKsZh3owyJ5IK5JnrK4DcABQvk",
    authDomain: "project-1-24d28.firebaseapp.com",
    databaseURL: "https://project-1-24d28.firebaseio.com",
    projectId: "project-1-24d28",
    storageBucket: "project-1-24d28.appspot.com",
    messagingSenderId: "1025416862910"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


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
    database.ref().push({
        citydestination: destination,
        counter: counter + 1,
        dateAdded: firebase.database.ServerValue.TIMESTAMP,
        dateUpdated: firebase.database.ServerValue.TIMESTAMP
    });

});


function updatetrends() {
  /// this function wwill update the top trends destination of the year 
  /// it will get all the city from the DB sortedby counter and it will send to the box the top 10

    // i think we can read orderby and limit to 10 the results (pending)

 };



