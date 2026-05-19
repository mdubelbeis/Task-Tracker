const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const { nanoid } = require('nanoid');

const program = new Command();
const priorities = ['HIGH', 'MEDIUM', 'LOW'];
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
  .description('Add task to file')
  .argument('<title>', 'Set task title')
  .argument('<priority>', 'Set task priority')
  .action((title, priority) => {
    const newTask = {
      id: nanoid(),
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    taskList.push(newTask);

    try {
      fs.writeFile(dbFile, JSON.stringify(taskList), (err) => {
        if (err) throw new Error('Unable to write to file');

        console.log('Task List updated');
      });
    } catch (err) {
      console.log('ERROR: ', err);
    }
  });

program
  .command('delete')
  .description('Delete task by Id')
  .argument('<id>', 'Task ID')
  .action((id) => {
    try {
      const updatedTaskList = taskList.filter((task) => id !== task.id);

      fs.writeFile(dbFile, JSON.stringify(updatedTaskList), (err) => {
        if (err) return log(error);

        console.log('Item removed. Task list updated');
      });
    } catch (err) {
      console.log('Error: ', err);
    }
  });

program
  .command('update-title')
  .description('Update task by Id')
  .argument('<id>', 'Task ID')
  .argument('<title>', 'Update title')
  .action((id, title) => {
    try {
      const updatedTaskList = taskList.filter((task) => id === task.id);
      updatedTaskList[0].title = title;
      taskList = Object.assign(taskList, updatedTaskList[0]);

      fs.writeFile(dbFile, JSON.stringify(taskList), (err) => {
        if (err) return log(error);

        console.log('Title updated. Task list updated');
      });
    } catch (err) {
      console.log('Error: ', err);
    }
  });

program
  .command('update-priority')
  .description('Update task by Id')
  .argument('<id>', 'Task ID')
  .argument('<priority>', 'Update priority')
  .action((id, priority) => {
    try {
      const updatedTaskList = taskList.filter((task) => id === task.id);
      updatedTaskList[0].priority = priority;
      taskList = Object.assign(taskList, updatedTaskList[0]);

      fs.writeFile(dbFile, JSON.stringify(taskList), (err) => {
        if (err) return log(error);

        console.log('Priority updated. Task list updated');
      });
    } catch (err) {
      console.log('Error: ', err);
    }
  });

program
  .command('list')
  .description('Return task list')
  .option('-c, --completed', 'completed tasks')
  .option('-i, --incomplete', 'incomplete tasks')
  .action((str, options) => {
    if (str.completed) {
      const filteredTasks = taskList.filter((task) => task.completed);

      for (let task of filteredTasks) {
        console.log();
        console.log(`id: ${task.id}`);
        console.log(`title: ${task.title}`);
        console.log(`completed: ${chalk.green('COMPLETED')}`);
        console.log(`priority: ${task.priority}`);
        console.log(`createdAt: ${task.createdAt}`);
        console.log();
      }
      return;
    }

    if (str.incomplete) {
      const filteredTasks = taskList.filter((task) => !task.completed);

      for (let task of filteredTasks) {
        console.log();
        console.log(`id: ${task.id}`);
        console.log(`title: ${task.title}`);
        console.log(`completed: ${chalk.red('INCOMPLETE')}`);
        console.log(`priority: ${task.priority}`);
        console.log(`createdAt: ${task.createdAt}`);
        console.log();
      }
      return;
    }

    for (let task of taskList) {
      console.log();
      console.log(`id: ${task.id}`);
      console.log(`title: ${task.title}`);
      console.log(
        `completed: ${task.completed ? chalk.green('COMPLETED') : chalk.red('INCOMPLETE')}`
      );
      console.log(`priority: ${task.priority}`);
      console.log(`createdAt: ${task.createdAt}`);
      console.log();
      return;
    }
  });

program.parse();
