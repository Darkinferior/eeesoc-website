import mongoose from "mongoose";
mongoose.pluralize(null)

const workshopSchema = new mongoose.Schema({
    "title": "String",
    "cardImage": "String",
    "contentImage": "String",
    "content": "String"
  }
  );
  export const Workshop =mongoose.models.workshops || mongoose.model("workshops", workshopSchema)
  
  
