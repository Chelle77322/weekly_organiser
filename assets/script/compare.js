$(document).ready(function () {
  //ERROR CHECKING VARIABLE
  var CheckErrors = false;
  //Declaring all the date and time variables to be used for the planner
  var week = moment().add(7, 'days');//To be used for future developments
  var month = moment().add(1, 'month');//To be used for future development
  var year = moment().format("YYYY");//To be used for future developments
  var currentTime = moment();
  //Adds either one hour or 30 minutes to the current time - This can be used in to set automatic time blocks later on
  var newTime60 = moment().add(1, 'hour');
  // commented out incase I don't get the hour to work var newTime30 = moment().add(30, 'minutes');
  var newTime30 = moment().minutes(30, 'minutes');

  //Displaying the current day and time in the header
  $('#currentDay').html("Today's date:" + "&nbsp" + currentTime.format("DD/MM/YYYY HH:mm a"));

  var icon = "./assets/images/save_button.jpeg";
  var appointmentArray = [];
  appointmentArray = JSON.parse(localStorage.getItem("appointmentArray"));

  console.log(typeof appointmentArray);
  console.log(appointmentArray);

  //console.log(currentTime.format("DD/MM/YYYY HH:mm a"));

  //Checking local storage for stored events 

  //console.log(typeof eventBookings);//returns as an object
  //console.log(localStorage.getItem("eventBookings"));
  //If there are stored events then run the following if condition to update the appointment array
  if (appointmentArray !== null) {
    appointmentArray = appointmentArray;
  } else {
    appointmentArray[0] ;

  }
  //console.log("Here's the stored events", appointmentArray);

  //This code will look for the div with the id "organiser" and clear any data from the element
  var $weekly_organiser = $('#organiser');
  // clear existing elements by using the javascript empty(); command
  $weekly_organiser.empty();
  //Constructing the for loop which will create the div rows to display schedule
  for (timeslot = 7; timeslot <= 19; timeslot++) {
    var index = timeslot - 7;
    //console.log(index);
    //console.log(timeslot);
    // Building basic row components
    var $organiser = $('<div>');
    $organiser.addClass('row');
    $organiser.addClass('organiser');
    $organiser.attr('timeslot-index', timeslot);
    //Start of Time Coding
    //Creating the html element to display the time in
    var $timeCol = $('<div>');
    $timeCol.addClass = ('col-md-2', 'timeslot');
    //console.log($timeCol);

    //Adding a span element to store the input it
    var $timeText = $('<span>');
    $timeText.attr('class', 'timeText');

    //Grabbing the hours using moment().hour and the variable timeslot as the starting point
    var showHours = 0;
    showHours = moment().hour(timeslot).format("HH:mm a");
    //Appends the timeslot column and updates the $weekly_organiser
    $timeText.text(`${showHours}`);
    //console.log(showHours);
    $timeCol.append($timeText);
    $organiser.append($timeCol);

    $weekly_organiser.append($organiser);
    //End of Time Coding

    //Start of the Schedule Code
    //Automatically creating the schedule section of the weekly_organiser. This is all the tasks will be entered and stored
    //CAUSE OF ISSUE MAY BE HERE 

    var $schedule = $('<input>');

    $schedule.attr('id', `input-${index}`);
    $schedule.attr('timeslot-index', index);
    $schedule.attr('type', 'text');
    $schedule.attr('class', 'schedule');

    console.log('timeslot-index', index);
    console.log('id', `input-${index}`);

    //Placing the information stored in the eventBooking into the value of $schedule as text
    $schedule.val(appointmentArray[index]);

    console.log($schedule.val(appointmentArray[index]));
    //Modifying the existing row div to make it wider for the schedule input
    var $width = $('<div>');
    $width.addClass('col-md-9', 'schedule');
    $organiser.append($width);
    $width.append($schedule);

    //*************************************************************** *//


    //********************************************************************* */

    //End of Schedule Code
    //Start of Save Code**************************************************
    // Automatically building the save button column and subsequent rows
    var $storeEvent = $('<div>');
    $storeEvent.addClass('col-md-2', 'saved');
    //console.log($storeEvent);

    var $saveBtn = $('<icon>');
    $saveBtn.attr('id', `eventSave-${index}`);
    $saveBtn.attr('event-Save', index);
    $saveBtn.attr('class', "far fa-save icon");

    console.log("Checking the save button", `eventSave-${index}`);


    // add col width and row component to row
    $organiser.append($storeEvent);
    $storeEvent.append($saveBtn);

    //End of Save Code

    //Calling the function checktime to see if past, present, future
    checkTime(showHours);
    $weekly_organiser.append($organiser);

  };
  //Start of Code to check past, present and future and update css style as required

  function checkTime($timeText,timeslot) {
    var timecheck;
    for (timecheck = 0; timecheck <= 20; timecheck++) {

      if ($timeText === moment().hour()) {
        $organiser.css('present');
      }
      else if ($timeText < moment().hour()) {

        $organiser.css('past');
      }
      else if ($timeText > moment().hour()) {
        $organiser.css('future');
      }
    }
    console.log("This is the timecheck" + timecheck);
  }

  //End of past , present, future code
  // Start of Local Storage Code*********************************************
  $(document).click('.icon', function (e) {
    e.preventDefault();

    //console.log("This will load previously saved events" + appointmentArray);

    var $index = $(e).attr('event-save');
    var inputEvent = '#input-' + $index;
    //console.log(inputEvent);

    var $value = $(inputEvent).val();
    appointmentArray[index] = $value;

    //More Error Checking
    //console.log($value); 
    //console.log("Doing another error check" + appointmentArray);


    //Error checking the to LocalStorage trigger
    //console.log('the value is', $value); 
    //console.log('the index is', $index);
    //console.log('the appointment array' + appointmentArray);

    //Sets the item from localStorage into the appointmentArray
    localStorage.setItem('appointmentArray', JSON.stringify(appointmentArray));
    //console.log(localStorage,'input'); 

  });
  //Change button after input has changed
  $(document).change('#input', function (e) {
    e.preventDefault();

    //Error Checking the change event
    //console.log('input');
    //console.log('id', $(this).attr('timeslot-index', index)); 
    var i = $('#input').attr('appointmentArray');
    $(`.eventSave- ${i}`);
    //i is undefined - not grabbing the value of i which is the text in 'timeslot-index
    //console.log(i);
  });


  // End of Local Storage Code 
});// End of (document).ready