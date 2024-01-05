

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { Card } from "@/lib/models/gallery/card"




export async function GET(request: Request) {
    try {
        await connectToDb();
        const cards = await Card.find();
        return NextResponse.json({ cards: cards })
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}