//DOM
window.addEventListener('load', bindEvents);
function bindEvents(){ 
       document.querySelector('#add').addEventListener('click', addTask);
}

function addTask(){
    // Read the fields
    let id = document.querySelector('#id').value;
    let name = document.querySelector('#name').value;
    let desc = document.querySelector('#desc').value;
    let date = document.querySelector('#date').value;
    let url = document.querySelector('#url').value;

    // Store in object and then object goes in Array
}  