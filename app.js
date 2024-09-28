document.addEventListener("DOMContentLoaded",()=>{
  const storedTask = JSON.parse(localStorage.getItem('tasks'))

  if(storedTask){
    storedTask.forEach((task)=> tasks.push(task))
    updateTaskList();
    updateStats();
  }
})

let tasks = [];
const addTask = ()=>{
  const taskInput = document.getElementById("taskInput")
  const text = taskInput.value.trim();

  if(text){
    tasks.push({text:text, completed: false});
    taskInput.value="";
    updateTaskList();
    updateStats();
    saveTasks();
  }
}

const toggleTaskComplete = (index) =>{
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveTasks();
}

const deleteTask = (index) =>{
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
}

const editTask = (index) =>{
  const taskInput = document.getElementById('taskInput')
  taskInput.value = tasks[index].text

  tasks.splice(index, 1)
  updateTaskList();
  updateStats();
  saveTasks();
}

const updateTaskList = () =>{
  const taskList = document.getElementById('task-list');
  taskList.innerHTML="";

  tasks.forEach((task,index) =>{
    const listItems = document.createElement('li')

    listItems.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed":""}">
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked':''}/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
         <img src="assests/edit-svgrepo-com.svg" alt="edit" onClick="editTask(${index})">
         <img src="assests/delete-svgrepo-com.svg" alt="delete" onClick="deleteTask(${index})">
        </div>
      </div>
    `;
    listItems.addEventListener('change',()=> toggleTaskComplete(index));
    taskList.append(listItems)
  })
}

document.getElementById("newTask").addEventListener('click',function(e){
  e.preventDefault();

  addTask();
})

const updateStats = () =>{
  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const progress = (completedTasks/totalTasks)*100;
  const progressBar = document.getElementById("progress")

  progressBar.style.width = `${progress}%`

  document.getElementById("numbers").innerText=`${completedTasks}/${totalTasks}`

  if(tasks.length && completedTasks === totalTasks){
    blast();
  }
}

const saveTasks = () =>{
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const blast = () =>{
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

// switch

const checkbox1 = document.querySelector('.checkbox1');

checkbox1.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');

  const container = document.querySelector('.container');
  if (container) {
    container.classList.toggle('dark-mode');
  }
});
