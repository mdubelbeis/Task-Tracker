# Task Tracker CLI

A simple command-line task tracker built with Node.js.

*WORK IN PROGRESS*

---

## Features

- Add a task
- List all tasks
- List completed tasks
- List incomplete tasks
- Mark a task as complete
- Update a task title
- Update a task priority
- Delete a task
- Store tasks in a local JSON file

---

## Tech Used

- Node.js
- Commander
- Chalk
- Nano ID
- JSON file storage

---

## Project Structure

```text
task-tracker-cli/
bin/
- index.js
data/
- taskList.json
utils/
- taskUtils.js
- taskStore.js
- taskOutput.js
package.json
README.md
```
---

## Main Files

bin/index.js

The main CLI entry file.

This file handles the command-line commands using Commander.

Example commands handled here:

- add
- list
- complete
- update-title
- update-priority
- delete

---

utils/taskUtils.js

Contains the main task behavior.

Examples:

- createTask()
- completeTask()
- updateTaskTitle()
- updateTaskPriority()
- deleteTask()
- listTasks()
- isValidPriority()

---

utils/taskStore.js

Handles reading and writing task data.

Examples:

```js
loadTasks()
saveTasks()
```

The app stores task data in:

data/taskList.json

---

utils/taskOutput.js

Handles formatting task output in the terminal.

Examples:

```js
outputTask()
outputAllTasks()
```
---

## Installation

Install dependencies:

```bash
npm install
```

---

## Run with Node Directly

You can run the app directly with Node:

```bash
node ./bin/index.js list
```

Examples:

```bash
node ./bin/index.js add "Study Node CLI" high
node ./bin/index.js list
node ./bin/index.js list --completed
node ./bin/index.js list --incomplete
node ./bin/index.js complete <task-id>
node ./bin/index.js update-title <task-id> "New task title"
node ./bin/index.js update-priority <task-id> medium
node ./bin/index.js delete <task-id>
```
---

## Run as a CLI Command

The CLI command name is: 

```text
task
```

First, make the entry file executable:

```bash
chmod +x ./bin/index.js
```

Then link the project locally:

```bash
npm link
```

Now you can run the CLI from anywhere:

```bash
task list
```

Examples:

```bash
task add "Study Node CLI" high
task list
task list --completed
task list --incomplete
task complete <task-id>
task update-title <task-id> "New task title"
task update-priority <task-id> low
task delete <task-id>
```

---

## Commands

Add a task:

```bash
task add "Task title" high
```

Priority options:

```text
high
medium
low
```

The app stores priorities in uppercase:

HIGH
MEDIUM
LOW

---

List all tasks:

```bash
task list
```
---

List completed tasks:

```bash
task list --completed
```
or:

```bash
task list -c
```
---

List incomplete tasks:

```bash
task list --incomplete
```

or:

```bash
task list -i
```
---

Mark a task as complete:

```bash
task complete <task-id>
```

Example:

```bash
task complete V1StGXR8_Z5jdHi6B-myT
```

---

Update a task title:

```bash
task update-title <task-id> "Updated title"
```

Example:

```bash
task update-title V1StGXR8_Z5jdHi6B-myT "Finish CLI README"
```

---

Update a task priority:

```bash
task update-priority <task-id> low
```

Example:

```bash
task update-priority V1StGXR8_Z5jdHi6B-myT medium
```

---

Delete a task:

```bash
task delete <task-id>
```

Example:

```bash
task delete V1StGXR8_Z5jdHi6B-myT
```

---

## Task Data Shape

Each task looks like this:

```json
{
"id": "V1StGXR8_Z5jdHi6B-myT",
"title": "Study Node CLI",
"priority": "HIGH",
"completed": false,
"createdAt": "2026-05-18T00:00:00.000Z"
}
```

---

## Data Storage

Tasks are stored locally in:

```text
data/taskList.json
```

If the file does not exist, the app creates it automatically with an empty array:

[]

---

## Current Status

The app currently supports basic task management from the terminal.

---

## Future Improvements

- Add due dates
- Add task categories
- Add task search
- Add task sorting
- Add task editing with options
- Add a single update command
- Add better error messages
- Add confirmation before deleting
- Add colored priority output
- Add TypeScript
- Add tests
- Publish as an npm package

---

## Notes

This is a learning project.

The main goal is not to build a perfect production-ready CLI tool yet. The goal is to understand the flow of a CLI application:

1. Read tasks from JSON
2. Modify the task list
3. Save the updated task list
4. Show useful output in the terminal
