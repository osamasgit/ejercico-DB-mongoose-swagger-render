const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");

//CREATE TASK
router.post("/create", async(req, res) => {
    try {
        const task = await Task.create({...req.body, completed: false });
        res.status(201).send({ message: "Task successfully created", task });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});

//GET TASKS

router.get("/", async(req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (error) {
        console.error(error);
    }
});

//MARK TASK AS COMPLETED (en este endpoint SOLO le permitimos que edite el titulo)

router.put("/markAsCompleted/:_id", async(req, res) => {
        try {
            const id = req.params.id
            const title = req.body.title
            const updateTitleTask = await Task.findByIdAndUpdate(id, 
            {title}, {new: true}
            )
            res.send({ message: "Task successfully updated", updateTitleTask });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem trying to update the task with _id: " +
                    req.params._id,
            });
        }
    }),

    //DELETE TASK

    router.delete("/id/:_id", async(req, res) => {
        try {
            const task = await Task.findByIdAndDelete(req.params._id);
            res.send({ message: "task deleted", task });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({ message: "There was a problem trying to delete a task" });
        }
    })
module.exports = router;