const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>ζ­‘θΏδΎε° NodeJS app! ππππππππ</h1>
    <p>Try sending a request to /error and see what happens</p>
  `);
});

app.get('/error', (req, res) => {
  process.exit(1);
});

app.listen(8080);
