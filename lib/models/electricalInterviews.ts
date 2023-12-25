import mongoose from "mongoose";
mongoose.pluralize(null)

const electricalInterviewSchema = new mongoose.Schema({
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
  export const ElectricalInterview =mongoose.models.electricalInterviews || mongoose.model("electricalInterviews", electricalInterviewSchema)