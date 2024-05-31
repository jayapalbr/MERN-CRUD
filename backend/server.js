const dotenv = require("dotenv").config();
const { connectDB } = require("./config/connectDB");
const mongoose = require("mongoose");
const express = require("express");
const Task = require("./models/taskModel");
const taskRoutes = require("./routes/taskRoute")
const app = express();
const cors= require("cors")

// const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks" ,taskRoutes);
// app.use(cors())


// const logger = (req, res, next)=>{
//     console.log("Middleware ran");
//     console.log(req.method)
//     next()
// }

//Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

//Create a task

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

//GET/Read Tasks

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

const PORT = process.env.PORT || 5000;

//mongodb+srv://jayapalreact45:<password>@jayapalcluster.yytazzt.mongodb.net/

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
