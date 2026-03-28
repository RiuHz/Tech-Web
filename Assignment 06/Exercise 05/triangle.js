"use strict";

class Point {
    x;
    y;

    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

function getRandomPoint(array) {
    return array[~~(Math.random() * array.length)];
}

function getMidPoint(pointA, pointB) {
    return new Point((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2);
}

function chaosGame() {
    let currentPoint = new Point(Math.random() * 600, Math.random() * 600);

    setInterval(generatePoint, 10);

    function generatePoint() {
        let randomPoint = getRandomPoint(points);
        let midPoint = getMidPoint(currentPoint, randomPoint);
        
        context.fillRect(midPoint.x, midPoint.y, 1, 1);

        currentPoint = midPoint;
    }
}

function startChaosGame() {
    context.clearRect(0, 0, 600, 600);
    chaosGame();
}

let canvas = document.getElementById("triangle");
let context = canvas.getContext("2d");

let points = [new Point(300, 100), new Point(100, 500), new Point(500, 500)];

document.getElementById("start").addEventListener("click", startChaosGame);
