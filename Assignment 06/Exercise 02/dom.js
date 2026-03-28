'use strict';

function renderDOM(elementId, listId) {
    let start = document.getElementById(elementId);
    let list = document.getElementById(listId);

    renderElement(start, list);

    function renderElement(element, list) {
    
        let node = document.createElement("li");
        
        switch (element.nodeName) {
            case "#text": {
                let text = element.data.trim();

                if (text.length <= 0)
                    break;

                node.innerHTML = text;
                node.classList.add("text");
                list.append(node);
            }
            break;
            
            case "#comment": {
                node.innerHTML = element.data;
                node.classList.add("comment");
                list.append(node);
            }
            break;
            
            default: {
                node.innerHTML = element.nodeName;
                node.classList.add("element");
                list.append(node);
            }
        }

        if (element.firstChild != undefined) {
            let newList = document.createElement("ul");
            list.append(newList);

            renderElement(element.firstChild, newList);
        }

        if (element.nextSibling != undefined && element != start)
            renderElement(element.nextSibling, list);

    };
}
