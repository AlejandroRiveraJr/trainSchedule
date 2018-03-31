// Create a variable to reference the database.
var database = firebase.database();

var trainSchedule = database.ref("/trainData");

// --------------------------------------------------------------
// var
var name = "";
var destination = "";
var time = 0000;
var frequency = 00;

// --------------------------------------------------------------

// on click function
$("#submit-train").on("click", function() {
	event.preventDefault();
  // Puts var
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainTime = moment($("#train-time").val().trim(), "HH:mm").format();
  var trainFrequency = parseInt($("#frequency").val().trim());

  // holds train data
  var newTrn = {
  	name: trainName,
  	destination: trainDestination,
  	time: trainTime,
  	frequency: trainFrequency
  }

// adds train to firebase
    database.ref("/trainData").push(newTrn);

  // log train Info 
  console.log(newTrn.name);
  console.log(newTrn.destination);
  console.log(newTrn.time);
  console.log(newTrn.frequency);

  // Clears texts when adding train to sheet
  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");

  return false;

});

//adds train to the database
database.ref("/trainData").on("child_added", function(childSnapshot, prevChildKey) {

	// Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  // train time
    var timeConvertion = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(timeConvertion);

  // current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(timeConvertion), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trnRemainder = diffTime % trainFrequency;
    console.log(trnRemainder);

    // Minute Until Train
    var trnMinutesTill = trainFrequency - trnRemainder;
    console.log("MINUTES TILL TRAIN: " + trnMinutesTill);

    // Next Train
    var nextTrain = moment().add(trnMinutesTill, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  // adds user input into table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + trnMinutesTill + "</td><td>" + "" + "</td></tr>");
});