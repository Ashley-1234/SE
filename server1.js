const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;
  const newTodo = { id: Date.now(), task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;
  const todo = todos.find((t) => t.id == id);

  if (todo) {
    todo.task = task !== undefined ? task : todo.task;
    todo.completed = completed !== undefined ? completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id != id);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
