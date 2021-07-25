import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

export const Mentor = mongoose.model("mentor", mentorSchema);
