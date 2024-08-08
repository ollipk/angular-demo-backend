import express from 'express';
import { TaskServiceImpl } from '../../services/TaskServiceImpl.js';

const router = express.Router();
const transactionService = new TaskServiceImpl();

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await transactionService.getAllTasks();
    return res.json(transactions);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

// Create a transaction
router.post('/', async (req, res) => {
  try {
    const transaction = await transactionService.createTask(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

// Get a single transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await transactionService.getTaskById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(transaction);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

// Update a transaction by ID
router.put('/:id', async (req, res) => {
  try {
    const transaction = await transactionService.updateTask(req.params.id, req.body);
    if (!transaction) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(transaction);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

// Delete a single transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await transactionService.deleteTask(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(transaction);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});


export default router;