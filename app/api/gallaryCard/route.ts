// necessary query parameters = []
// optional query parameters = [year]

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { ExecutiveBodyFinalYear } from "@/lib/models/executiveBodyFinalYear"
import { ExecutiveBodyPreFinalYear } from "@/lib/models/executiveBodyPreFinalYear"




export async function GET(request: Request) {
    try {
        await connectToDb();
        const url = new URL(request.url)
        const year = url.searchParams.get("year")
        var data
        if (year) {
            if (year == "k20") {
                data = await ExecutiveBodyFinalYear.find()

            }
            else if (year == "k21") {
                data = await ExecutiveBodyPreFinalYear.find()
            }
            else {
                data = "no records found"
            }
            return NextResponse.json({ result: data })
        }
        else {
            const k20List = await ExecutiveBodyFinalYear.find()
            const K21List = await ExecutiveBodyPreFinalYear.find()
            return NextResponse.json({ k20: k20List, k21: K21List })

        }
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }



}