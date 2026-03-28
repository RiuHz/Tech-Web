"use strict";

class SnakeGame {
    timer;

    scoreboard = document.createElement("p");
    score = 0;

    grid = document.createElement("table");
    size;
    snake;
    fruit;

    constructor (size) {
        this.scoreboard.innerHTML = "Score: " + this.score;

        for (let i = 0; i < size; i++) {
            let row = document.createElement("tr");

            for (let j = 0; j < size; j++) {
                let cell = document.createElement("td");

                row.append(cell);
            }

            this.grid.append(row);
        }

        this.grid.setAttribute("tabindex", "0");
        this.grid.addEventListener("keydown", this.changeDirection);
        
        this.size = size;

        this.snake = new Snake(this.grid, size);
        
        this.fruit = new Fruit(this.grid, size);
        this.fruit.spawn();
    };

    start = () => {
        this.timer = setInterval(() => this.update(), 500);
    };

    updateScore = () => {
        this.score += 1;

        this.scoreboard.innerHTML = "Score: " + this.score;
    };

    endGame = () => {
        this.scoreboard.innerHTML = "Score: " + this.score + " Game Over! Reload the page to play again.";

        clearInterval(this.timer);
    };

    update = () => {
        this.snake.move();

        if (this.checkFood()) {
            this.updateScore();
            this.snake.add();
            this.fruit.respawn();
        }

        if (this.checkCollision())
            this.endGame();
        else
            this.snake.render();
    };

    checkFood = () => {
        let [x, y] = this.snake.position;

        if (x == this.fruit.x && y == this.fruit.y)
            return true;

        return false;
    };

    checkCollision = () => {
        let [x, y] = this.snake.position;

        if (x < 0 || y < 0)
            return true;

        if (x >= this.size || y >= this.size)
            return true;

        for (let i = 1; i < this.snake.length; i++)
            if (x == this.snake.body[i].x && y == this.snake.body[i].y)
                return true;

        return false;
    };

    changeDirection = (event) => {
        switch (event.key) {
            case "ArrowUp": {
                if (this.snake.direction != "down")
                    this.snake.direction = "up";
            }
            break;

            case "ArrowRight": {
                if (this.snake.direction != "left")
                    this.snake.direction = "right";
            }
            break;

            case "ArrowDown": {
                if (this.snake.direction != "up")
                    this.snake.direction = "down";
            }
            break;

            case "ArrowLeft": {
                if (this.snake.direction != "right")
                    this.snake.direction = "left";
            }
            break;

            default: {}
        };
    };
}

class Snake {
    grid;

    direction = "right";
    body = [];

    constructor (grid, size) {
        this.grid = grid;
        this.x = this.y = ~~(size / 2);

        for (let i = 0; i < 3; i++)
            this.body.push(new SnakeBody(this.x - i, this.y))

        this.render();
    };

    get length() {
        return this.body.length;
    }

    get position() {
        return [this.body[0].x, this.body[0].y];
    };

    get head() {
        return this.body[0];
    }

    add = () => {
        let tail = this.body[this.body.length - 1];
        let beforeTail = this.body[this.body.length - 2];

        let x = tail.x;
        let y = tail.y;

        if (tail.x > beforeTail.x) {
            x += 1;
        } else if (tail.x < beforeTail.x) {
            x -= 1;
        } else if (tail.y > beforeTail.y) {
            y += 1;
        } else if (tail.y < beforeTail.y) {
            y -= 1;
        }

        this.body.push(new SnakeBody(x, y));
    }

    render = () => {
        let rows = this.grid.rows;
       
        for (let row of rows) {
            for (let cell of row.cells) {
                cell.classList.remove("snake-head", "snake-body");
            }
        }

        rows[this.head.y].cells[this.head.x].classList.add("snake-head");

        for (let i = 1; i < this.body.length; i++) {
            let body = this.body[i];
            rows[body.y].cells[body.x].classList.add("snake-body");
        }
    };

    move = () => {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x; 
            this.body[i].y = this.body[i - 1].y; 
        }

        switch (this.direction) {
            case "up": {
                this.head.y -= 1;
            }
            break;

            case "right": {
                this.head.x += 1;
            }
            break;

            case "down": {
                this.head.y += 1;
            }
            break;

            case "left": {
                this.head.x -= 1;
            }
            break;
        }
    };

}

class SnakeBody {
    x;
    y;

    direction;

    constructor (x, y, direction) {
        this.x = x;
        this.y = y;

        this.direction = direction;
    }
}

class Fruit {
    size;

    x;
    y;

    constructor (grid, size) {
        this.grid = grid;
        this.size = size;
    };

    get cell() {
        return this.grid.rows[this.y].cells[this.x];
    }

    render = () => {
        this.cell.classList.add("food");
    };

    spawn = () => {
        let rows = this.grid.rows;

        do {
            this.x = ~~(Math.random() * this.size);
            this.y = ~~(Math.random() * this.size);
        } while (this.cell.classList.length > 0);

        this.render();
    };

    respawn = () => {
        this.cell.classList.remove("food");
        
        this.spawn();
    }
}

function setupGame(containerId) {
    let game = new SnakeGame(20);
    let container = document.getElementById(containerId);

    container.append(game.scoreboard);
    container.append(game.grid);

    game.start();
}
