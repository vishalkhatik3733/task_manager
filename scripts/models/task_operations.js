// CRUD
import  Task  from "./task.js";
const taskOperations = {
    tasks: [],
    add(id, name, desc, date, url) {
        const task = new Task(id, name, desc, date, url);
        this.tasks.push(task);
        console.log("Added", this.tasks);
        return task;
    },
};
export default taskOperations  
