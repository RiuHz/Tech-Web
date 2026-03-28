"use strict";

let studentName = "Di Tota Gaetano";
let age = 25;
let isEnrolled = true;

console.log(`studentName has value ${studentName} and is of type ${typeof studentName}`);
console.log(`age has value ${age} and is of type ${typeof age}`);
console.log(`isEnrolled has value ${isEnrolled} and is of type ${typeof isEnrolled}`);

function studentInfo(studentName, age, course = "Web Technologies", isEnrolled = true) {
    console.log(`${studentName} (${age}) is` + (isEnrolled ? ' ' : ' NOT ') + `enrolled in the ${course} course`);
};

studentInfo(studentName, age);

studentInfo(studentName, age, "Software Engineering", isEnrolled);
