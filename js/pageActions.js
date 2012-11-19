/**
*  Some simple functionality to make home.html a bit more fun.
*/

$(document).ready(function() {
	    
		// Handling clicks of button
	    $("button").button().click(function(){
	    	var number = $("#number-input").val();
	    	number = parseInt(number);
	    	number = number.convertNumToWord("es");

	    	var randomColor = Math.floor(Math.random()*16777215).toString(16); // Get random color for each span's CSS

	    	$("#spanish-holder").append("<span style='background-color:" + randomColor + ";'>" + number + "</span>");

	    });


	    // Trick to put a little default text in input fields
		$(".defaultText").focus(function(srcc)
		    {
		        if ($(this).val() == $(this)[0].title)
		        {
		            $(this).removeClass("defaultTextActive");
		            $(this).val("");
		        }
		    });
		    
	    $(".defaultText").blur(function()
	    {
	        if ($(this).val() == "")
	        {
	            $(this).addClass("defaultTextActive");
	            $(this).val($(this)[0].title);
	        }
	    });
		    
	    
	    $(".defaultText").blur(); 
});