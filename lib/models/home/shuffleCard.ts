import mongoose from "mongoose";
mongoose.pluralize(null)
const shuffleCardSchema = new mongoose.Schema({
    src: String,
    title: String
});
export const ShuffleCard = mongoose.models.shuffleCards || mongoose.model("shuffleCards", shuffleCardSchema)