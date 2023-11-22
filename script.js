const displayTodo = () => {

  let theTodoList = '';
  let incompleteCount = 0;
  

  todos.forEach((toDo, index) => {
    const name = toDo.name;
    const completed = toDo.completed;
    const completedClass = completed ? 'completed-task' : '';
    const disp = `
    <div class="new-todo" draggable="true">
    <input class="todo-check" type="checkbox" data-index="${index}" ${completed  ? 'checked' : ''}>
    <label for="checkbox" data-index="${index}" ${completed  ? 'checked' : ''}></label>
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



document.querySelector('.todo-list').innerHTML = theTodoList;

  const deleteTodoButtons = document.querySelectorAll('.delete-todo');
    deleteTodoButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);
      displayTodo();
    })
  })

  activeFilterButtons();
  updateButtonColor();
  activateCheckbox();
  dragAndDrop();
}

const toggleDarkMode = () => {
  const element = document.body;
  element.classList.toggle("dark-mode");
}

const updateButtonColor = () => {
  const element = document.body;
  const isDarkMode = element.classList.contains('dark-mode');
  const showActive = document.querySelector('.active');
  const showCompleted = document.querySelector('.completed');
  // Set colors based on the active filter and dark mode status.
  showActive.style.color = activeFilter === 'active' ? (isDarkMode ? 'white' : 'black') : 'gray';
  showCompleted.style.color = activeFilter === 'completed' ? (isDarkMode ? 'white' : 'black') : 'gray';
}

const activateCheckbox = () => {
  const checkboxes = document.querySelectorAll('.todo-check');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const index = event.target.getAttribute('data-index');
      const toDo = todos[index];
      toDo.completed = checkbox.checked;

      if (activeFilter === 'all') {
        displayTodo();
      } else if (activeFilter === 'active') {
        const activeTodos = todos.filter(todo => !todo.completed);
        displayFilteredTodo(activeTodos);
      } else if (activeFilter === 'completed') {
        const completedTodos = todos.filter(todo => todo.completed);
        displayFilteredTodo(completedTodos);
      }

      updateButtonColor();
    });
  });
}

const activeFilterButtons = () => {
  const showAll = document.querySelector('.all');
  const showActive = document.querySelector('.active');
  const showCompleted = document.querySelector('.completed');
  showAll.addEventListener('click', () => {
    activeFilter = 'all';
    updateButtonColor();
    displayTodo();
  });
  showActive.addEventListener('click', () => {
    activeFilter = 'active';
    updateButtonColor();
    const activeTodos = todos.filter(todo => !todo.completed);
    displayFilteredTodo(activeTodos);
  });
  showCompleted.addEventListener('click', () => {
    activeFilter = 'completed';
    updateButtonColor();
    const completedTodos = todos.filter(todo => todo.completed);
    displayFilteredTodo(completedTodos);
  });
  const clearCompleted = document.querySelector('.clear-completed');
  clearCompleted.addEventListener('click', () => {
    activeFilter = 'all'; 
    updateButtonColor(); 
    todos = todos.filter(todo => !todo.completed);
    displayTodo();
  });

  updateButtonColor();
}

const displayFilteredTodo = (filteredTodos) => {
  let theTodoList = '';

  filteredTodos.forEach((toDo) => {
    const originalIndex = todos.findIndex(originalTodo => originalTodo.name === toDo.name && originalTodo.completed === toDo.completed);
    const completedClass = toDo.completed ? 'completed-task' : '';
    const disp = `
    <div class="new-todo" draggable="true">
    <input class="todo-check" type="checkbox" data-index="${originalIndex}" ${toDo.completed ? 'checked' : ''}>
    <label for="checkbox" data-index="${originalIndex}" ${toDo.completed ? 'checked' : ''}></label>
    <div class="${completedClass} list">${toDo.name}</div>
    <div class="delete-button">
    <button class="delete-todo" data-index="${originalIndex}">&times</button></div>
    </div>
    `;
    theTodoList += disp;
  });

 
  const activeCount = filteredTodos.filter(todo => !todo.completed).length;

  const filterCountSection = `
    <div class="endtext">
      <span class="items-left">${activeCount} items left</span> 
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


  const deleteTodoButtons = document.querySelectorAll('.delete-todo');
  deleteTodoButtons.forEach((deleteButton, index) => {
  deleteButton.addEventListener('click', () => {
    if (activeFilter === 'all') {
      deleteTodoAtIndex(index);
    } else {
      const trueIndex = todos.findIndex((todo, todoIndex) => {
        if (activeFilter === 'active') return !todo.completed && (filteredTodos[index].name === todo.name);
        if (activeFilter === 'completed') return todo.completed && (filteredTodos[index].name === todo.name);
      });
      deleteTodoAtIndex(trueIndex);
        }
    });
  });


  activeFilterButtons();
  updateButtonColor();
  activateCheckbox();
  dragAndDrop();
}


const deleteTodoAtIndex = (index) => {
  todos.splice(index, 1);
  maintainActiveFilter();
}

const maintainActiveFilter = () => {
  if (activeFilter === 'active') {
    displayFilteredTodo(todos.filter(todo => !todo.completed));
  } else if (activeFilter === 'completed') {
    displayFilteredTodo(todos.filter(todo => todo.completed));
  } else {
    displayTodo();
  }
  updateButtonColor(); 
}

const addToDo = () => {

   const toDoInput = document.querySelector('.todo-tab');
   const name = toDoInput.value;

   todos.push({name});
   
   
   toDoInput.value =  '';
   displayTodo();
  
}

const dragAndDrop = () => {
  let dragSrcElement = null;
  
  function handleDragStart(e){
    dragSrcElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }
  
  function handleDragOver(e){
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  }
  
  function handleDragEnter(e){
    this.classList.add('over');
  }
  
  function handleDragLeave(e){
    this.classList.remove('over');
  }
  
  function handleDrop(e){
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  
    if (dragSrcElement !== this) {
      dragSrcElement.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
  
    return false;
  }
  
  function handleDragEnd(){
    this.classList.remove('over');
  }
  
  // Add event listeners to enable drag and drop for each to-do item
  const ntodos = document.querySelectorAll('.new-todo');
  ntodos.forEach(ntodo => {
    ntodo.addEventListener('dragstart', handleDragStart);
    ntodo.addEventListener('dragover', handleDragOver);
    ntodo.addEventListener('dragenter', handleDragEnter);
    ntodo.addEventListener('dragleave', handleDragLeave);
    ntodo.addEventListener('drop', handleDrop);
    ntodo.addEventListener('dragend', handleDragEnd);
    });
}


const toggleButton = document.querySelector('.theme-toggle');
const lightModeImages = document.querySelectorAll('.lightmode');
const darkModeImages = document.querySelectorAll('.darkmode');

toggleButton.addEventListener('click', () => {
  // Toggle the visibility of light mode images
  lightModeImages.forEach((image) => {
    image.style.display = image.style.display === 'none' ? 'block' : 'none';
  });

  // Toggle the visibility of dark mode images
  darkModeImages.forEach((image) => {
    image.style.display = image.style.display === 'none' ? 'block' : 'none';
  });

  document.body.style.backgroundColor = darkModeImages[0].style.display === 'block' ? 'black' : 'hwb(0 98% 2%)';
});

toggleButton.addEventListener('click', toggleDarkMode)


//add a new item to the list
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
let activeFilter = 'all';

displayTodo();
activeFilterButtons();




