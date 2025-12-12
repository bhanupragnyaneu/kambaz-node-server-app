import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    description: String,
    points: Number,
    due: String,
    until: String,
    availableDate: String,
    availableUntilDate: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
