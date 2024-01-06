
// necessary query parameters = []
// optional query parameters = []

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { Card } from "@/lib/models/gallery/card";




export async function GET(request: Request) {
    try {
        await connectToDb();

        const data = await Card.find();
        return NextResponse.json({ data: data })
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }



}