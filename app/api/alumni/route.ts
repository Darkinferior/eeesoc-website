
// necessary query parameters = []
// optional query parameters = [year]

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { Alumni } from "@/lib/models/alumni"




export async function GET(request: Request) {
    try {
        await connectToDb();
        const url = new URL(request.url)
        const year = url.searchParams.get("year")
        var data
        if (year) {
            data = await Alumni.find({ year: parseInt(year) }).sort({ year: -1 });

        }
        else {
            data = await Alumni.find().sort({ year: -1 });
        }
        return NextResponse.json({ result: data })
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }



}