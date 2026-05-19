const chalk = require('chalk');
const fs = require('fs');
const { nanoid } = require('nanoid');
const { CLIENT_RENEG_WINDOW } = require('tls');

const dbFile = `${__dirname}/../data/taskList.json`;

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
  console.log('Tasks marked as complete');
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

  taskList = taskList.filter((task) => id !== task.id);
  saveTasks(taskList);

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

const outputTask = (task) => {
  console.log();
  console.log(`id: ${task.id}`);
  console.log(`title: ${task.title}`);
  console.log(
    `completed: ${task.completed ? chalk.green('COMPLETED') : chalk.red('INCOMPLETE')}`
  );
  console.log(`priority: ${task.priority}`);
  console.log(`createdAt: ${task.createdAt}`);
  console.log();
};

const outputAllTasks = (taskArr) => {
  console.log('=========================');
  console.log(`Tasks: ${taskArr.length}`);
  console.log('=========================');

  for (let task of taskArr) {
    outputTask(task);
  }
};

const saveTasks = (taskList) => {
  fs.writeFileSync(dbFile, JSON.stringify(taskList, null, 2));
};

const findTaskById = (id, taskList) => {
  return taskList.find((task) => id === task.id);
};

module.exports = {
  createTask,
  listTasks,
  completeTask,
  outputTask,
  outputAllTasks,
  updateTaskTitle,
  updateTaskPriority,
  deleteTask,
  isValidPriority,
};
