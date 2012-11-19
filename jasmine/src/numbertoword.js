/**
*	A class for converting an integer to a natrual language sentence in Spanish.
*	Accepts integers from -9999 to 9999
*
* 	By Spencer Gardner (@spencergardner) (spence450@gmail.com)
*/
Number.prototype.convertNumToWord = function() {

	// Number string definitions - Espanolo!
	var ones = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
	var tens = ["diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
	var teens = ["diez", "once", "doce", "trece", "catorce", "quince"];
	var specialTeens = ["dieci", "veinti"];
	var hundreds = ["ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];
	var thousands = ["mil"];
	var specialOnes = {
		0 : "cero",
	    1 : "uno",
	    2 : "d\xF3s", // "dos" with accent
	    3 : "tr\xE9s", // "tres" with accent
	    4 : "cuatro",
	    5 : "cinco",
	    6 : "s\xE9is", // "seis" with accent
	    7 : "siete",
	    8 : "ocho",
	    9 : "nueve",
		};

    return function (language) {

    	var number = this.valueOf(); // Since this is the prototype of primitive, get the value here.
    	var sentence = ""; 			 // Sentence to return

    	/** 
    	*  Check for erroneous input. Accepts only -9999 thru 9999 integers
    	*  Throws RangeError if not correct.
    	*  Route to correct language
    	*/
    	try {
			if(number === parseInt(number) && number > -10000 && number < 10000) {

				// Route specified language to corresponding function
				switch (language) {
		            case "en": 
		            	sentence =  convertEnglishSentence(number);
		            case "no":
		            	sentence =  convertNorwegianSentence(number);
		            case "es":
		            	sentence =  convertSpanishSentence(number);
		            default:
		            	sentence =  convertSpanishSentence(number);
				}
	    	} 
	    	else { throw new RangeError(": " + number + " is not an integer between -9999 and 9999"); }
    	}
    	catch(e){ console.log(e.name + " " + e.message);}


    	sentence = sentence.replace(/(^\s+|\s+$)/g, ''); // Remove start and end spaces
    	return sentence;
    }; 

    /**
    *  Takes number, strips negative sign, and routes it to appropriate function to 
    *  start being converted to a string based on it's size.
    *  Example: if number == 533, number will be routed to "convertHundreds"
    */
    function convertSpanishSentence(number) {

    	var sentence = "";
    	var negOrPos = number < 0 ? sentence += "menos " : ""; // String containing integer sign (negative or positive)

    	// Remove negative sign off front of number, if negative.
    	if(negOrPos){number = -number;}

    	/** 
    	*  Convert number to string, and reverse it for easier processing.
    	*  (note: this will make for easier processing of numbers > 4 digits)
    	*/
    	var numberString = "" + number;
    	numberString = numberString.split("").reverse().join("");

  		var numDigits = numberString.length;


  		var thousandsInt = parseInt(numberString[3]); // Thousands digit
  		var hundredsInt = parseInt(numberString[2]);  // Hundreds digit 
  		var tensInt = parseInt(numberString[1]);	  // Tens digit
  		var onesInt = parseInt(numberString[0]);	  // Ones digit

  		/**
  		* Route to correct function based on number of digits in original number.
		* (note: can be added to for more digits if desired)
  		*/
  		switch (numDigits) {
  			case 4: 
            	return convertFourdigits();
            case 3:
            	return convertThreeDigits();
            case 2:
            	return convertTwoDigits();
            case 1:
            	return convertOneDigit();
            default:
            	return "Could not convert - error";
		}

		/**
		*  The convert[#]digits functions jump down a function for each decimal place
		*  As each function is called, the variable "sentence" is built to prepare to return
		*/
		function convertFourdigits() {
	    	if(thousandsInt > 1)
	    		sentence += digitToString(thousandsInt) + " mil ";
	    	else {
	    		sentence += "mil ";
	    	}

	    	return convertThreeDigits();
	    }

	    function convertThreeDigits() {
	    	if(hundredsInt > 0)
	    		sentence += hundreds[hundredsInt - 1] + " ";

	    	return convertTwoDigits();
	    }

	    function convertTwoDigits() {
	    	var lastTwoDigits = "" + numberString[1] + numberString[0];
	    	var lastTwoInt = parseInt(lastTwoDigits);

	    	/**
			*  Special cases:
			*  Last two digits < 10
			*  				   >=10, <=15
			*/
	    	if(lastTwoInt < 10) {
	    		return convertOneDigit();
	    	}
	    	else if(lastTwoInt >= 10 && lastTwoInt <= 15) {
	    		return sentence += teens[lastTwoInt - 10];
	    	}
	    	else if(lastTwoInt >= 16 && lastTwoInt <= 19) {
	    		return sentence += specialTeens[0] + digitToString(lastTwoDigits[1], true); // Add accents
	    	}
	    	else if(lastTwoInt == 20) {
	    		sentence += tens[1];
	    		return sentence;
	    	}
	    	else if(lastTwoInt == 30) {
	    		sentence += tens[2];
	    		return sentence;
	    	}
	    	else if(lastTwoInt >= 21 && lastTwoInt <= 29) {
	    		return sentence += specialTeens[1] + digitToString(lastTwoDigits[1], true); // Add accents
	    	}
	    	else
	    	{
	    		sentence += tens[tensInt - 1];
	    	}

	    	sentence += " ";
	    	return convertOneDigit();
	    }

	    function convertOneDigit() {
	    	if(numDigits == 1)
	    	{
	    		sentence += ones[onesInt];
	    		return sentence;
	    	}
	    	else if(tensInt == 0 && onesInt > 0) {
	    		sentence += digitToString(onesInt, false); // Leave accents off
	    	}
	    	else if(onesInt > 0) {
	    		sentence += "y " + digitToString(onesInt, false); // Leave accents off
	    	}

	    	return sentence; // Return completed sentnece
	    }

	    // Converts integer to string equivalent, WITH or WITHOUT accents
	    function digitToString(number, accents) {
	    	if(accents)
	    		return specialOnes[number];
	    	return ones[number];
	    }
};

	// Placeholder for English Conversion
    function convertEnglishSetence(number) {
    	return "English Sentence";
    }

    // Placeholder for Norwegian Conversion
    function convertNorwegianSentence(number) {
    	return "Norwegian Sentence";
    }

}();