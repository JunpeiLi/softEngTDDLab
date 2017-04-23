'use strict';

var test = require('tape');
// Object containing the interns we want to evaluate
var potentialHires = require('./input/groupOne.json');
var interns = potentialHires.interns;

var recruiter = require('../recruiter.js');
var util = require('../util.js');

test('util.getValueFromWageAndExp', function(t) {
  t.ok(util.getValueFromWageAndExp(31, 1) > util.getValueFromWageAndExp(30, 1), 'factors in wage');

  if (util.getValueFromWageAndExp(30, 1) > util.getValueFromWageAndExp(30, 0)) {
  	t.pass('factors in experiance');
  } else {
  	t.fail('does not factor in experiance');
  }

  t.equal(util.getValueFromWageAndExp(34, 1.3), false, 
  	"getValueFromWageAndExp catches a partial year input and returns false");

  t.end();
});

test('util.sortInternObjects', function(t) {
	var inputArr = [interns[0], interns[1], interns[2], interns[3]];
	inputArr[0].metric = 3;
	inputArr[1].metric = 1;
	inputArr[2].metric = 2;
	inputArr[3].metric = 0;

	// Lets get the input sorted manually, in the expected array
	var expectedArr = inputArr.slice();
	expectedArr = [
		expectedArr[0], // 3
		expectedArr[2], // 2
		expectedArr[1], // 1
		expectedArr[3]  // 0
	];

	// Lets make a copy of the input to sort with the function 
	var actualArr = inputArr.slice();

	// Sort by reference (in-place)
	util.sortInternObjects(actualArr);

  t.deepEqual(actualArr, expectedArr, 'bascially sorts by metric');

  // Let's throw a wrench in it and change our metrics
  actualArr[0].metric = 0;
  inputArr[0].metric = 0;

  expectedArr = [
		inputArr[2], // 2
		inputArr[1], // 1
		inputArr[0], // 0
		inputArr[3]  // 0
	];

	util.sortInternObjects(actualArr);

	t.deepEqual(actualArr, expectedArr, 'preserves order of same-metric objects');

  t.end();
});

// Your tests go here  (methods reference: https://www.npmjs.com/package/tape#testname-opts-cb )

test('bracketFromGPA', function(t) {

  t.deepEqual( recruiter.bracketFromGPA(3.5), 3, "returns bracket three");
  t.deepEqual( recruiter.bracketFromGPA(3.4), 2, "returns bracket two");
  t.deepEqual( recruiter.bracketFromGPA(2.99), 1, "returns bracket one");
  t.deepEqual( recruiter.bracketFromGPA(2.49), 0, "returns bracket zero (unhirable)");

  t.end();
});


test('recruiter function', function(t) {

	// Don't hire people with degrees we don't recognize
	t.comment("Don't hire people with degrees we don't recognize");
	var collArr = [
		interns[0],
		interns[6],
		interns[7]
	];

	var inputArr = collArr.slice();
	inputArr[1].degree = "waffle maker";
	inputArr[2].degree = "";

	var retArr = [];
	retArr = recruiter.recruiter(inputArr);
	t.deepEqual(retArr.length, 1, "Returns expected number of interns");
	t.deepEqual(retArr[0].degree, "advertising", "Returns the accepted degree");






	// Other tests go here.


	t.comment("Always hire astrology, but only as the last resort");
	collArr = [
		interns[5],
		interns[0],
		interns[8],
	];

	inputArr = collArr.slice();
	console.log(inputArr[0].degree, interns[5].gpa);
	console.log(inputArr[1].degree, interns[0].gpa);
	console.log(inputArr[2].degree, interns[8].gpa);
	t.ok(inputArr[0].gpa === 2.14 &&
		inputArr[1].gpa == 2.82  &&
		inputArr[2].gpa == 2.81, "test input is as expected");

	inputArr[1].experiance = 0;
	inputArr[0].degree = "astrology";
	inputArr[2].experiance = 0;

	retArr = recruiter.recruiter(inputArr);
	t.deepEqual(retArr.length,3, "Returns expected number of inters, not removing astrology major");
	t.deepEqual(retArr[2].degree, "astrology", "Astrology is employed as the last resort");



	//Sort secondarily by GPA bracket
	t.comment("Sort secondarily by GPA bracket");

	collArr = [
		interns[13],
		interns[14],
		interns[15],
		interns[16]
	];

	inputArr = collArr.slice();

	inputArr[0].experiance = 0;
	inputArr[0].degree = "human resources management";
	inputArr[3].experiance = 0;
	inputArr[3].degree = "human resources management";


	t.ok(inputArr[0].gpa === 3.1 && 
		inputArr[1].gpa === 2.07 &&
		inputArr[2].gpa === 2.32 &&
		inputArr[3].gpa === 3.93, "test input is as expected");


	retArr = recruiter.recruiter(inputArr);

	t.deepEqual(retArr.length, 2, "Returns expected number of interns, removes GPAs below 2.5");
	t.deepEqual(retArr[0].gpa, 3.93, "Returns expected GPA order");
	t.ok(retArr[0].metric > retArr[1].metric, "Returns metrics in order");



  t.end();
});
