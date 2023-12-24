// necessary query parameters = []
// optional query parameters = []

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { Mentor } from "@/lib/models/mentor"




export async function GET(request: Request) {

    await connectToDb();
    const data = await Mentor.find()

    return NextResponse.json({ result: data })
}