const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!
const actionsRouter = require('./actions/actions-router.js')
const projectsRouter = require('./projects/projects-router.js')


server.use(express.json());
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get(`/`, (req, res) => {
    res.send(`<h1>CodeGrade sucks!</h1>`)
})

module.exports = server;
