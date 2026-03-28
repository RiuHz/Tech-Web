'use strict';

const X = "❌​";
const O = "​🔵​";

class Table {
    notification = document.createElement("p");
    table = document.createElement("table");
    currentPlayer = X;

    constructor () {
        this.notification.textContent = "Current move : " + this.currentPlayer;

        for (let i = 0; i < 3; i++) {
            let row = document.createElement("tr");
            
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement("td");
                
                row.append(cell);
            }

            this.table.append(row);
        }

        this.table.addEventListener("click", this.makeMove)
    };

    changePlayer = () => {
        this.currentPlayer = (this.currentPlayer === X) ? O : X;

        this.notification.textContent = "Current move : " + this.currentPlayer;
    };

    makeMove = (event) => {
        let cell = event.target;

        if (cell.textContent.length > 0)
            return;

        cell.textContent = this.currentPlayer;

        if (this.checkDraw())
            return;

        if (this.checkWin())
            return;
        
        this.changePlayer();
    };

    checkDraw = () => {
        let rows = this.table.rows;
        let draw = true;

        for (let i = 0; i < 3; i++) {
            let row = rows[i];

            draw = (
                draw &&
                row.cells[0].textContent != "" &&
                row.cells[1].textContent != "" &&
                row.cells[2].textContent != ""
            )
        }

        if (draw) {
            this.notification.textContent = "It's a draw! Reload the page to play again!";
            this.table.removeEventListener("click", this.makeMove);
        }

        return draw;
    };

    checkWin = () => {
        if (!this.checkRows() && !this.checkColumns() && !this.checkDiagonals())
            return false;

        this.notification.textContent = "Player " + this.currentPlayer + " wins! Reload the page to play again";
        this.table.removeEventListener("click", this.makeMove);

        return true;
    };

    checkRows = () => {
        let rows = this.table.rows;

        for (let i = 0; i < 3; i++) {
            let row = rows[i];

            if (
                row.cells[0].textContent != "" &&
                row.cells[0].textContent == row.cells[1].textContent &&
                row.cells[1].textContent == row.cells[2].textContent
            )
                return true;
        }

        return false;
    };

    checkColumns = () => {
        let rows = this.table.rows;

        for (let i = 0; i < 3; i++) {
            if (
                rows[0].cells[i].textContent != "" &&
                rows[0].cells[i].textContent == rows[1].cells[i].textContent &&
                rows[1].cells[i].textContent == rows[2].cells[i].textContent
            )
                return true;
        }

        return false;
    };

    checkDiagonals = () => {
        let rows = this.table.rows;

        if (
            rows[0].cells[0].textContent != "" &&
            rows[0].cells[0].textContent == rows[1].cells[1].textContent &&
            rows[1].cells[1].textContent == rows[2].cells[2].textContent 
        )
            return true;

        if (
            rows[0].cells[2].textContent != "" &&
            rows[0].cells[2].textContent == rows[1].cells[1].textContent &&
            rows[1].cells[1].textContent == rows[2].cells[0].textContent 
        )
            return true;

        return false;
    }
}

function setupGame(containerId) {
    let container = document.getElementById(containerId);
    let table = new Table();

    container.append(table.notification);
    container.append(table.table);
};
