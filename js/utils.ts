import TaskManager, { Task } from "./Task.js";
const savedTasks = localStorage.getItem("taskList");
const storedTaskList = savedTasks ? JSON.parse(savedTasks) : [];
const taskManager = new TaskManager(storedTaskList);

export function updateTaskElement(task: Task, taskElement: HTMLElement) {
  taskElement.innerHTML = `
    <h3>${task.title} <span>– Priorité ${task.priority}</span></h3>
    <p>Catégorie: ${task.category.title}</p>
    <p>Date d'échéance: ${task.date}</p>
    <p>${task.description}</p>
    <button type="button" data-index="${taskManager.tasks.indexOf(task)}" class="delete-btn">Supprimer</button>
    <button type="button" data-index="${taskManager.tasks.indexOf(task)}" class="edit-btn">Modifier</button>
  `;
}

export function createFormDom(taskIndex: number) {
  // Create a form in the dom like a popup
  // Same form template as the one in index.html, thanks GPT for the conversion from html to dom creating form
  let form = document.createElement("form");
  form.id = "editTaskForm";

  // title
  let title = document.createElement("input");
  title.name = "title";
  title.type = "text";
  title.id = "taskTitle";
  title.placeholder = "Titre de la tâche";
  title.required = true;
  console.log(taskManager.tasks);
  
  if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
    title.value = taskManager.tasks[taskIndex].title;
  }
  form.appendChild(title);

  // description
  let description = document.createElement("textarea");
  description.name = "description";
  title.type = "text";
  description.id = "taskDescription";
  description.placeholder = "Description de la tâche";
  if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
    description.value = taskManager.tasks[taskIndex].description;
  }
  form.appendChild(description);

  // date
  let date = document.createElement("input");
  date.name = "date";
  date.type = "date";
  date.id = "taskDueDate";
  if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
    date.value = taskManager.tasks[taskIndex].date;
  }
  form.appendChild(date);

  // priority
  let priority = document.createElement("select");
  priority.name = "priority";
  priority.id = "taskPriority";
  if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
    priority.value = taskManager.tasks[taskIndex].priority;
  }


  let optionLow = document.createElement("option");
  optionLow.value = "low";
  optionLow.textContent = "Faible";
  priority.appendChild(optionLow);

  let optionMedium = document.createElement("option");
  optionMedium.value = "medium";
  optionMedium.textContent = "Moyenne";
  optionMedium.selected = true;
  priority.appendChild(optionMedium);

  let optionHigh = document.createElement("option");
  optionHigh.value = "high";
  optionHigh.textContent = "Haute";
  priority.appendChild(optionHigh);

  form.appendChild(priority);

  // category
  let category = document.createElement("input");
  category.name = "category";
  category.type = "text";
  category.id = "taskCategory";
  category.placeholder = "Nom de la Categorie";
  if (taskManager && taskManager.tasks && taskManager.tasks[taskIndex]) {
    category.value = taskManager.tasks[taskIndex].category.title;
  }
  form.appendChild(category);

  // submit button
  let submit = document.createElement("button");
  submit.type = "submit";
  submit.id = "addTask";
  submit.textContent = "Ajouter Tâche";
  form.appendChild(submit);

  // cancel button
  let cancel = document.createElement("button");
  cancel.type = "submit";
  cancel.id = "cancel";
  cancel.textContent = "Annuler";
  form.appendChild(cancel);

  const editFromSection = document.getElementById("editFrom");

  editFromSection?.appendChild(form);
}

export function deleteAllTasks() {
  const taskList = document.getElementById("tasks");
  if (taskList) {
    taskList.innerHTML = "";
  }
}

export function renderTasks(taskManager: TaskManager) {
  const taskList = document.getElementById("tasks");
  if (taskList) {
    taskManager.tasks.forEach((task, index) => {
      const taskElement = document.createElement("div");
      let classPriority: string = "";
      switch (task.priority.toLowerCase()) {
        case "faible":
          classPriority = "low";
          break;
        case "moyenne":
          classPriority = "medium";
          break;
        case "haute":
          classPriority = "high";
          break;
      }
      taskElement.className = `task ${classPriority}`;
      taskElement.dataset.index = index.toString();
      taskElement.innerHTML = `
        <h3>${task.title} <span>– Priorité ${task.priority}</span></h3>
        <p>Catégorie: ${task.category.title}</p>
        <p>Date d'échéance: ${task.date}</p>
        <p>${task.description}</p>
        <button class="delete-btn" data-index="${index}" type="button">Supprimer</button>
        <button class="edit-btn" data-index="${index}" type="button">Modifier</button>
      `;

      taskList.appendChild(taskElement);
    });
  }
}
