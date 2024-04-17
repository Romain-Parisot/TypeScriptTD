// Les trois option possible du chanmp priority
export var Priority;
(function (Priority) {
    Priority["Low"] = "Faible";
    Priority["Medium"] = "Moyenne";
    Priority["High"] = "Haute";
})(Priority || (Priority = {}));
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    TaskManager.prototype.addTask = function (task) {
        this.tasks.push(task);
    };
    TaskManager.prototype.deleteTask = function (taskIndex) {
        this.tasks.splice(taskIndex, 1);
    };
    TaskManager.prototype.modifyTask = function (taskIndex) {
        this.tasks[taskIndex].title = "New title";
    };
    return TaskManager;
}());
export default TaskManager;
