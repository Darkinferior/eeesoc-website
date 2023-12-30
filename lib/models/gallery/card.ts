import mongoose from "mongoose";
mongoose.pluralize(null)
const cardSchema = new mongoose.Schema({
    url: String,
    title: String
});
export const Card = mongoose.models.cards || mongoose.model("cards", cardSchema)

