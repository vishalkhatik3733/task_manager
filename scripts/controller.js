//DOM
import { taskOperations } from "./models/task_operations.js";
import { showAlert } from "./utilis/dialog.js";
import Task from "./models/task.js";
import { autoGen } from "./utilis/counter.js";
//import { counter } from "./utilis/counter.js"
window.addEventListener('load', init);
const itr = autoGen();
function init() {
    bindEvents();
    showCounts();
    focus("name");
    showCount();
}

const showCount = () => (document.querySelector('#id').innerText = itr.next().value);



function save() {
    let tasks = taskOperations.getAllTask();
    console.log("JSON is", JSON.stringify(tasks));
    console.log("Task Are", tasks);
    if (window.localStorage) {
        localStorage.tasks = JSON.stringify(tasks);
        showAlert("Record Saved SuccessFully...");
    }
    else {
        showAlert("Browser is Outdated not Support local storage...");
    }
}

function load() {
    if (localStorage) {
        let generictasks = JSON.parse(localStorage.tasks); //get generic object
        let tasks = generictasks.map((task) =>
            new Task(task.id, task.name, task.desc, task.date, task.url, task.isMarked));
        console.log("After Parse",
            typeof tasks, //object
            tasks instanceof Task, //false
            tasks instanceof Object);  //true

        taskOperations.tasks = tasks;
        showCounts();
        printTasks(taskOperations.tasks);

    }
    else {
        showAlert("Browser is Outdated not Support local storage...");
    }
}

function bindEvents() {
    document.querySelector("#load").addEventListener("click", load);
    document.querySelector("#save").addEventListener("click", save);
    document.querySelector("#delete").addEventListener("click", deleteTask);
    document.querySelector("#add").addEventListener("click", addTask);
}

function deleteTask() {
    let tasks = taskOperations.deletedMarked();
    showCounts();
    printTasks(tasks);
    console.log("deleted");
}

function toggleDelete() {
    console.log("Toggle...", this.getAttribute("task-id"));
    const icon = this;
    const id = icon.getAttribute("task-id");
    const tr = icon.parentNode.parentNode;
    tr.classList.toggle("alert-danger");
    taskOperations.mark(id);
    showCounts();
}

function edit() {
    console.log("Edit...");
}

function showCounts() {
    document.querySelector("#total").innerText = taskOperations.tasks.length;
    document.querySelector("#marktotal").innerText = taskOperations.countMarked();
    document.querySelector("#unmarktotal").innerText = taskOperations.countUnmarked();
}

function createIcon(className, fn, id) {
    //  <i class="fas fa-edit"></i>
    let icon = document.createElement("i");
    icon.className = `fas fa-${className} me-3 hand`;
    icon.addEventListener("click", fn);
    icon.setAttribute("task-id", id);
    return icon;
}

function addTask() {
    // Read the fields
    let id = document.querySelector('#id').innerText;
    let name = document.querySelector('#name').value;
    let desc = document.querySelector('#desc').value;
    let date = document.querySelector('#date').value;
    let url = document.querySelector('#url').value;

    const task = taskOperations.add(id, name, desc, date, url);
    printTask(task);
    showCounts();
    clearAll();
    focus("name");
    showCount();


    // Store in object and then object goes in Array
}

function printTasks(tasks) {
    const tbody = document.querySelector("#tasks");
    tbody.innerHTML = "";
    // tasks.forEach((task) => printTask(task));
    tasks.forEach(printTask);
}

function printTask(task) {
    const tbody = document.querySelector("#tasks");
    const tr = tbody.insertRow();
    let id = task.id;
    // Object Traverse
    let cellIndex = 0;
    for (let key in task) {
        if (key == "isMarked" && task[key]) {
            tr.classList.toggle("alert-danger");
        }
        if (key == "isMarked" || typeof task[key] === "function") {
            continue;
        }
        let value = task[key];
        let td = tr.insertCell(cellIndex);
        td.innerText = value;
        cellIndex++;
    }

    let td = tr.insertCell(cellIndex);
    td.appendChild(createIcon("edit", edit, id));
    td.appendChild(createIcon("trash", toggleDelete, id));
}

const clearAll = () =>
    document
        .querySelectorAll(".form-control")
        .forEach((txtBox) => (txtBox.value = ""));

const focus = (fieldId) => document.querySelector("#" + fieldId).focus();
