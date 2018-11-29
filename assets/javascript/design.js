$(document).on("click", "#run-submit", function () {
    event.preventDefault();

var from = $("#fromCity").val();
var to = $("#toDestination").val();
var fromDate =$("#startDate").val();
var toDate =$("#endDate").val();


console.log("from: " + from);
console.log("from: " + to);
console.log("from: " + fromDate);
console.log("from: " + toDate);
});