import mongoose from "mongoose";
mongoose.pluralize(null)

const mentorSchema = new mongoose.Schema({
    name: "String",
    image: "String",
    profileLink: "String",
    designation: "String",
    department: "String",
    areasOfInterest: ["String"]
  }
  );
  export const Mentor =mongoose.models.mentors || mongoose.model("mentors", mentorSchema)