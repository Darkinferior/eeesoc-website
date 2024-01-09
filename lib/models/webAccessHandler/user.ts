import mongoose from "mongoose";
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // "admin" or "member"
    EmailID: { type: String, required: true, unique: true },
    position: { type: String, required: true }, // position in the society
    year: { type: String, required: true }, // "pre-final" or "final"
    password: { type: String, required: true }
});

export const User = mongoose.models.users || mongoose.model("users", userSchema);
