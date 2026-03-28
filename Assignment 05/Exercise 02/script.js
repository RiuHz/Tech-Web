"use strict";

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let filterer = createMultiStepFilterer(array);

console.log(filterer());

console.log(
    filterer(
        function (element) {
            return element % 2 != 0;
        }
    )
);

console.log(filterer("Foo"));

console.log(
    filterer(
        function (element) {
            return element % 3 != 0;
        }
    )
);

console.log(array);

function createMultiStepFilterer(array) {
    return function (filterCriterion) {
        if (typeof(filterCriterion) != "function")
            return array;

        return array.filter((element) => filterCriterion(element));
    };
}
