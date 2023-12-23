// necessary query parameters = []
// optional query parameters = []

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { President } from "@/lib/models/president"




export async function GET(req, res) {

    await connectToDb();
    const data = await President.find()

    return NextResponse.json({ result: data })
}