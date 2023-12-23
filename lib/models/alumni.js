import mongoose from "mongoose";
mongoose.pluralize(null)
const alumniSchema = new mongoose.Schema({
    year: Number,
    alumni: [
      {
        name: String,
        workplace: String,
        position: String,
        image: String,
        linkedinUrl: String,
      },
    ],
  });
  export const Alumni =mongoose.models.alumni || mongoose.model("alumni", alumniSchema)
  
  
