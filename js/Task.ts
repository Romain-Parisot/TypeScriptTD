import { Category } from "./Category.js";

// Les trois option possible du chanmp priority
export enum Priority {
  low = "Faible",
  medium = "Moyenne",
  high = "Haute",
}

// interface Task
export interface Task {
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
  modifyTask(task: Task, taskIndex: number): void;
}

class TaskManager implements TaskManagerInterface {
  public tasks: Task[];

  constructor(initialTasks?: Task[]) {
    this.tasks = initialTasks ? initialTasks : [];
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  deleteTask(taskIndex: number): void {
    this.tasks.splice(taskIndex, 1);
  }

  modifyTask(task: Task, taskIndex: number): void {
    this.tasks[taskIndex] = task;
  }

  filterTasks(priority: string, date: string, category: string): Task[] {
        return this.tasks.filter(task => {
            return (priority === 'all' || task.priority === priority) &&
              (!date || task.date === date) &&
              (!category || task.category.title === category);
              
        });
    }
}

export default TaskManager;
