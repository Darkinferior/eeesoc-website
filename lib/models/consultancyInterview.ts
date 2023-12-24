import mongoose from "mongoose";
mongoose.pluralize(null)

const consultancyInterviewSchema = new mongoose.Schema({
    "year": "String",
    "prefix": "String",
    "interviews": [
      {
        "name": "String",
        "company": "String",
        "image": "String",
        "interviewContent": "String"
      }
    ]
  }
  );
  export const ConsultancyInterview =mongoose.models.consultancyInterviews || mongoose.model("consultancyInterviews", consultancyInterviewSchema)