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
<<<<<<< Updated upstream
export const InterviewsAll = mongoose.models.interviewsAlltest || mongoose.model("interviewsAlltest", interviewsAllSchema)
=======
export const InterviewsAll = mongoose.models.interviewsAll || mongoose.model("interviewsAll", interviewsAllSchema)
>>>>>>> Stashed changes
