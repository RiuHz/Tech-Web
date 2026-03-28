"use strict";

function cachingDecorator(f, n) {
    let cache;
    let timesCalled = n;

    return function () {
        if (timesCalled == n) {
            cache = f();
            timesCalled = 1;
        } else {
            timesCalled += 1;
        }

        return cache;
    }
}

function f() {
    let value = Math.random();

    console.log(`f has been invoked, result is ${value}`);

    return value;
}

let g = cachingDecorator(f, 3);

console.log(g());
console.log(g());
console.log(g());

console.log(g());
console.log(g());
console.log(g());

console.log(g());
