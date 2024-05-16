const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const flight = require('flight');

const app = flight.app();

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nejla198',
    database: 'mydatabase'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Define middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.sendStatus(401);
    } else {
        jwt.verify(token, 'your_secret_key', (err, decoded) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.user = decoded;
                next();
            }
        });
    }
};

// Define routes
app.get('/users', authenticateJWT, (req, res) => {
    let sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

const PORT = 3306;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
