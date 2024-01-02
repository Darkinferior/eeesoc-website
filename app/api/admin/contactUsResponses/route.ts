
// necessary query parameters = []
// optional query parameters = []

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { ContactUs } from "@/lib/models/contactUs"




export async function GET(request: Request) {

    await connectToDb();
    
    const data = await ContactUs.find();
    return NextResponse.json({ responses: data })
}