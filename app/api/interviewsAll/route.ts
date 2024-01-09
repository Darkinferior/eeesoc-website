// necessary query parameters = []
// optional query parameters = [year]

import { connectToDb } from "@/lib/dbConnection/connect";
import { NextResponse } from "next/server";
import { InterviewsAll } from "@/lib/models/interviewsAll";

export async function GET(request: Request) {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const year = url.searchParams.get("year");
        let data;

        if (year) {
            data = await InterviewsAll.find({ year: parseInt(year) });
        } else {
            data = await InterviewsAll.find().sort({ year: -1 });
        }

        return NextResponse.json({ result: data });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ msg: "Internal server error", success: false });
    }
}