import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  mentorId: String,
});

export const Student = mongoose.model("student", studentSchema);
