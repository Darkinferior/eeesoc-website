import {connectToDb} from "@/lib/dbConnection/connect"
import { NextResponse } from "next/server";
import {Alumni} from "@/lib/models/alumni"
import {Mentor} from "@/lib/models/mentor"
import {President} from "@/lib/models/president"
import {Project} from "@/lib/models/project"
import {Workshop} from "@/lib/models/workshop"
import {CodingInterview} from "@/lib/models/codingInterview"
import {ConsultancyInterview} from "@/lib/models/consultancyInterview"
import {ElectronicsInterview} from "@/lib/models/electronicsInterview"
import {ElectricalInterview} from "@/lib/models/electricalInterviews"
import {ExecutiveBodyk20} from "@/lib/models/executiveBodyk20"
import {ExecutiveBodyk21} from "@/lib/models/executiveBodyk21"



export async function GET(){
    await connectToDb();
    const data = await ExecutiveBodyk21.find();   
    return NextResponse.json({result:data})   
}