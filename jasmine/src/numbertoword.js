/**
*  This is the "spec" version of convertNumToWord used for unit testing.
*/



/**
*	A class for converting an integer to a natrual language sentence in Spanish.
*	Accepts integers from -9999 to 9999
*
* 	By Spencer Gardner (@spencergardner) (spence450@gmail.com)
*/
Number.prototype.convertNumToWord = function()
{
	// Number definitions
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

	// Main function to take language input and 
    return function (language) {
    	var number = this.valueOf();
    	var sentence = "";

    	/** 
    	*  Check for erroneous input. Accepts only -9999 thru 9999 integers
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


    	// Remove start+end spaces
    	sentence = sentence.replace(/(^\s+|\s+$)/g, '');
    	return sentence;
    }; 

    /**
    *  Takes number, strips negative sign, and routes it to appropriate function to 
    *  start being converted to a string based on it's size.
    *  Example: if number == 533, number will be routed to "convertHundreds"
    */
    function convertSpanishSentence(number) {

    	var sentence = "";

    	// String containing integer sign (negative or positive)
    	var negOrPos = number < 0 ? sentence += "menos " : "";

    	// Remove negative sign off front of number, if negative.
    	if(negOrPos){number = -number;}

    	/** 
    	*  Convert number to string, and reverse it for easier processing.
    	*  (note: this will make for easier processing of numbers > 4 digits)
    	*/
    	var numberString = "" + number;
    	numberString = numberString.split("").reverse().join("");

  		var numDigits = numberString.length;

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
		*  The next four convert[#]digits functions will jump down the next one to compute each
		*  decimal place.
		*/
		function convertFourdigits() {
	    	var thousandsInt = parseInt(numberString[3]);
	    	if(thousandsInt > 1)
	    		sentence += digitToString(thousandsInt) + " mil ";
	    	else {
	    		sentence += "mil ";
	    	}

	    	return convertThreeDigits();
	    }

	    function convertThreeDigits() {
	    	var hundredsInt = parseInt(numberString[2]);
	    	if(hundredsInt > 0)
	    		sentence += hundreds[hundredsInt - 1] + " ";

	    	return convertTwoDigits();
	    }

	    function convertTwoDigits() {
	    	var tensInt = parseInt(numberString[1]);
	    	var lastTwoDigits = "" + numberString[1] + numberString[0];
	    	var lastTwoInt = parseInt(lastTwoDigits);

	    	if(lastTwoInt < 10) {
	    		return convertOneDigit();
	    	}
	    	else if(lastTwoInt >= 10 && lastTwoInt <= 15) {
	    		return sentence += teens[lastTwoInt - 10];
	    	}
	    	else if(lastTwoInt >= 16 && lastTwoInt <= 19) {
	    		return sentence += specialTeens[0] + digitToString(lastTwoDigits[1], true);
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
	    		return sentence += specialTeens[1] + digitToString(lastTwoDigits[1], true);
	    	}
	    	else
	    	{
	    		sentence += tens[tensInt - 1];
	    	}

	    	sentence += " ";
	    	return convertOneDigit();
	    }

	    function convertOneDigit() {
	    	var onesInt = parseInt(numberString[0]);
	    	var tensInt = parseInt(numberString[1]);

	    	//alert(onesInt + " and " + tensInt);
	    	if(numDigits == 1)
	    	{
	    		sentence += ones[onesInt];
	    		return sentence;
	    	}
	    	else if(tensInt == 0 && onesInt > 0) {
	    		sentence += digitToString(onesInt, false);
	    	}
	    	else if(onesInt > 0) {
	    		sentence += "y " + digitToString(onesInt, false);
	    	}

	    	return sentence;
	    }

	    // Converts integer to string equivalent, with or without accents
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



// Tests
var correctNums = [
	16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, -9293, 9273, 1000, 1001, 999, 990, 909, 
]

console.log("------CORRECT NUMBERS------------");
for(var num in correctNums) {
	console.log(correctNums[num].convertNumToWord("es"));
}


