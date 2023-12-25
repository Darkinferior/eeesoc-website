// necessary query parameters = []
// optional query parameters = [year]

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { ExecutiveBodyk20 } from "@/lib/models/executiveBodyk20"
import { ExecutiveBodyk21 } from "@/lib/models/executiveBodyk21"




export async function GET(request: Request) {

    await connectToDb();
    const url = new URL(request.url)
    const year = url.searchParams.get("year")
    var data
    if (year) {
        if (year == "k20") {
            data = await ExecutiveBodyk20.find()

        }
        else if (year == "k21") {
            data = await ExecutiveBodyk21.find()
        }
        else {
            data = "no records found"
        }
        return NextResponse.json({ result: data })
    }
    else {
        const k20List = await ExecutiveBodyk20.find()
        const K21List = await ExecutiveBodyk21.find()
        return NextResponse.json({ k20: k20List, k21: K21List })

    }

}