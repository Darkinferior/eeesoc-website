import mongoose from "mongoose";
mongoose.pluralize(null)
const contactUsSchema = new mongoose.Schema({
 
        name: String,
        email: String,
        subject: String,
        description: String
   
  });
  export const ContactUs =mongoose.models.contactUs || mongoose.model("contactUs", contactUsSchema)