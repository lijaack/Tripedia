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

//   var destionationsRef = dbRef.ref('destinations');

$("#xxxxxxxxxx").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    $("#error-text").text("");

    // Get the input values
    var zzzzzzz = $("#yyyyyyy").val().trim();

    // control if the input fields are empties
    if (zzzz === "") {
        $("#error-text").text("<--- All fields are mandatory, please complete the form --->");
        return;
    }
   

    database.ref().push({
        cityorigin: cityorigin,
        citydestination: citydestination,
        counter: counter,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().on("child_added", function (snapshot) {

    var zzzzzz = snapshot.val().zzzzzzzz;
    

 

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});