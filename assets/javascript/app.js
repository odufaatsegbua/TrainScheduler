
// firebase config with API key
var firebaseConfig = {
    apiKey: "AIzaSyDDStSZoYXIxYmMOvmu7P3JjfhFfUZ9MYk",
    authDomain: "codersbay-87082.firebaseapp.com",
    databaseURL: "https://codersbay-87082.firebaseio.com",
    projectId: "codersbay-87082",
    storageBucket: "",
    messagingSenderId: "213389503873",
    appId: "1:213389503873:web:922f928e54516150950c80",
    measurementId: "G-VWW8NQZP5T"
  };

//   initialize firebase

 firebase.initializeApp(config);
 var database = firebase.database();
 var currentTime = moment().format();


 console.log("Current Time: " + currentTime);
 $("#add-train-btn").on("click", function () {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();
    var newTrain = {
        train: trainName,
        destination: trainDestination,
        first: firstTrain,
        frequency: trainFrequency
    };
    database.ref().push(newTrain);
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
 });
 database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;
    var firstTrainConverted = moment(firstTrain, "HH:mm");
    var timeDifference = moment().diff(moment(firstTrainConverted), "minutes");
    console.log(timeDifference);
    var frequencyMinutes = childSnapshot.val().frequency;
    console.log("Frequency Minutes: " + frequencyMinutes);
    var minutesAway = Math.abs(timeDifference % frequencyMinutes);
    console.log("Minutes Away: " + minutesAway);
    var nextArrival = moment(currentTime).add(minutesAway, "minutes").format("hh:mm A");
    console.log("Next Arrival: " + nextArrival);
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
 });