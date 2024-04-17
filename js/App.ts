import { updateTaskElement, createFormDom } from "./utils.js";
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





/// CRUD

// ON PAGE LOAD RÉCUPÉRER TOUTES LES TACHES DANS LE LOCALSTORAGE

// CAPTER L'ÉVÉNEMENT AJOUTER UNE TACHE

// CAPTER L'ÉVENEMENT JE MODIFIE UNE TACHE

// CAPTER L'ÉVÉNEMENT JE SUPPRIME UNE TACHE

// J'APPLIQUE UN FILTRE

// JE FAIS UNE RECHERCHE
