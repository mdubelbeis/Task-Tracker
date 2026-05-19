const { nanoid } = require('nanoid');

const { saveTasks } = require('../utils/taskStore');
const { outputTask, outputAllTasks } = require('../utils/taskOutput');

const createTask = (title, priority, taskList) => {
  const task = {
    id: nanoid(),
    title,
    priority: priority.toUpperCase(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  taskList.push(task);
  saveTasks(taskList);

  outputTask(task);
  console.log('Task Created');
};

const completeTask = (id, taskList) => {
  const task = findTaskById(id, taskList);

  if (!task) {
    console.log(`No task found with ID: ${id}`);
    return;
  }

  task.completed = true;
  saveTasks(taskList);

  outputTask(task);
  console.log('Task marked as complete');
};

const updateTaskTitle = (id, title, taskList) => {
  const task = findTaskById(id, taskList);

  if (!task) {
    console.log(`No task found with ID: ${id}`);
    return;
  }

  task.title = title;
  saveTasks(taskList);

  outputTask(task);
  console.log('Task title updated');
};

const updateTaskPriority = (id, priority, taskList) => {
  const task = findTaskById(id, taskList);

  if (!task) {
    console.log(`No task found with ID: ${id}`);
    return;
  }

  task.priority = priority.toUpperCase();
  saveTasks(taskList);

  outputTask(task);
  console.log('Task priority updated');
};

const deleteTask = (id, taskList) => {
  const task = findTaskById(id, taskList);

  if (!task) {
    console.log(`No task found with ID: ${id}`);
    return;
  }

  const updatedTaskList = taskList.filter((task) => id !== task.id);
  saveTasks(updatedTaskList);

  console.log('Task deleted');
};

const listTasks = (options, taskList) => {
  if (options.completed) {
    const filteredTasks = taskList.filter((task) => task.completed);
    return outputAllTasks(filteredTasks);
  }

  if (options.incomplete) {
    const filteredTasks = taskList.filter((task) => !task.completed);
    return outputAllTasks(filteredTasks);
  }

  outputAllTasks(taskList);
};

const isValidPriority = (priority) => {
  const priorities = ['HIGH', 'MEDIUM', 'LOW'];
  return priorities.includes(priority.toUpperCase());
};

const findTaskById = (id, taskList) => {
  return taskList.find((task) => id === task.id);
};

module.exports = {
  createTask,
  listTasks,
  completeTask,
  updateTaskTitle,
  updateTaskPriority,
  deleteTask,
  isValidPriority,
};
