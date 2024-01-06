import mongoose from "mongoose";
mongoose.pluralize(null)
const eventRegisterSchema = new mongoose.Schema({
    title: String, 
    formLink: String,
});
export const EventRegister = mongoose.models.eventRegister || mongoose.model("eventRegister", eventRegisterSchema)

