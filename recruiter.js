'use strict';

// Object containing starting wages for various 4 year degrees
var degreeSWage = require('./degreeSWage.json');
// File containing some of our utility functions (already written)
var util = require('./util.js');

//TODO: You need to write this function AND utilize it.
// bracketFromGPA(decimal GPA);
function bracketFromGPA(gpa) {
	// 4-3.5, 3.49 - 3.0, 2.99 - 2.5
	var result;
	if(gpa >= 3.5 && gpa <= 4.0){
		result = 3;
	}
	else if(gpa >= 3.0 && gpa <=3.49){
		result = 2
	}
	else if(gpa >=2.5 && gpa <= 2.99){
		result = 1;
	}
	else{
		result = 0;
	}
	return result; //some form of bracket number
}

// TODO: recruiter( Array of hireables )
function recruiter(internArr) {

	// Below is just to help show the syntax you need,
	// you'll need to process ALL of the hireables like this one and sort
	var index = 0;
	var iname;
	var idegr;
	var igpa;
	var iexp;
	var iwage, ivalue, ibracket, imetric;

	for(index; index < internArr.length; index++){
		iname = internArr[index].name;
		idegr = internArr[index].degree;
		igpa = internArr[index].gpa;
		iexp = internArr[index].experiance;

		// Yep, you can use strings as an "index" (technically it's a property) in JavaScript
		idegr = idegr.toLowerCase();
		iwage = degreeSWage[idegr];

		// You should use these functions at some point
		ivalue = util.getValueFromWageAndExp( iwage, iexp /*wage, full years of experiance*/ );
		ibracket = bracketFromGPA ( igpa /*decimal GPA*/ );

		// Hmm... this doesn't seem to follow the spec - fix it
		imetric = (ivalue + ibracket)*10 + ibracket;

		// We really want to add our sorting number "metric" to objects (it really is this easy)
		internArr[index].metric = imetric;
		if(ibracket == 0 && idegr!= "astrology" ){
			internArr.splice(index, 1);
			index--;
		}
		if(typeof iwage == 'undefined'){
			internArr.splice(index, 1);
			index--;
		}
	}
	
	for(index = 0; index < internArr.length; index++){
	}
	// and then sort them all (it doesn't return anything, it modifies the array sent)
	util.sortInternObjects(internArr); /*Array of hireables with "metric" as a property*/ 
	for(index = 0; index < internArr.length; index++){
		iname = internArr[index].name;
		idegr = internArr[index].degree;
		igpa = internArr[index].gpa;
		iexp = internArr[index].experiance;

		// Yep, you can use strings as an "index" (technically it's a property) in JavaScript
		idegr = idegr.toLowerCase();
		iwage = degreeSWage[idegr];

		// You should use these functions at some point
		ivalue = util.getValueFromWageAndExp( iwage, iexp /*wage, full years of experiance*/ );
		ibracket = bracketFromGPA ( igpa /*decimal GPA*/ );

		// Hmm... this doesn't seem to follow the spec - fix it
		imetric = (ivalue + ibracket)*10 + ibracket;

		// We really want to add our sorting number "metric" to objects (it really is this easy)
		internArr[index].metric = imetric;
		if( idegr == "astrology"){
			internArr.push(internArr.splice(index, 1)[0]);
		}
	}

	// Output 
	// An array of HIREABLE 'intern objects' (in order of most valueable to least valueable)
	// with at least the properties "name", "metric", "degree"
	// You can come up with any number you want for "metric" as long as it corresponds to the spec
	// and people earlier in the array have equal or greater values for "metric" than
	// people further down.
	for(index = 0 ; index < internArr.length; index++){
		iname = internArr[index].name;
		idegr = internArr[index].degree;
		igpa = internArr[index].gpa;
		iexp = internArr[index].experiance;

		// Yep, you can use strings as an "index" (technically it's a property) in JavaScript
		idegr = idegr.toLowerCase();

		ivalue = util.getValueFromWageAndExp( iwage, iexp /*wage, full years of experiance*/ );
		ibracket = bracketFromGPA ( igpa /*decimal GPA*/ );

		// computer metric for each object
		imetric = (ivalue + ibracket)*10 + ibracket;

		internArr[index].metric = imetric;
		console.log("Name: ", iname, " Metric: " , imetric, "Value: ", ivalue, "Bracket: ", ibracket,"Degree: ",idegr, "GPA: " , igpa);
	}

	return internArr;
};

module.exports = {
	recruiter: recruiter,
	bracketFromGPA: bracketFromGPA
};
