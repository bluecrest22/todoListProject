export function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
        );
    }
}

export function storeTodoLists(todoLists) {
    const jsonList = JSON.stringify(todoLists);
    localStorage.setItem("todoList", jsonList);
}

export function retrieveTodoLists() {
    return JSON.parse(localStorage.getItem("todoList"));
}
  