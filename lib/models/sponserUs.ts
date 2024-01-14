import mongoose from "mongoose";
mongoose.pluralize(null)

const sponserUsSchema = new mongoose.Schema({
    content: "String",
    image: "String",
}
);
export const SponserUs = mongoose.models.sponserUs || mongoose.model("sponserUs", sponserUsSchema)