import mongoose from "mongoose";
mongoose.pluralize(null)

const executiveBodyk21Schema = new mongoose.Schema({
    "name": "String",
    "linkedinUrl": "String",
    "InstagramUrl": "String",
    "FacebookUrl": "String",
    "EmailID": "String",
    "designation": "String",
    "image": "String"
  }
  
  );
  export const ExecutiveBodyk21 =mongoose.models.executiveBodyk21 || mongoose.model("executiveBodyk21", executiveBodyk21Schema)