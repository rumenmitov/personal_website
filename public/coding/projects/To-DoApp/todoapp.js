alert("Welcome to my To-Do App! This will save your tasks, so when you comback you can pick up from where you left off! 😎");

let taskInput;
let addButton;
let clearButton;
let display;

window.onload = () => {
    taskInput = document.getElementById("taskInput");
    addButton = document.getElementById("addButton");
    clearButton = document.getElementById("clearAll");
    display = document.getElementById("tasks");

    handlePreviousTasks();

    addButton.addEventListener("click", handleAddTask);

    clearButton.addEventListener("click", handleClearAll);

    taskInput.onkeypress = (event) => {
        if (event.keyCode === 13) handleAddTask();
    };
};

function addTask(value, ID, isDone) {

    let newTask = document.createElement("p");
    newTask.innerText = value;
    newTask.setAttribute("class", "task");
    newTask.setAttribute("id", ID);
    if (isDone) newTask.setAttribute("class", "completed");
    display.appendChild(newTask);

    let completedButton = document.createElement("button");
    completedButton.setAttribute("class", "completedButton");
    newTask.appendChild(completedButton);
    completedButton.addEventListener("click", () => {
        let tasksArray = JSON.parse(localStorage["tasksArray"]);
        for ( let i = 0; i < tasksArray.length; i++) {
            let key = tasksArray[i];
            if (key === ID) {
                thisTask = JSON.parse(localStorage[key]);
                thisTask.taskIsDone = true;
                localStorage.setItem(key, JSON.stringify(thisTask));
            }
            
        }
        completedButton.parentElement.setAttribute("class", "completed");
    });
    
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    newTask.appendChild(deleteButton);
    deleteButton.addEventListener("click", () => {
        let tasksArray = JSON.parse(localStorage["tasksArray"]);
        for ( let i = 0; i < tasksArray.length; i++) {
            let key = tasksArray[i];
            if (key === ID) {
                localStorage.removeItem(key);
                tasksArray.splice(i,1);
            }
        }
        localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
        deleteButton.parentElement.remove();
    });

}

function handleAddTask() {
    let ID = "task" + (new Date()).getTime();
    addTask(taskInput.value, ID, false);
    

    let tasksArray = [];
    if (localStorage["tasksArray"]) {
        tasksArray = JSON.parse(localStorage["tasksArray"]);
        console.table(tasksArray);
    }
    
    localStorage.setItem(ID, JSON.stringify({
        taskValue: taskInput.value,
        taskIsDone: false
    }));

    tasksArray.push(ID);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));

    taskInput.value = "";
}

function handlePreviousTasks() {
    if (localStorage["tasksArray"]) {
        let tasksArray = JSON.parse(localStorage["tasksArray"]);
        console.table(tasksArray);

        for ( let i = 0; i < tasksArray.length; i++) {
            let key = tasksArray[i];
            let prevTask = JSON.parse(localStorage[key]);
            console.table(prevTask);
            
            addTask(prevTask.taskValue, key, prevTask.taskIsDone);
        }
    }
}

function handleClearAll() {
    let tasksArray = JSON.parse(localStorage["tasksArray"]);
    for ( let i = 0; i < tasksArray.length; i++) {
        let key = tasksArray[i];
        localStorage.removeItem(key);
    }
    localStorage.removeItem("tasksArray");
    window.location.reload();
}

