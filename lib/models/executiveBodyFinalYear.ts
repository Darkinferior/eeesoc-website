import mongoose from "mongoose";
mongoose.pluralize(null)

const executiveBodyFinalYearSchema = new mongoose.Schema({
    "name": "String",
    "linkedinUrl": "String",
    "InstagramUrl": "String",
    "FacebookUrl": "String",
    "EmailID": "String",
    "designation": "String",
    "image": "String"
  }
  
  );
  export const ExecutiveBodyFinalYear =mongoose.models.executiveBodyFinalYear || mongoose.model("executiveBodyFinalYear", executiveBodyFinalYearSchema)