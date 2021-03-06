import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { mentorRouter } from "./Routes/Mentor.js";
import { studentRouter } from "./Routes/Student.js";

const app = express();
const PORT =  process.env.PORT;

const url = process.env.MONGO_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => console.log("MongoDB Connected..."));

app.use(express.json());
app.use(cors());


app.use("/", mentorRouter);
app.use("/", studentRouter);
app.get("/", (request, response) => {
  response.send("Welcome To Bhide Tutions.!.!.!");
});



app.listen(PORT, () => console.log("Server Started.!!!!!!!!"));
