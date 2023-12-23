// necessary query parameters = []
// optional query parameters = [type]


import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import {Project} from "@/lib/models/project"




export async function GET(req, res) {

    await connectToDb();
    const url = new URL(req.url)
    var type = url.searchParams.get("type")
    var data
    if (type) {
        type = type.toUpperCase()
        if (type == "SMP") {
            data = await Project.find()

        }
        else if (type == "SPP") {
            data = await Project.find()
        }
        else {
            data = "no records found"
        }
        return NextResponse.json({ result: data })
    }
    else {
        const ProjectList = await Project.find()
        return NextResponse.json({ ProjectList: ProjectList })

    }

}