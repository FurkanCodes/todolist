// Define UI vars

const form = document.querySelector('#task-form');
const taskList =  document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();


// Load all evnet listeners

function loadEventListeners() {


        // DOM Load event
        document.addEventListener('DOMContentLoaded', getTasks);
        // add task event
        form.addEventListener('submit', addTask);
        // ermove task event
        taskList.addEventListener('click', removeTask);
    // clearn task
        clearBtn.addEventListener('click', clearTasks);
        // filter the tasks
        filter.addEventListener('keyup', filterTasks)

}
// get tasks from LS
    function getTasks() {
        let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        // create li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon hmtl
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    // appden the link to li
    li.appendChild(link);
    // append li tu ul
    taskList.appendChild(li);
    });
}
// add task

function addTask(e) {
    if(taskInput.value === '') {
        alert('Görev Ekleyin');
    } else {
    // create li element
    const li = document.createElement('li');
    // add a class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon hmtl
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    // appden the link to li
    li.appendChild(link);
    // append li tu ul
    taskList.appendChild(li);

    // store in local storage
    storeTaskInLocalStorage(taskInput.value);
    // clear input
    taskInput.value = '';
    e.preventDefault();
    
    }
}
  // remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Emin misin?')) {  
            e.target.parentElement.parentElement.remove();

            // remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
      
    }
}
// remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) 
    {
     if(taskItem.textContent === task) {
         tasks.splice(index, 1);
     }   
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
    
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}



// filter

function filterTasks(e) {
    const text = e.target.value.toLowerCase(); // get whatever is typed in
    document.querySelectorAll('.collection-item').forEach
    (function (task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';

        } else {
            task.style.display = 'none';

        }
    
    
    });

}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

