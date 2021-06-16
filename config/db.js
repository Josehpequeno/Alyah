require('dotenv/config');
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});
client.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
    } else {
        console.log('connection established');
    }
});
/*
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});*/
module.exports = client;
