import mongoose from "mongoose";
mongoose.pluralize(null)

const executiveBodyk20Schema = new mongoose.Schema({
    "name": "String",
    "linkedinUrl": "String",
    "InstagramUrl": "String",
    "FacebookUrl": "String",
    "EmailID": "String",
    "designation": "String",
    "image": "String"
  }
  
  );
  export const ExecutiveBodyk20 =mongoose.models.executiveBodyk20 || mongoose.model("executiveBodyk20", executiveBodyk20Schema)