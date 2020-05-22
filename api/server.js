const express = require('express');
const router = require("./router");

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
})



server.use("/users", router);

module.exports = server;

