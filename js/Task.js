// Les trois option possible du chanmp priority
export var Priority;
(function (Priority) {
    Priority["low"] = "Faible";
    Priority["medium"] = "Moyenne";
    Priority["high"] = "Haute";
})(Priority || (Priority = {}));
var TaskManager = /** @class */ (function () {
    function TaskManager(initialTasks) {
        this.tasks = initialTasks ? initialTasks : [];
    }
    TaskManager.prototype.addTask = function (task) {
        this.tasks.push(task);
    };
    TaskManager.prototype.deleteTask = function (taskIndex) {
        this.tasks.splice(taskIndex, 1);
    };
    TaskManager.prototype.modifyTask = function (task, taskIndex) {
        this.tasks[taskIndex] = task;
    };
    TaskManager.prototype.filterTasks = function (priority, date, category) {
        return this.tasks.filter(function (task) {
            return (priority === 'all' || task.priority === priority) &&
                (!date || task.date === date) &&
                (!category || task.category.title === category);
        });
    };
    return TaskManager;
}());
export default TaskManager;
