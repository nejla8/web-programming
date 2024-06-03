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

const mysql = require('mysql');

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});


// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Define middleware for JWT authentication
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization; 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'j43Jc#hD78!92mQP9aLs6Fy$xZ@tVbE&', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        req.user = decoded;
        next(); 
    });
};

app.use(authenticateJWT);

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


app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


