const express = require("express");
const Task = require("../models/taskModel");
const { createTask, getTasks ,getTask,deleteTask, updateTask} = require("../controllers/taskController");
const router = express.Router();

router.route("/").get(getTasks).post(createTask)
router.route("/:id").get(getTask).delete(deleteTask).put(updateTask)
// router.post("/", createTask);
// router.get("/", getTasks);
// router.get("/:id", getTask);
// router.delete("/:id", deleteTask);
// router.put("/:id", updateTask);
// router.patch("/:id", updateTask);


module.exports = router;
