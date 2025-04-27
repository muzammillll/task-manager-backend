const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../public'));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dragon5*',   // your MySQL password
  database: 'task_manager'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database ✅');
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    db.query(sql, [title, description], (err, result) => {
      if (err) return res.json({ success: false, error: err });
      res.json({ success: true, message: 'Task created successfully!' });
    });
  });

  // Get all tasks
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
      if (err) return res.json({ success: false, error: err });
      res.json({ success: true, tasks: results });
    });
  });

  // Update a task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const sql = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
    db.query(sql, [title, description, id], (err, result) => {
      if (err) return res.json({ success: false, error: err });
      res.json({ success: true, message: 'Task updated successfully!' });
    });
  });

  // Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) return res.json({ success: false, error: err });
      res.json({ success: true, message: 'Task deleted successfully!' });
    });
  });
  

// Test route
app.get('/', (req, res) => {
  res.send('Server is working!');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000 🚀');
});
