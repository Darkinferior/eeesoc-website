// necessary query parameters = []
// optional query parameters = [type]


import { connectToDb } from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import { Project } from "@/lib/models/project"




export async function GET(request: Request) {
    try {

        await connectToDb();
        const url = new URL(request.url)
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
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }


}