$(document).ready(function() {
	    
		// Input button click handling
	    $("button").button().click(function(){
	    	var number = $("#number-input").val();
	    	number = parseInt(number);
	    	number = number.convertNumToWord("es");

	    	var randomColor = Math.floor(Math.random()*16777215).toString(16);

	    	$("#spanish-holder").append("<span style='background-color:" + randomColor+ ";'>" + number + "</span>");

	    });


	    // "Tricksy" to have a little default text in input fields
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