const chalk = require('chalk');

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

  for (const task of taskArr) {
    outputTask(task);
  }
};

module.exports = {
  outputTask,
  outputAllTasks,
};
