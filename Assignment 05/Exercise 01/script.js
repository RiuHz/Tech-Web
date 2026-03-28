"use strict";

class Person {
    firstName;
    lastName;

    constructor (firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

}

let person1 = new Person("First", "Person");
let person2 = new Person("Second", "Person");

Person.prototype.greet = function () {
    console.log(`Hello, I'm ${this.firstName} ${this.lastName}`);
}

person1.greet();
person2.greet();

class Student extends Person {
    degreeProgram;

    constructor (firstName, lastName, degreeProgram) {
        super(firstName, lastName);

        this.degreeProgram = degreeProgram;
    }
}

let student1 = new Student("First", "Student", "Computer Science");
let student2 = new Student("Second", "Student", "Computer Science");

student1.greet();
student2.greet();

Student.prototype.greet = function () {
        console.log(`Hello, I'm ${this.firstName} ${this.lastName} and I'm a ${this.degreeProgram} student`);
}

person1.greet();
person2.greet();

student1.greet();
student2.greet();
