'use strict';

function addToListOnEnter(event) {
    if (event.key != "Enter")
        return;

    addToList();
    
    event.preventDefault();
}

function addToList() {
    let list = document.getElementById("todo-list");
    let todo = document.createElement("li")
    let text = document.getElementById("todo-input").value;

    if (text == "")
        return;

    todo.innerHTML = text;

    todo.addEventListener("click", (event) => { event.target.classList.toggle("done"); } );
    todo.addEventListener("dblclick", (event) => { event.target.remove(); })

    list.append(todo)
}
