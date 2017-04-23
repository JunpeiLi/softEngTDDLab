// getValueFromWageAndExp( wage, full years of experiance );
function getValueFromWageAndExp(wage, fullYearsExp) {
	if (fullYearsExp !== Math.floor(fullYearsExp)) {
		console.log("getValueFromWageAndExp was given a partial year of experiance")
		return false;
	}
	var modYears;
	if (fullYearsExp >= 5) {
		modYears = 5;
	} else {
		modYears = fullYearsExp;
	}
	modYears = 1 + (modYears - 1) * 0.2;
	return modYears * wage;
}

// sortInternObjects( Array of hireables with "metric" as a property )
function sortInternObjects(internArr) {
	internArr.sort(function (a, b) {
  	return b.metric - a.metric;
	});
}


module.exports = {
	getValueFromWageAndExp: getValueFromWageAndExp,
	sortInternObjects: sortInternObjects
};
