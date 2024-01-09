import mongoose from "mongoose";
mongoose.pluralize(null)
const eventResultSchema = new mongoose.Schema({
    title: String, 
    link: String,
});
export const EventResult = mongoose.models.eventResult || mongoose.model("eventResult", eventResultSchema)

