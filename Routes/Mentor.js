import express from "express";

import { Mentor } from "../Models/Mentor.js";
const router = express.Router();

router
  .route("/mentor")
  .get(async (req, res) => {
    const mentor = await Mentor.find();
    res.send(mentor);
  })
  .post(async (req, res) => {
    const { name } = req.body;
    const addMentor = new Mentor({ name: name });

    try {
      const newMentor = await addMentor.save();
      res.status(200).send(newMentor);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });

router
  .route("/mentor/:name")
  .get(async (req, res) => {
    const { name } = req.params;
    const mentor = await Mentor.find({ name: RegExp(name, "i") });
    res.send(mentor);
  })
  .delete(async (req, res) => {
    const { name } = req.params;
    try {
      const mentor = await Mentor.findOne({ name: RegExp(name, "i") });
      await mentor.remove();
      res.send({ message: "Deleted successfully" });
    } catch (err) {
      res.status(500);
      res.send("User is missing");
    }
  });

export const mentorRouter = router;
