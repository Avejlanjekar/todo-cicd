const Todo = require("../models/todoModel");

// Get all todos
const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// Create todo
const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const todo = await Todo.create({ title });
  res.status(201).json(todo);
};

// Update todo
const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  const updatedTodo = await todo.save();
  res.json(updatedTodo);
};

// Delete todo
const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  await todo.deleteOne();
  res.json({ message: "Todo removed" });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};