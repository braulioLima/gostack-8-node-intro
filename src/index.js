const express = require('express');

const server = express();

server.use(express.json());

server.get('/',(req,res) => {
  return res.send('Hello World');
});

server.listen(3333);