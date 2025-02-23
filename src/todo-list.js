export class TodoList {
    constructor(name) {
        this.name = name;
        this.todoListItems = [];
    }

    // Getters
    getName() {
        return this.name;
    }

    getTodoListItems() {
        return this.todoListItems;
    }

    //Setters
    setName(name) {
        this.name = name;
    }

    addTodoListItem(todoListItem) {
        this.todoListItems.push(todoListItem);
    }

    setTodoListItems(todoListItems) {
        this.todoListItems = todoListItems;
    }

}

export class TodoListItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    // Getters
    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    // Setter
    setTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setPriority(priority) {
        this.priority = priority;
    }
}