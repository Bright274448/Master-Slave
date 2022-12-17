const express = require('express');
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
});

// Connect to the database
connection.connect();

// Create an Express app
const app = express();

// Define a route to retrieve all customers
app.get('/customers', function (req, res) {
  connection.query('SELECT * FROM customers', function (error, results, fields) {
    if (error) throw error;

    res.json(results);
  });
});

// Define a route to retrieve a single customer by ID
app.get('/customers/:id', function (req, res) {
  connection.query('SELECT * FROM customers WHERE id = ?', [req.params.id], function (error, results, fields) {
    if (error) throw error;

    res.json(results[0]);
  });
});

// Define a route to create a new customer
app.post('/createuser', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  connection.query('INSERT INTO customers (name, email) VALUES (?, ?)', [name, email], function (error, results, fields) {
    if (error) throw error;

    res.json({ id: results.insertId });
  });
});

// Start the server
const port = 3000;
app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});