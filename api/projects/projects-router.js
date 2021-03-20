const express = require('express');
const server = require('../server.js');

const projects = require('./projects-model.js')

const router = express.Router();


//GET ALL PROJECTS
router.get('/', async (req, res) => {
    try {
        const projectsList = await projects.get();
        res.json(projectsList)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Could not get projects." })
    }
})

//GETS PROJECTS BY ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ message: "Nothing to see here!" })
        } else {
            const project = await projects.get(id)
            res.status(200).json(project)
        }
    } catch (err) {
        console.log(error)
        res.status(500).json({ message: "Could not get this project." })
    }
})

//GET ACTIONS IN A PROJECT
router.get('/:id/actions', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ message: "Nothing to see here!" })
        } else {
            const project = await projects.get(id)
            if (project) {
                res.status(200).json(project.actions)
            } else {
                res.status(404).json({ message: "Nothing to see here!" })
            }
        }
    } catch (err) {
        console.log(error)
        res.status(500).json({ message: "Could not get the actions." })
    }
})

//INSERTING PROJECT
router.post('/', async (req, res) => {
    try {
        const newProject = await projects.insert(req.body)
        if (!req.body || (req.body && Object.keys(req.body).length == 0)) {
            res.status(400).json({ message: "missing project data", status: 400 })
        } else {
            res.status(201).json(newProject)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Could not add this project." })
    }
})

//UPDATE PROJECT
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ message: "Nothing to see here!" })
        } else if (!req.body || (req.body && Object.keys(req.body).length == 0)) {
            res.status(400).json({ message: "missing project data", status: 400 })
        } else {
            const project = await projects.update(id, req.body)
            res.status(200).json(project)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Could not update this project." })
    }
})

//REMOVING PROJECT
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projects.remove(id)
        res.status(200).json(project)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Could not delete this project." })
    }
})


module.exports = router;