// necessary query parameters = [year, name, company]
// optional query parameters = []




import { NextResponse } from 'next/server';
import { InterviewsAll } from "@/lib/models/interviewsAll";

import { connectToDb } from "@/lib/dbConnection/connect"


export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);

        const name = url.searchParams.get("name");
        const company = url.searchParams.get("company");
        const year = url.searchParams.get("year");

        if (!year) {
            return NextResponse.json({ "msg": "Year parameter is missing", success: false });
        }

        const existingDocument = await InterviewsAll.findOne({ year: parseInt(year) });

        if (existingDocument) {
            const existingInterviewIndex = existingDocument.interviews.findIndex((interview: {
                name: string;
                company: string;
                image: string;
                mediumLink: string;
            }) => interview.name === name && interview.company === company);

            if (existingInterviewIndex !== -1) {
                if (existingDocument.interviews.length === 1) {
                    await InterviewsAll.deleteOne({ _id: existingDocument._id });
                }
                else{
                    existingDocument.interviews.splice(existingInterviewIndex, 1);
                    await existingDocument.save();
                }
                return NextResponse.json({ "msg": "interview data deleted successfully", success: true });
            }
            else {
                return NextResponse.json({ "msg": "interview document not found", success: false });
            }


        } else {
            return NextResponse.json({ "msg": "interview document not found", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}