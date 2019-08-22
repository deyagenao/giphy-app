// GLOBAL VARIABLES
//=================================================================================================
// button array with the intial gif buttons, before user input
var topics = ["dog", "turtle", "bear", "seal", "monkey", "panda", "deer"];

// FUNCTIONS DEFINITIONS AND CALLS
//=================================================================================================

// Fucntion for displaying initial buttons
function displayButtons() {
  for (var i = 0; i < topics.length; i++) {
    var gifButton = $("<button>");
    gifButton.text(topics[i]);
    gifButton.addClass("gif-button btn btn-info m-1");
    gifButton.attr("data-name", topics[i]);
    $("#buttons-display").append(gifButton);
  }
}
// Display the pre-determined buttons
displayButtons();

// Add new input values to the basicButtons array
// Attach event handler to the "Submit new button" Button
$("#add-new-button").on("click", function(event) {
  // prevent the submit button from completing the default actions
  event.preventDefault();
  // assigning the input text for the new button to a variable
  var makeNewButton = $("#new-button-text").val().trim();
  // adding the new button text to
  topics.push(makeNewButton);
  // Create and display buttons generated from the array
  // Clear any buttons that were already on the page, so there are no duplicate buttons
  $("#buttons-display").empty();
  // Call the display buttons functions to show all the new buttons
  displayButtons();
});

// Attaching event handlers to each GIF button
$(document.body).on("click", ".gif-button", function(event) {
  // variables for the gif request:
  // variable for search query, the button name
  var query = $(this).attr("data-name");
  //variable for the query URL
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    query +
    "&api_key=qWRmjDa2NDhCJwbdmkBCuAQPyVXwYpso&limit=10";

  // Make the AJAX request to the Giphy API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // when the AJAX request is completed, the following will happen
    .then(function(response) {
        // logging the data to examine at the response object
        console.log(response);
        // assigning the gif results to a variable 
        var results = response.data;
        // Clear any GIFs already being displayed
        // running a for loop to receive information for each gif object received 
        for (var i=0; i < response.data.length; i ++) {
            // create a new div to hold each gif and its rating 
            var gifDiv = $("<div>");
            // create a p-tag for the rating of each image and set its text to that rating
            var gifRating = $("<p>").text("Rating: " + response.data[i].rating);
            // append the rating to the gifDiv
            gifDiv.append(gifRating);
            // create an image for each gif 
            var gifImage = $("<img>"); 
            // give each image an attribute equal to the still image of the gif 
            gifImage.attr("src", response.data[i].images.fixed_height_still.url);
            // give each image a data attribute set to still 
            gifImage.attr("data-state", "still");
            // give each image a data-still attribute with the link to the still image of the gif 
            gifImage.attr("data-still", response.data[i].images.fixed_height_still.url);
            // give each image a data-animate attribute with the link to the animated version of the gif 
            gifImage.attr("data-animate", response.data[i].images.fixed_height.url);
            // add a class to the image so that the image can be clicked 
            gifImage.addClass("gif-image");
            // append the gifImage to the gifDiv
            gifDiv.append(gifImage);
            // append each gifDiv to the div already existing on the page to display the gif 
            $("#gifs-display").append(gifDiv);
        } 
    });
});

// Attaching event handlers to each GIF
$(document.body).on("click", ".gif-image", function(){
    // check the state of the gif to see if the gif is still or animated 
    var state = $(this).attr("data-state");
    // if the data-state is still, then change the image to the animated version and the data state to animated
    if (state === "still") {
        // change the source of the image to the animated version 
        $(this).attr("src", $(this).attr("data-animate"));
        // change the data state to animate 
        $(this).attr("data-state", "animate");
    } else {
        // change the source of the image to the still version
        $(this).attr("src", $(this).attr("data-still"));
        // change the data state to still
        $(this).attr("data-state", "still");
    }
})

