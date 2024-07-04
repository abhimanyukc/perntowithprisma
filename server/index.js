const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Create a new todo
app.post('/api/todos', async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: { title }
  });
  res.json(todo);
});

// Get all todos
app.get('/api/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// Update a todo's title or completion status
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const data = {};
  if (title !== undefined) data.title = title;
  if (completed !== undefined) data.completed = completed;

  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data
  });
  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: parseInt(id) }
  });
  res.json({ message: 'Todo deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
