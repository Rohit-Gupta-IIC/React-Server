const http = require('http');
const mysql = require('mysql');

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

const server = http.createServer((req, res) => {
    console.log(req.url);

    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');

	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}

    if (req.url === '/createdb' && req.method === 'GET') {
        let sql = 'CREATE DATABASE IF NOT EXISTS nodejs';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Database created...');
            res.end();
        });
    }
    else if (req.url === '/createtable' && req.method === 'GET') {
        let sql = 'CREATE TABLE IF NOT EXISTS OrderDetails(id int AUTO_INCREMENT, Name VARCHAR(255), Mobile INT(10), Email VARCHAR(255), Menu VARCHAR(255), Extra VARCHAR(255), PRIMARY KEY(id))';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Table created...');
            res.end();
        });
    }
    else if (req.url === '/getall' && req.method === 'GET') {
        let sql = 'SELECT * FROM OrderDetails';
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(JSON.stringify(result));
            res.end();
        });
    }
    else if (req.url === '/insert' && req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on('end', () => {
            let form = JSON.parse(body);
            let sql = `INSERT INTO OrderDetails(Name, Mobile, Email, Menu, Extra) VALUES ('${form.name}', '${form.mobile}', '${form.email}', '${form.dropdown}', '${form.order}')`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('Order placed...');
                res.end();
            });
        });
    }
})

server.listen(5000, () => {
    console.log('Server started on port 5000');
})