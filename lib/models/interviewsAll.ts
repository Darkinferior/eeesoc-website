import mongoose from "mongoose";
mongoose.pluralize(null)

const interviewsAllSchema = new mongoose.Schema({
    "year": "Number",
    "interviews": [
        {

            "name": "String",
            "company": "String",
            "image": "String",
            "mediumLink": "String"

        }
    ]
}
);
export const InterviewsAll = mongoose.models.interviewsAll || mongoose.model("interviewsAll", interviewsAllSchema)