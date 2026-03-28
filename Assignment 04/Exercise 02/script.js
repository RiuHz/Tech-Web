"use strict";

let movie = {
    title: "Ready Player One",
    director: {
        firstName: "Steven",
        lastName: "Spielberg",
        birthYear: "18 dicembre 1946",
        deathYear: undefined
    },
    year: 2018,
    "is part of a saga": false,
    describe: function () {
        console.log(`${this.title} (${this.year}) was directed by ${this.director.firstName} ${this.director.lastName}, the fim is` + (this['is part of a saga'] ? " " : " NOT ") + `part of a saga`);
    }
};

movie.describe();

function Movie(title, year, isPartOfSaga, directorName, directorBirthYear, directorDeathYear) {
    this.title = title;
    this.year = year;
    
    this.director = {};
    [this.director.firstName, this.director.lastName] = directorName.split(" ");
    this.director.birthYear = directorBirthYear;
    this.director.deathYear = directorDeathYear;

    this["is part of a saga"] = isPartOfSaga;

    this.describe = function () {
        console.log(`${this.title} (${this.year}) was directed by ${this.director.firstName} ${this.director.lastName}, the fim is` + (this['is part of a saga'] ? " " : " NOT ") + `part of a saga`);
    }
};

let newMovie = new Movie("Ready Player One", 2018, false, "Steven Spielberg", "18 dicembre 1946");

newMovie.describe();

delete movie["is part of a saga"];
console.log(movie["is part of a saga"]);

function Trilogy(title, firstMovie, secondMovie, thirdMovie) {
    this.title = title;
    this.firstMovie = firstMovie;
    this.secondMovie = secondMovie;
    this.thirdMovie = thirdMovie;
}
