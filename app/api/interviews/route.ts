// necessary query parameters = [prefix]
// optional query parameters = [year]

import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { CodingInterview } from "@/lib/models/codingInterview"
import { ConsultancyInterview } from "@/lib/models/consultancyInterview"
import { ElectronicsInterview } from "@/lib/models/electronicsInterview"
import { ElectricalInterview } from "@/lib/models/electricalInterviews"




export async function GET(request: Request) {
    try {
        await connectToDb();
        const url = new URL(request.url)
        const year = url.searchParams.get("year")
        var prefix = url.searchParams.get("prefix")

        if (prefix) {
            prefix = prefix.toLowerCase()
        }
        var data
        if (prefix == "coding") {
            if (year) {
                data = await CodingInterview.find({ year: year })


            }
            else {
                data = await CodingInterview.find()

            }

        }
        else if (prefix == "consultancy") {
            if (year) {
                data = await ConsultancyInterview.find({ year: year })

            }
            else {
                data = await ConsultancyInterview.find()
            }
        }
        else if (prefix == "electrical") {
            if (year) {
                data = await ElectricalInterview.find({ year: year })

            }
            else {
                data = await ElectricalInterview.find()
            }
        }
        else if (prefix == "electronics") {
            if (year) {
                data = await ElectronicsInterview.find({ year: year })

            }
            else {
                data = await ElectronicsInterview.find()
            }
        }
        else {
            data = "no records found"
        }

        return NextResponse.json({ result: data })
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }


}