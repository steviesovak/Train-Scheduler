//firebase link
var trainData = new Firebase("https://my-awesome-project-e5a5a.firebaseio.com");

//button for adding trains

$('#submitButton').on('click', function(){
	

	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTime = moment($('#timeInput').val().trim(), "HH:mm").format("");
	var frequency = $('#frequencyInput').val().trim();


	var newTrains = {
		name: trainName,
		tdestination: destination,
		tFirst: firstTime,
		tfreq: frequency,
	}

	//uploads data to the database

	trainData.push(newTrains);

	//alert that train has been added

	alert("Train has been successfully added!");

	//clears text boxes

	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#timeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

//when a new item is added (child) do this function

trainData.on("child_added", function(childSnapshot, prevChildKey){


	//variables
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firstTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;

	//convert first time (push back 1 year to make sure it comes before current time)

	var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

	//current time

	var currentTime = moment();

	// difference between the times

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	// remainder

	var tRemainder = diffTime % frequency;

	//mins til train

	var tMinutesTillTrain = frequency - tRemainder;

	//next train

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");

	//append train data to table

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});