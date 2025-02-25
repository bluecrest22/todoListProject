import "./styles.css";
import { TodoList, TodoListItem } from "./todo-list";
import {ListDisplay} from "./display-list";
import { storeTodoLists, retrieveTodoLists, storageAvailable } from "./local-storage";

let currTodoLists = [];
const container = document.querySelector(".todo-container");

if (storageAvailable("localStorage")) {
    const todoLists = retrieveTodoLists();
    if(todoLists) {
        currTodoLists = todoLists;
    }
}
displayLists();

// Add List Modal
const listModal = document.querySelector("#list-modal");
const openListModalBtn = document.querySelector("#list-open-button");
const closeListModalBtn = document.querySelector("#list-modal-close-button");
const inputListModalBtn = document.querySelector("#list-modal-input-button");
const deleteListModalBtn = document.querySelector("#list-modal-delete-button");

inputListModalBtn.addEventListener('click', () => {
    const modalInput = document.querySelector("#list-modal-input");
    if(modalInput.value !== "") {
        currTodoLists.push(new TodoList(modalInput.value));
        storeTodoLists(currTodoLists);
        displayLists();
        modalInput.value = "";
        listModal.close();
    }
});

deleteListModalBtn.addEventListener('click', () => {
    const modalInput = document.querySelector("#list-modal-input");
    if(modalInput.value !== "") {
        const hasName = (todo) => todo.getName() == modalInput.value;
        const index = currTodoLists.findIndex(hasName);
        if(index != -1) {
            currTodoLists = currTodoLists.filter((word) => word.getName() != modalInput.value);
            storeTodoLists(currTodoLists);
            displayLists();
        }
        listModal.close();
        modalInput.value = "";
    }
});

openListModalBtn.addEventListener('click', () => {
    listModal.showModal();
});

closeListModalBtn.addEventListener('click', () => {
    listModal.close();
});

// Close the modal if the user clicks outside of it
listModal.addEventListener('click', (event) => {
if (event.target === listModal) {
    listModal.close();
}
});

// Add List Item Modal
const listItemModal = document.querySelector("#list-item-modal");
const openListItemModalBtn = document.querySelector("#list-item-open-button");
const closeListItemModalBtn = document.querySelector("#list-item-modal-close-button");
const inputListItemModalBtn = document.querySelector("#list-item-modal-input-button");
const deleteListItemModalBtn = document.querySelector("#list-item-modal-delete-button");

inputListItemModalBtn.addEventListener('click', () => {
    const modalInputName = document.querySelector("#list-item-modal-input-name");
    const modalInputTitle = document.querySelector("#list-item-modal-input-title");
    const modalInputDesc = document.querySelector("#list-item-modal-input-desc");
    const modalInputDueDate = document.querySelector("#list-item-modal-input-dueDate");
    const modalInputPriority = document.querySelector("#list-item-modal-input-priority");
    if(modalInputName.value !== "" && modalInputTitle.value !== "" && modalInputDesc.value !== "" && modalInputDueDate.value !== "" && modalInputPriority.value !== "") {
        const hasName = (todo) => todo.getName() == modalInputName.value;
        const index = currTodoLists.findIndex(hasName);
        if(index != -1) {
            currTodoLists[index].addTodoListItem(new TodoListItem(modalInputTitle.value,modalInputDesc.value,modalInputDueDate.value,modalInputPriority.value));
            storeTodoLists(currTodoLists);
            listItemModal.close();
            modalInputName.value = "";
            modalInputTitle.value = "";
            modalInputDesc.value = "";
            modalInputDueDate.value = "";
            modalInputPriority.value = "";
        }
    }
});

deleteListItemModalBtn.addEventListener('click', () => {
    const todoName = document.querySelector("#list-item-modal-input-name").value;
    const title = document.querySelector("#list-item-modal-input-title").value;
    if(todoName !== "") {
        const hasName = (todo) => todo.getName() == todoName;
        const index = currTodoLists.findIndex(hasName);
        if(index != -1 &&  title != "") {
            let currTodoListItems = currTodoLists[index].getTodoListItems();
            currTodoListItems = currTodoListItems.filter((word) => word.getTitle() != title);
            currTodoLists[index].setTodoListItems(currTodoListItems);
            storeTodoLists(currTodoLists);
            displayLists();
        }
        listModal.close();
        todoName = "";
        title = "";
    }
});

openListItemModalBtn.addEventListener('click', () => {
    listItemModal.showModal();
});

closeListItemModalBtn.addEventListener('click', () => {
    listItemModal.close();
});

// Close the modal if the user clicks outside of it
listItemModal.addEventListener('click', (event) => {
if (event.target === listItemModal) {
    listItemModal.close();
}
});

function displayLists() {
    container.replaceChildren();
    for(const todoList of currTodoLists) {
        const listContainer = document.createElement("div");
        const listItemDisplayBtn = document.createElement("button");
        listItemDisplayBtn.textContent = "Show";
        const listItemDisplayContainer = document.createElement("div");

        ListDisplay.displayTodoList(listContainer, todoList);
        container.appendChild(listContainer);
        listContainer.appendChild(listItemDisplayBtn);
        listContainer.appendChild(listItemDisplayContainer);

        listItemDisplayBtn.addEventListener('click', () => {
            if(listItemDisplayBtn.textContent === "Show") {
                ListDisplay.displayTodoListItems(listItemDisplayContainer,todoList.getTodoListItems());
                listItemDisplayBtn.textContent = "Hide";
            } else {
                listItemDisplayContainer.replaceChildren();
                listItemDisplayBtn.textContent = "Show";
            }
        });
    }
}