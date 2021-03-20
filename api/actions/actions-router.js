// Write your "actions" router here!
const express = require('express');
const server = require('../server.js');

const actions = require('./actions-model.js')

const router = express.Router();


// GETS ALL ACTIONS
router.get('/', async (req, res) => {
    try {
        const actionsList = await actions.get();
        res.json(actionsList)
    } catch (err) {
        console.log(error)
        res.status(500).json({ message: "Could not get actions." })
    }
})

//GETS ACTIONS BY ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const action = await actions.get(id)
        if (!id) {
            res.status(404).json({ message: "Nothing to see here!" })
        } else {
            res.status(200).json(action)
        }
    } catch (err) {
        console.log(error)
        res.status(500).json({ message: "Could not get this action." })
    }
})

//INSERTING ACTION
router.post('/', async (req, res) => {
    try {
        const newAction = await actions.insert(req.body)
        if (!req.body || (req.body && Object.keys(req.body).length == 0)) {
            res.status(400).json({ message: "missing user data", status: 400 })
        } else {
            res.status(201).json(newAction)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Could not add this action." })
    }
})

//UPDATE ACTION
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ message: "Nothing to see here!" })
        } else if (!req.body || (req.body && Object.keys(req.body).length == 0)) {
            res.status(400).json({ message: "missing user data", status: 400 })
        } else {
            const action = await actions.update(id, req.body)
            res.status(200).json(action)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Could not update this action." })
    }
})

//REMOVING ACTION
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const action = await actions.remove(id)
        res.status(200).json(action)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Could not delete this action." })
    }
})

module.exports = router;