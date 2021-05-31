const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7',
    database: 'helpandemia'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar com a base...', err);
        return;
    }
    console.log('Conectado!');
});

module.exports = connection;