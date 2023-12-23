import mongoose from "mongoose";
mongoose.pluralize(null)

const electronicsInterviewSchema = new mongoose.Schema({
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
  export const ElectronicsInterview =mongoose.models.electronicsInterviews || mongoose.model("electronicsInterviews", electronicsInterviewSchema)