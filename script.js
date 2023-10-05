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

document.querySelector('.save').addEventListener('click', ()=> {
  addToDo();
});

let todos = [];
displayTodo;



function displayTodo(){

  let theTodoList = '';



 

  todos.forEach(function(toDo, index){
    const disp = `
    <input type="checkbox">
    <div>${toDo}</div>
    <button class="delete-todo">&times</button>
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
   const toDo = toDoInput.value;

   todos.push(toDo);
   console.log(toDo);
   
   toDoInput.value =  '';
  displayTodo();

 
}

// console.log(addToDo);
//   console.log(displayTodo);





 
  
  
 
 