/**
*  Tests compiled by Spencer Gardner (@spencergardner) (spence450@gmail.com)
*  Using Jasmine Unit Testing Framework (https://github.com/pivotal/jasmine)
*/

// Unit testing for returning correct numbers from convertNumToWord function in Number prototype
describe("Numbers Return Correctly", function() {
	    it("Returns Correct String Based On Integer Input", function() {
	    	for(var test in tests) {
		    	var number = parseInt(test);
		        expect(number.convertNumToWord("es")).toEqual(tests[test]);
		    }
	    });
	
});

// Tests to run through Jasmine Framework
var tests = {
	/**
	* Tests for 0-31.
	* Tests accent marks, "dieci-" and veinti-" and "veinte", "treinta"
	* Tests teens 
	*/
	0 : "cero",
    1 : "uno",
    2 : "dos", 
    3 : "tres", 
    4 : "cuatro",
    5 : "cinco",
    6 : "seis", 
    7 : "siete",
    8 : "ocho",
    9 : "nueve",
    10 : "diez",
    11 : "once",
    12 : "doce",
    13 : "trece",
    14 : "catorce",
    15 : "quince",
    16 : "diecis\xE9is",
    17 : "diecisiete",
    18 : "dieciocho",
    19 : "diecinueve",
    20 : "veinte",
    21 : "veintiuno",
    22 : "veintid\xF3s",
    23 : "veintitr\xE9s",
    24 : "veinticuatro",
    25 : "veinticinco",
    26 : "veintis\xE9is",
    27 : "veintisiete",
    28 : "veintiocho",
    29 : "veintinueve",
    30 : "treinta",
    31 : "treinta y uno",

	/**
	* Tests three digits
	* Tests tens and zeroes digits
	* 
	*/
	100 : "ciento",
    101 : "ciento uno",
    121 : "ciento veintiuno",
    200 : "doscientos",
    300 : "trescientos",
    400 : "cuatrocientos",
    500 : "quinientos",
    600 : "seiscientos",
    700 : "setecientos",
    800 : "ochocientos",
    900 : "novecientos",


   /**
	* Tests three digits
	* Tests 4, 3, 2, 1st digits
	* Tests negatives
	* Tests negative 0
	*/
	1000 : "mil",
	1900 : "mil novecientos",
	1920 : "mil novecientos veinte",
	1923 : "mil novecientos veintitr\xE9s",
	4321 : "cuatro mil trescientos veintiuno",
	"-1000" : "menos mil",
	"-1900" : "menos mil novecientos",
	"-1920" : "menos mil novecientos veinte",
	"-1923" : "menos mil novecientos veintitr\xE9s",
	"-4321" : "menos cuatro mil trescientos veintiuno",
	"-0"    : "cero"


};
