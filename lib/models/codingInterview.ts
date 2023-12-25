import mongoose from "mongoose";
mongoose.pluralize(null)

const codingInterviewSchema = new mongoose.Schema({
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
  export const CodingInterview =mongoose.models.codingInterviews || mongoose.model("codingInterviews", codingInterviewSchema)