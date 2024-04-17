import { Category } from "./Category.js";

// Les trois option possible du chanmp priority
export enum Priority {
  low = "Faible",
  medium = "Moyenne",
  high = "Haute"
}

// interface Task
interface Task {
  title: string;
  description: string;
  date: string;
  priority: Priority;
  category: Category;
}

// interface TaskManager
interface TaskManagerInterface {
  addTask(task: Task): void;
  deleteTask(taskIndex: number): void;
  modifyTask(taskIndex: number): void;
}

class TaskManager implements TaskManagerInterface {
  public tasks: Task[] = [];

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  deleteTask(taskIndex: number): void {
    this.tasks.splice(taskIndex, 1);
  }

  modifyTask(taskIndex: number): void {
    this.tasks[taskIndex].title = "New title";
  }
}

export default TaskManager;

