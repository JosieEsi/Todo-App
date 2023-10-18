const toggleButton = document.querySelector('.theme-toggle');
const lightModeImages = document.querySelectorAll('.lightmode');
const darkModeImages = document.querySelectorAll('.darkmode');
// const mobileImages = document.querySelectorAll('.mobile-image');
// const desktopImages = document.querySelectorAll('.desktop-image');


toggleButton.addEventListener('click', () => {
  // Toggle the visibility of light mode images
  lightModeImages.forEach((image) => {
    image.style.display = image.style.display === 'none' ? 'block' : 'none';
  });

  // Toggle the visibility of dark mode images
  darkModeImages.forEach((image) => {
    image.style.display = image.style.display === 'none' ? 'block' : 'none';
  });

  document.body.style.backgroundColor = darkModeImages[0].style.display === 'block' ? 'black' : 'white';


});

function myFunction() {
  const element = document.body;
  element.classList.toggle("dark-mode");
}

// document.querySelector('.save').addEventListener('click', ()=> {
//   addToDo();
// });

const todoform = document.querySelector('.todo-text');
todoform.addEventListener('keydown', (event) => {
 if (event.key === 'Enter'){
  addToDo();
 }
})

let todos = [{
  name: "Complete online JavaScript course",
  completed: true},
  {
  name: "Jog around the park 3x",
  completed: false},
  {
    name: "10 minutes meditation",
    completed: false},
  {
    name: "Read for 1 hour",
    completed: false},
  {
    name: "Pick up groceries",
    completed: false},
  {
    name: "Complete ToDo App on Frontend Mentor",
    completed: false}     
  
];


displayTodo();



function displayTodo(){

  let theTodoList = '';
  let incompleteCount = 0;
  

  todos.forEach(function(toDo, index){
    const name = toDo.name;
    const completed = toDo.completed;
    const completedClass = completed ? 'completed-task' : '';
    const disp = `
    <div class="new-todo">
    <input class="todo-check" type="checkbox" data-index="${index}" ${completed  ? 'checked' : ''}>
    <div class="${completedClass} list">${name}</div>
    <div class="delete-button">
    <button class="delete-todo">&times</button></div>
    </div>
    `
    ;

    theTodoList += disp;

    if(!completed){
      incompleteCount++
    }
  
});

const filterCountSection = `
<div class="endtext">
  <span id="items-left">${incompleteCount}  items left</span>
  <div class="endtext-buttons">
  <button class="all">All</button>
  <button class="active">Active</button>
  <button class="completed">Completed</button>
  </div>
  <button class="clear-completed">Clear Completed</button>
</div>
`;



theTodoList += filterCountSection;


  

  // console.log(theTodoList);

  document.querySelector('.todo-list').innerHTML = theTodoList;

  const deleteTodoButtons = document.querySelectorAll('.delete-todo');
  deleteTodoButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);
      displayTodo();


    })
  })

  activeFilterButtons();
  activateCheckbox();
}
function activateCheckbox (){
const checkboxes = document.querySelectorAll('.todo-check');
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener('change', (event) => {
    const index = event.target.getAttribute('data-index');
    const toDo = todos[index]
    toDo.completed = checkbox.checked;
    displayTodo();
  });
});
}

function activeFilterButtons (){
const showAll = document.querySelector('.all')
showAll.addEventListener('click', () => {
  displayTodo();
  console.log(showAll);
})


const showActive = document.querySelector('.active')
showActive.addEventListener('click', () => {
const activeTodos = todos.filter(todo => !todo.completed)
  displayFilteredTodo(activeTodos)

})

const showCompleted = document.querySelector('.completed')
showCompleted.addEventListener('click', () => {
const completedTodos = todos.filter(todo => todo.completed)
displayFilteredTodo(completedTodos)

})

const clearCompleted = document.querySelector('.clear-completed')
clearCompleted.addEventListener('click', () => {
todos = todos.filter(todo => !todo.completed);
displayTodo();
})
}

function displayFilteredTodo (filteredTodos) {
  let theTodoList = '';

  filteredTodos.forEach(function (toDo, index) {
    const name = toDo.name;
    const completed = toDo.completed;
    const completedClass = completed ? 'completed-task' : '';
    const disp =`
    <div class="new-todo">
    <input class="todo-check" type="checkbox" data-index="${index}" ${completed  ? 'checked' : ''}>
    <div class="${completedClass} list">${name}</div>
    <div class="delete-button">
    <button class="delete-todo">&times</button></div>
    </div>
    `;

    theTodoList += disp;

  });

  const filterCountSection = `
<div class="endtext">
  <span id="items-left">${todos.length} items left</span> 
  <div class="endtext-buttons">
  <button class="all">All</button>
  <button class="active">Active</button>
  <button class="completed">Completed</button>
  </div>
  <button class="clear-completed">Clear Completed</button>
</div>
`;


theTodoList += filterCountSection;

  document.querySelector('.todo-list').innerHTML = theTodoList;

  activeFilterButtons();
  activateCheckbox();
}

function addToDo (){

   const toDoInput = document.querySelector('.todo-tab');
   const name = toDoInput.value;





   todos.push({name});
   console.log(name);
   
   toDoInput.value =  '';
  displayTodo();

 
}



 
  
  
 
 