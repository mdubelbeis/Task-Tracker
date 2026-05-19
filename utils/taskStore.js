const fs = require('fs');

const dbFile = `${__dirname}/../data/taskList.json`;

const saveTasks = (taskList) => {
  fs.writeFileSync(dbFile, JSON.stringify(taskList, null, 2));
};

const loadTasks = () => {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([], null, 2));
  }

  return JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
};

module.exports = {
  loadTasks,
  saveTasks,
};
