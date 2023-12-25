import mongoose from "mongoose";
mongoose.pluralize(null)

const presidentSchema = new mongoose.Schema({
    
    tenure: String,
    name: String
  }
  
  );
  export const President =mongoose.models.presidents || mongoose.model("presidents", presidentSchema)