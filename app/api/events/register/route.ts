// necessary query parameters = []
// optional query parameters = []

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { EventRegister } from "@/lib/models/events/eventRegister"




export async function GET(request: Request) {
    try {
        await connectToDb();
        const data = await EventRegister.findOne()

        return NextResponse.json({ result: data })
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}