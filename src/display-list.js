export class ListDisplay {
    static displayTodoList(container, todo) {
        // Create List Elements
        const listHeader = document.createElement("h2");
        const textContent = document.createTextNode(todo.name);
        
        // Append List Elements
        listHeader.appendChild(textContent);
        container.appendChild(listHeader);

        // CSS elements
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.gap = "5px";
    }

    static displayTodoListItems(container, todoListItems) {
        for(const item of todoListItems) {
            const itemDiv = document.createElement("div");
            const itemPara = document.createElement("p");
            const textContent = `Title:${item.getTitle()} desc:${item.getDescription()} dueDate:${item.getDueDate()} priority:${item.getPriority()}`;
            const itemTextContent = document.createTextNode(textContent);

            itemPara.appendChild(itemTextContent);
            itemDiv.appendChild(itemPara);
            container.appendChild(itemDiv);
        }
    }
}


