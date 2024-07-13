let inputField = document.querySelector(".text-input");


let addButton = document.querySelector(".add");


let tasksDiv = document.querySelector(".tasks");

// window.localStorage.clear();

let addTask = function (taskText, taskId = null, load = false) {
    let task = document.createElement("div");
    task.className = "task";

    task.style = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        margin-bottom: 15px;
        border-bottom: 2px solid #4CAF50;
        background-color: white;
        border-radius: 20px;
    `

    let taskDesc = document.createElement("span");
    taskDesc.className = "task-desc";

    taskDesc.style = `
        font-size: 16px;
        font-weight: bold;
    `

    let deleteBtn = document.createElement("button");
    deleteBtn.value = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.style = `
        background-color: red;
        color: white;
        padding: 5px 10px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    `
    deleteBtn.innerHTML = "Delete";


    if (!load) {
        taskDesc.innerHTML = inputField.value;
    }
    else {
        taskDesc.innerHTML = taskText;
    }
    
    task.appendChild(taskDesc);
    task.appendChild(deleteBtn);
    tasksDiv.appendChild(task);
    inputField.value = "";

    deleteBtn.addEventListener("click", function () {
        task.remove();
        localStorage.removeItem(taskId);
    });

    let taskDone = false;

    let handleTask = function () {
        if (taskDone) {
            task.style = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                margin-bottom: 15px;
                border-bottom: 2px solid #4CAF50;
                background-color: white;
                border-radius: 20px;
            `
        }
        else {
            task.style = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                margin-bottom: 15px;
                background-color: #4CAF50;
                border-radius: 20px;
                color: white;
            `
        }
        taskDone = !taskDone
    }

    task.addEventListener("click", handleTask);

    if (!taskId) {
        taskId = new Date().getTime().toString();
        localStorage.setItem(taskId, taskText);
    }
}

addButton.addEventListener("click", function () {
    if (inputField.value) {
        addTask(inputField.value);
    }
});

inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed
        event.preventDefault(); // Prevent form submission if the input is inside a form
        if (inputField.value) {
            addTask(inputField.value);
        }
    }
});

let loadTasks = function () {
    for (let i = 0; i < localStorage.length; i++) {
        let taskId = localStorage.key(i);
        console.log(taskId);
        let taskText = localStorage.getItem(taskId);
        console.log(taskText);
        addTask(taskText, taskId, true);
    }
};

if (localStorage.length > 0) {
    loadTasks();
}