const { Command } = require('commander');
const fs = require('fs');
const program = new Command();

program
  .name('Task Tracker')
  .description('CLI tool for task management')
  .version('1.0.0');

program
  .command('add')
  .description('Add task to file')
  .argument('<string>', 'Random Task')
  .action((str, options) => {
    try {
      fs.appendFile(`${__dirname}/task-list.txt`, `[ ] - ${str}\n`, (err) => {
        console.log('Task added to task list');
      });
    } catch (err) {
      console.log(err);
    }
  });

program
  .command('list')
  .description('Return task list')
  .action((str, options) => {
    try {
      fs.readFile(`${__dirname}/data/task-list.txt`, 'utf-8', (err, data) => {
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  });

program.parse();
