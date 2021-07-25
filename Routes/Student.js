import express from "express";

import { Student } from "../Models/Student.js";
const router = express.Router();

router
  .route("/student")
  .get(async (request, response) => {
    const student = await Student.find();
    response.send(student);
  })
  .post(async (request, response) => {
    const { name: name } = request.body;
    const addStudent = new Student({ name: name });

    try {
      const newStudent = await addStudent.save();
      response.send(newStudent);
    } catch (error) {
      response.status(500);
      response.send(error);
    }
  });

router
  .route("/student/:name")
  .get(async (request, response) => {
    const { name } = request.params;
    const student = await Student.findOne({ name });
    response.send(student);
  })
  .delete(async (request, response) => {
    const { name } = request.params;
    try {
      const student = await Student.findOne({ name: RegExp(name, "i") });
      await student.remove();
      response.send({ ...student.toObject(), message: "Deleted successfully" });
    } catch (err) {
      response.status(500);
      response.send("User is missing");
    }
  });

router.route("/student/add-mentor").post(async (request, response) => {
  const { name, mentorId } = request.body;
  try {
    name.map(async (id) => {
      const find = await Student.findOne({ _id: id });
      if (!find) return response.status(401).json("Student Not Found");
      // await Student.updateOne({ name: name }, { $push: { mentorId: mentorId } });
      find.mentorId = mentorId;
      await find.save();
      response.status(200).json({ message: "Mentor Assigned" });
    });
  } catch (err) {
    response.status(500).json({ error: "Server Error", err });
  }
});

router.route("/student/change-mentor").post(async (request, response) => {
  const { studentId, mentorId } = request.body;
  try {
    const find = await Student.findOne({ _id: studentId });
    if (!find) return response.status(401).json("Student Not Found");

    find.mentorId = mentorId;
    await find.save();
    response.status(200).json({ message: "Mentor Changed" });
  } catch (err) {
    response.status(500).json({ error: "Server Error", err });
  }
});

router.route("/student/find-by-mentor").post(async (request, response) => {
  const { mentorId } = request.body;
  try {
    const find = await Student.find({ mentorId: mentorId });
    if (!find) return response.status(401).json("Students Not Found");

    response.status(200).send(find);
  } catch (err) {
    response.status(500).json({ error: "Server Error", err });
  }
});

export const studentRouter = router;
