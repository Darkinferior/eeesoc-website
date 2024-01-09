import mongoose from "mongoose";
mongoose.pluralize(null)

const executiveBodyPreFinalYearSchema = new mongoose.Schema({
    "name": "String",
    "linkedinUrl": "String",
    "InstagramUrl": "String",
    "FacebookUrl": "String",
    "EmailID": "String",
    "designation": "String",
    "image": "String"
  }
  
  );
  export const ExecutiveBodyPreFinalYear =mongoose.models.executiveBodyPreFinalYear || mongoose.model("executiveBodyPreFinalYear", executiveBodyPreFinalYearSchema)