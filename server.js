var express 	= require('express');
var body-parser = require('body-parser');
var path 		= require('path');

// Determine the user's most compatible friend using the following 
// as a guide:

// Convert each user's results into a simple array of numbers 
// (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]).



// With that done, compare the difference between current user's 
// scores against those from other users, question by question. 
// Add up the differences to calculate the totalDifference.
// Example:
// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
// Total Difference: 2 + 1 + 2 = 5
// Remember to use the absolute value of the differences. 
// Put another way: no negative solutions! Your app should 
// calculate both 5-3 and 3-5 as 2, and so on.
// The closest match will be the user with the least amount of 
// difference.



// Once you've found the current user's most compatible friend, 
// display the result as a modal pop-up.

// The modal should display both the name and picture of the 
// closest match.

// Chosen CSS
var config = {
  '.chosen-select'           : {},
  '.chosen-select-deselect'  : {allow_single_deselect:true},
  '.chosen-select-no-single' : {disable_search_threshold:10},
  '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
  '.chosen-select-width'     : {width:"95%"}
}
for (var selector in config) {
  $(selector).chosen(config[selector]);
}

// Capture the form inputs 
$("#submit").on("click", function(){

	// Form validation
	function validateForm() {
	  var isValid = true;
	  $('.form-control').each(function() {
	    if ( $(this).val() === '' )
	        isValid = false;
	  });

	  $('.chosen-select').each(function() {

	  	if( $(this).val() === "")
	  		isValid = false
	  })
	  return isValid;
	}

	// If all required fields are filled
	if (validateForm() == true)
	{
		// Create an object for the user's data
    	var userData = {
    		name: $("#name").val(),
    		photo: $("#photo").val(),
    		scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), ]
    	}


    	// Grab the URL of the website
    	var currentURL = window.location.origin;

    	// AJAX post the data to the friends API. 
    	$.post(currentURL + "/api/friends", userData, function(data){

    		// Grab the result from the AJAX post so that the best match's name and photo are displayed.
    		$("#matchName").text(data.name);
    		$('#matchImg').attr("src", data.photo);

	    	// Show the modal with the best match 
	    	$("#resultsModal").modal('toggle');

    	});
	}
	else
	{
		alert("Please fill out all fields before submitting!");
	}
	
	return false;
});