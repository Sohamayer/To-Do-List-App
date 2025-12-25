const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add");
const deleteAllBtn = document.getElementById("delete-all");
const displayTask = document.getElementById("list-of-task");
let storeTasks = JSON.parse(localStorage.getItem("storetask")) || [];

let indexContainer = null;

function displayTasks() {
    displayTask.textContent = "";

    storeTasks.forEach((task, index) => {
        let taskContainer = document.createElement("div");
        taskContainer.classList.add("task-item");
        displayTask.appendChild(taskContainer);

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed || false;
        taskContainer.appendChild(checkbox);

        let taskNameContainer = document.createElement("span");
        taskNameContainer.textContent = task.task;
        if (task.completed) {
            taskNameContainer.style.textDecoration = "line-through";
            taskNameContainer.style.color = "#888";
        }
        taskContainer.appendChild(taskNameContainer);

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            localStorage.setItem("storetask", JSON.stringify(storeTasks));
            displayTasks();
        });

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            indexContainer = index;
            taskInput.value = task.task;
        });
        taskContainer.appendChild(editBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            storeTasks.splice(index, 1);
            localStorage.setItem("storetask", JSON.stringify(storeTasks));
            displayTasks();
        });
        taskContainer.appendChild(deleteBtn);
    });
}

displayTasks();

addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (!task) {
        alert("Please enter a task before adding!");
        return;
    }

    if (indexContainer !== null) {
        storeTasks[indexContainer].task = task;
        indexContainer = null;
    } else {
        storeTasks.push({ task, completed: false });
    }

    localStorage.setItem("storetask", JSON.stringify(storeTasks));
    displayTasks();
    taskInput.value = "";
});

deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
        storeTasks = [];
        localStorage.removeItem("storetask");
        displayTasks();
    }
});