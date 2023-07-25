const dateElement = document.querySelector('#date');
const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};
const currentDate = new Date().toLocaleDateString('fr-FR', dateOptions);
dateElement.textContent = currentDate;

const hourHand = document.querySelector('#hour_clock');
const minuteHand = document.querySelector('#minute_clock');
const secondHand = document.querySelector('#seconde_clock');

function setClock() {
  const currentDate = new Date();
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
  requestAnimationFrame(setClock);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360);
}

setClock();

const input = document.querySelector('#input');
let id = 1;
const tasks = {};

document.addEventListener('keyup', function (e) {
  if (e.key === 'Enter' && input.value !== '') {
    const toDo = input.value.trim();
    addTask(toDo, id);
    input.value = '';
    id++;
  }
});

function addTask(toDo, id) {
  const listItem = createTaskElement(toDo, id);
  list.appendChild(listItem);

  tasks[id] = {
    name: toDo,
    done: false
  };
}

function createTaskElement(toDo, id) {
  const listItem = document.createElement('li');
  listItem.classList.add('item');
  listItem.id = `item-${id}`;

  const circleIcon = document.createElement('i');
  circleIcon.classList.add('co', 'fa', 'fa-circle-thin');
  circleIcon.setAttribute('job', 'complete');
  circleIcon.addEventListener('click', () => toggleTaskCompletion(id));

  const taskText = document.createElement('p');
  taskText.classList.add('text');
  taskText.textContent = toDo;

  const editIcon = document.createElement('i');
  editIcon.classList.add('ed', 'fa', 'fa-pencil');
  editIcon.setAttribute('job', 'edit');
  editIcon.addEventListener('click', () => editTask(id));

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('de', 'fa', 'fa-trash-o');
  deleteIcon.setAttribute('job', 'delete');
  deleteIcon.addEventListener('click', () => removeTask(id));

  listItem.appendChild(circleIcon);
  listItem.appendChild(taskText);
  listItem.appendChild(editIcon);
  listItem.appendChild(deleteIcon);

  return listItem;
}

function editTask(id) {
  const listItem = document.getElementById(`item-${id}`);
  const taskText = listItem.querySelector('.text');
  const task = tasks[id];
  const editedText = prompt('Modifier la tâche :', task.name);

  if (editedText !== null) {
    task.name = editedText;
    taskText.textContent = editedText;
  }
}

function removeTask(id) {
  delete tasks[id];
  const listItem = document.getElementById(`item-${id}`);
  listItem.remove();
}

function toggleTaskCompletion(id) {
  const listItem = document.getElementById(`item-${id}`);
  const circleIcon = listItem.querySelector('.co');
  const taskText = listItem.querySelector('.text');
  const task = tasks[id];

  if (task.done) {
    task.done = false;
    circleIcon.classList.remove('fa-circle-check');
    circleIcon.classList.add('fa-circle-thin');
    taskText.classList.remove('completeItem');
  } else {
    task.done = true;
    circleIcon.classList.remove('fa-circle-thin');
    circleIcon.classList.add('fa-circle-check');
    taskText.classList.add('completeItem');
  }
}

document.querySelector('#addBtn').addEventListener('click', function () {
  const toDo = input.value.trim();
  if (toDo !== '') {
    addTask(toDo, id);
    input.value = '';
    id++;
  }
});
