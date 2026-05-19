const chalk = require('chalk');
const fs = require('fs');
const { nanoid } = require('nanoid');

const dbFile = `${__dirname}/../data/taskList.json`;

const createTask = (title, priority, taskList) => {
  const newTask = {
    id: nanoid(),
    title,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  taskList.push(newTask);
  outputTask(newTask);

  try {
    fs.writeFile(dbFile, JSON.stringify(taskList, null, 2), (err) => {
      if (err) throw new Error('Unable to write to file');

      console.log('Task List updated');
    });
  } catch (err) {
    console.log('ERROR: ', err);
  }
};

const completeTask = (id, taskList) => {
  try {
    const updatedTaskList = taskList.filter((task) => id === task.id);

    updatedTaskList[0].completed = true;

    taskList = Object.assign(taskList, updatedTaskList[0]);

    fs.writeFile(dbFile, JSON.stringify(taskList, null, 2), (err) => {
      outputTask(updatedTaskList[0]);
      console.log(`Task marked as complete`);
    });
  } catch (err) {
    console.log('Error: ', err);
  }
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
    console.log();
    console.log(`id: ${task.id}`);
    console.log(`title: ${task.title}`);
    console.log(
      `completed: ${task.completed ? chalk.green('COMPLETED') : chalk.red('INCOMPLETE')}`
    );
    console.log(`priority: ${task.priority}`);
    console.log(`createdAt: ${task.createdAt}`);
    console.log();
  }
};

const updateTaskTitle = (id, title, taskList) => {
  try {
    const updatedTaskList = taskList.filter((task) => id === task.id);

    updatedTaskList[0].title = title;

    taskList = Object.assign(taskList, updatedTaskList[0]);

    fs.writeFile(dbFile, JSON.stringify(taskList, null, 2), (err) => {
      if (err) return log(error);
      outputTask(updatedTaskList[0]);
      console.log(`Task title updated. Task list updated`);
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const updateTaskPriority = (id, priority, taskList) => {
  try {
    const updatedTaskList = taskList.filter((task) => id === task.id);

    updatedTaskList[0].priority = priority;

    taskList = Object.assign(taskList, updatedTaskList[0]);

    fs.writeFile(dbFile, JSON.stringify(taskList, null, 2), (err) => {
      if (err) return console.log(err);
      outputTask(updatedTaskList[0]);
      console.log(`Task priority updated`);
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const deleteTask = (id, taskList) => {
  try {
    const updatedTaskList = taskList.filter((task) => id !== task.id);

    fs.writeFile(dbFile, JSON.stringify(updatedTaskList, null, 2), (err) => {
      if (err) return log(error);

      console.log('Item removed. Task list updated');
    });
  } catch (err) {
    console.log('Error: ', err);
  }
};

const listTasks = (str, taskList) => {
  if (str.completed) {
    const filteredTasks = taskList.filter((task) => task.completed);
    return outputAllTasks(filteredTasks);
  }

  if (str.incomplete) {
    const filteredTasks = taskList.filter((task) => !task.completed);
    return outputAllTasks(filteredTasks);
  }

  if (str.all) {
    outputAllTasks(taskList);
  }
};

const isValidPriority = (priority) => {
  const priorities = ['HIGH', 'high', 'MEDIUM', 'medium', 'LOW', 'low'];
  return priorities.includes(priority);
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
