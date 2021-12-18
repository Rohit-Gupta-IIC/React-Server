const mysql = require('mysql');
const express = require('express');
const cors=require("cors");
const bodyparser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

app.use(bodyparser.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS nodejs';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS OrderDetails(id int AUTO_INCREMENT, Name VARCHAR(255), Mobile INT(10), Email VARCHAR(255), Menu VARCHAR(255), Extra VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('table created...');
    });
});

app.get('/getall', (req, res) => {
    let sql = 'SELECT * FROM OrderDetails';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/insert', (req, res) => {
    console.log(req.body);
    let form = req.body;
    let sql = `INSERT INTO OrderDetails(Name, Mobile, Email, Menu, Extra) VALUES ('${form.name}', '${form.mobile}', '${form.email}', '${form.dropdown}', '${form.order}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post added...');
    });
});