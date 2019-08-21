// GLOBAL VARIABLES 
//=================================================================================================
// button array with the intial gif buttons, before user input 
var basicButtons = ["dog", "turtle", "bear", "seal", "monkey", "panda", "deer"]


// FUNCTIONS DEFINITIONS AND CALLS
//=================================================================================================

// Fucntion for displaying initial buttons 
function displayButtons() {
    for (var i=0; i < basicButtons.length; i++){
        var gifButton = $("<button>");
        gifButton.text(basicButtons[i]);
        gifButton.addClass("gif-button btn btn-info m-1");
        gifButton.attr("data-name", basicButtons[i]);
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
    basicButtons.push(makeNewButton);
    // Create and display buttons generated from the array 
    // Clear any buttons that were already on the page, so there are no duplicate buttons 
    $("#buttons-display").empty()
    // Call the display buttons functions to show all the new buttons 
    displayButtons();
});


// Attaching event handlers to each GIF button
$(document.body).on("click", ".gif-button", function(event){
    // variables for the gif request:
    // var queryURL = 


    // Make the AJAX request to the Giphy API 
    // Clear any GIFs already being displayed 
    // Display still versions of the GIF
});

// Attaching event handlers to each GIF
// When still version of the GIF is clicked, becomes animated 
// When animated version of the GIF is clicked, becomes still 