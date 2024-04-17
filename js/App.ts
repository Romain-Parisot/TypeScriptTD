import TaskManager, { Priority, Task } from "./Task.js";
const taskManager = new TaskManager();

// Add a new task

const form = document.querySelector("#taskForm");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("submit");

    const formData = new FormData(form as HTMLFormElement);

    const title = formData.get("title");
    const description = formData.get("description");
    const date = formData.get("date");
    const priority = formData.get("priority");
    const category = formData.get("category");

    // if not empty
    if (title && description && date && priority && category) {
      taskManager.addTask({
        title: title.toString(),
        description: description.toString(),
        date: date.toString(),
        priority: Priority[priority.toString() as keyof typeof Priority],
        category: { title: category.toString() },
      });

      console.log(taskManager.tasks);
      // cerate the task
      const taskElement = document.createElement("div");
      taskElement.className = `task ${priority.toString().toLowerCase()}`;
      taskElement.dataset.index = (taskManager.tasks.length - 1).toString();
      taskElement.innerHTML = `
        <h3>${title} <span>– Priorité ${Priority[priority.toString() as keyof typeof Priority]}</span></h3>
        <p>Catégorie: ${category}</p>
        <p>Date d'échéance: ${date}</p>
        <p>${description}</p>
        <button class="delete-btn" data-index="${taskManager.tasks.length - 1}" type="button">Supprimer</button>
        <button class="edit-btn" data-index="${taskManager.tasks.length - 1}" type="button">Modifier</button>
      `;

      const taskList = document.getElementById("tasks");
      if (taskList) {
        taskList.appendChild(taskElement);
      }

      // reset from after submit
      (form as HTMLFormElement).reset();
    } else {
      alert("Veuillez remplir tous les champs");
    }
  });
}

const taskList = document.getElementById("tasks");

if (taskList) {
  taskList.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    // if it is a delete button
    if (
      target &&
      target.dataset.index &&
      target.classList.contains("delete-btn")
    ) {
      // get index of the task
      const taskIndex = Number(target.dataset.index);
      // call deleteTask
      taskManager.deleteTask(taskIndex);
      // remove from dom
      if (target.parentElement) {
        taskList.removeChild(target.parentElement);
      }
    }
    // if it is a edit button
    if (
      target &&
      target.dataset.index &&
      target.classList.contains("edit-btn")
    ) {
      const taskIndex = Number(target.dataset.index);

      createFormDom(Number(target.dataset.index));
      const editFromSection = document.getElementById("editFrom");

      editFromSection!.addEventListener("click", (event) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target && target.id.match("addTask")) {
          const editTaskForm = document.getElementById(
            "editTaskForm",
          ) as HTMLFormElement;
          const formData = new FormData(editTaskForm);

          const title = formData.get("title");
          const description = formData.get("description");
          const date = formData.get("date");
          const priority = formData.get("priority");
          const category = formData.get("category");

          if (title && description && date && priority && category) {
            const taskPriority = Priority[priority as keyof typeof Priority];
            if (taskPriority !== undefined) {
              const editedTask: Task = {
                title: title.toString(),
                description: description.toString(),
                date: date.toString(),
                priority: taskPriority,
                category: { title: category.toString() },
              };

              // call modifyTask
              taskManager.modifyTask(editedTask, taskIndex);
              // update dom
              const taskElement = document.querySelector(
                `.task[data-index="${taskIndex}"]`,
              ) as HTMLElement;
              updateTaskElement(editedTask, taskElement);
            } else {
              console.error(`Invalid priority value: ${priority}`);
            }
          }
        }
        if (
          (target && target.id.match("cancel")) ||
          target.id.match("addTask")
        ) {
          const editForm = document.getElementById("editTaskForm");
          if (editForm) {
            editFromSection!.removeChild(editForm);
          }
        }
      });
    }
  });
}

function updateTaskElement(task: Task, taskElement: HTMLElement) {
  taskElement.innerHTML = `
    <h3>${task.title} <span>– Priorité ${task.priority}</span></h3>
    <p>Catégorie: ${task.category.title}</p>
    <p>Date d'échéance: ${task.date}</p>
    <p>${task.description}</p>
    <button type="button" data-index="${taskManager.tasks.indexOf(task)}" class="delete-btn">Supprimer</button>
    <button type="button" data-index="${taskManager.tasks.indexOf(task)}" class="edit-btn">Modifier</button>
  `;
}

function createFormDom(taskIndex: number) {
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
  title.value = taskManager.tasks[taskIndex].title;
  form.appendChild(title);

  // description
  let description = document.createElement("textarea");
  description.name = "description";
  title.type = "text";
  description.id = "taskDescription";
  description.placeholder = "Description de la tâche";
  description.value = taskManager.tasks[taskIndex].description;
  form.appendChild(description);

  // date
  let date = document.createElement("input");
  date.name = "date";
  date.type = "date";
  date.id = "taskDueDate";
  date.value = taskManager.tasks[taskIndex].date;
  form.appendChild(date);

  // priority
  let priority = document.createElement("select");
  priority.name = "priority";
  priority.id = "taskPriority";
  priority.value = taskManager.tasks[taskIndex].priority;

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
  category.value = taskManager.tasks[taskIndex].category.title;
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

/// CRUD

// ON PAGE LOAD RÉCUPÉRER TOUTES LES TACHES DANS LE LOCALSTORAGE

// CAPTER L'ÉVÉNEMENT AJOUTER UNE TACHE

// CAPTER L'ÉVENEMENT JE MODIFIE UNE TACHE

// CAPTER L'ÉVÉNEMENT JE SUPPRIME UNE TACHE

// J'APPLIQUE UN FILTRE

// JE FAIS UNE RECHERCHE
