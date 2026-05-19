#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs');

const {
  createTask,
  listTasks,
  outputTask,
  outputAllTasks,
  completeTask,
  updateTaskTitle,
  updateTaskPriority,
  deleteTask,
  isValidPriority,
} = require('../utils/taskUtils');

const program = new Command();

const dbFile = `${__dirname}/../data/taskList.json`;

let taskList;

try {
  taskList = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
} catch (err) {
  return console.log('ERROR: ', err);
}

program
  .name('Task Tracker')
  .description('CLI tool for task management')
  .version('1.0.0');

program
  .command('add')
  .description('Add task')
  .argument('<title>', 'Set task title')
  .argument('<priority>', 'Set task priority')
  .action((title, priority) => {
    const isValid = isValidPriority(priority);

    isValid
      ? createTask(title, priority, taskList)
      : program.error(
          `Invalid priority provided: ${priority}\nPriority Options: [HIGH | MEDIUM | LOW]`
        );
  });

program
  .command('delete')
  .description('Delete task by Id')
  .argument('<id>', 'Task ID')
  .action((id) => deleteTask(id, taskList));

program
  .command('update-title')
  .description('Update task by Id')
  .argument('<id>', 'Task ID')
  .argument('<title>', 'Update title')
  .action((id, title) => updateTaskTitle(id, title, taskList));

program
  .command('update-priority')
  .description('Update task - [HIGH | MEDIUM | LOW]')
  .argument('<id>', 'Task ID')
  .argument('<priority>', 'Update priority')
  .action((id, priority) => {
    const isValid = isValidPriority(priority);

    isValid
      ? updateTaskPriority(id, priority, taskList)
      : program.error(
          `Invalid priority provided: ${priority}\nPriority Options: [HIGH | MEDIUM | LOW]`
        );
  });

program
  .command('task-complete')
  .description('Update task to complete')
  .argument('<id>', 'Task ID')
  .action((id) => completeTask(id, taskList));

program
  .command('list')
  .description('Return task list')
  .option('-c, --completed', 'completed tasks')
  .option('-i, --incomplete', 'incomplete tasks')
  .option('-a, --all', 'all tasks')
  .action((str, options) => listTasks(str, taskList));

program.parse();
