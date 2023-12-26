
// necessary query parameters = []
// optional query parameters = [year]/

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { Alumni } from "@/lib/models/alumni"




export async function GET(request: Request) {

    await connectToDb();
    const url = new URL(request.url)
    const year = url.searchParams.get("year")
    var data
    if (year) {
        data = await Alumni.find({ year: parseInt(year) })

    }
    else {
        data = await Alumni.find()
    }
    return NextResponse.json({ result: data })
}