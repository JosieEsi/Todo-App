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
  name: "Complete online JavaScript course"},
  {
  name: "Jog around the park 3x"},
  {
    name: "10 minutes meditation"},
  {
    name: "Read for 1 hour"},
  {
    name: "Pick up groceries"},
  {
    name: "Conplete ToDo App on Frontend Mentor"}     
  
];
displayTodo;



function displayTodo(){

  let theTodoList = '';



 

  todos.forEach(function(toDo, index){
    const name = toDo.name;
    const disp = `
    <div class="new-todo">
    <input class="todo-check" type="checkbox">
    <div>${name}</div>
    <button class="delete-todo">&times</button>
    </div>
    `
    ;

    theTodoList += disp;
  });


  document.querySelector('.todo-list').innerHTML = theTodoList;

  console.log(theTodoList);
  

  const deleteTodoButtons = document.querySelectorAll('.delete-todo');
  deleteTodoButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);
      displayTodo();
    })
  })
}

function addToDo (){

   const toDoInput = document.querySelector('.todo-tab');
   const name = toDoInput.value;

   todos.push({name});
   console.log(name);
   
   toDoInput.value =  '';
  displayTodo();

 
}

// console.log(addToDo);
//   console.log(displayTodo);





 
  
  
 
 