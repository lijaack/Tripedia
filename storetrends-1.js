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
var databaseHandler = database.ref();

var destinationSearch = "";
var count = 1;

//Operation var to handle states of loading, inserting or updating
var operation = "loading";
var newPost = "";

$(document).on("click", "#run-submit", function () {
    event.preventDefault();
    operation = "inserting";

    destinationSearch = $("#toDestination").val();

    //Iterate on the full records of the database
    for (var key in newPost) {
        var obj = newPost[key];
        //if there is a match with the search and the database just increase counter and update
        if (obj["destination"].trim() === destinationSearch.trim()) {
            var newCount = obj["count"] + 1;
            databaseHandler.child(key).child("count").set(newCount);
            databaseHandler.child(key).child("countSort").set(newCount * -1);
            operation = "updating";

        } else if ((obj["destination"].trim() != destinationSearch.trim()) && operation === "inserting") {
            // Code for handling the insert
            operation = "inserting";
            count = 1;

        }
    }

    //  loadInfo();

    if (operation === "inserting") {
        // databaseHandler.child().setValue(count);
       
        databaseHandler.push({
            destination: destinationSearch,
            count: count,
            countSort: count * -1,
            dateAdded: firebase.database.ServerValue.TIMESTAMP

        });

        operation = "loading";
    }

});

loadInfo();

function loadInfo(snapshot) {
    database.ref().orderByChild("countSort").on('value', function (snapshot) {
        //Clean Destination Display
        $(".destinations").remove();
        // we need the snapshot of the database for read on onClick
        newPost = snapshot.val();

        //New Object to insert sorted values
        var newObject = {};

        //To read the Order By we need to read the snapshot directly-- It return the order by count desc.. 
        // Since is desc we need to create an object and reverse the retun of the values.
        snapshot.forEach(function (child) {

            var obj = child.val();
            // Create an object with name of the destination as the key and count as the value 
            newObject[obj["destination"]] = obj["count"];

        });

        // Reverse the Object to sort asc
        var resultsReversed = newObject;


        var display = 0;
        // Iterate throug the object and display Top 10
        for (var key in resultsReversed) {
            if (display <= 10) {
                console.log("New Key:" + key + "New Value: " + resultsReversed[key]);
                $("#listSearches").append("<tr class='destinations'><td>" + key + "</td></tr>");
            } else {
                break;
            }
            display++
        }


        // VA: Leave this Just in case we need to get Back to the previus way to read the object from the database 
        // for (var key in newPost) {

        //   var obj = newPost[key];
        // if (display <= 10) {
        //   $(".results").append("<tr class='destinations'><td>" + obj["destination"] + "</td>" + "<td>" + obj["count"] + "</td></tr>");

        //} else {
        //   break;
        // }
        // display++
        // }
    });
}

// //Function to reverse the object
// function reverseObject(object) {
//     var newObject = {};
//     var keys = [];
//     for (var key in object) {
//         keys.push(key);
//         console.log("Reverse Key:" + key);
//     }
//     for (var i = keys.length - 1; i >= 0; i--) {

//         var value = object[keys[i]];
//         newObject[keys[i]] = value;
//         console.log("Reverse Value:" + value);
//     }



//     return newObject;
// }