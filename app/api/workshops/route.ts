// necessary query parameters = []
// optional query parameters = []


import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import {Workshop} from "@/lib/models/workshop"




export async function GET(request: Request) {

    await connectToDb();
    const data = await Workshop.find()

    return NextResponse.json({ result: data })
}