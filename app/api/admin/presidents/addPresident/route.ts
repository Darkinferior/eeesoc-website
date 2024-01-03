// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [tenure, name]

import { NextResponse } from 'next/server';
import { President } from "@/lib/models/president"
import { connectToDb } from "@/lib/dbConnection/connect"


export async function POST(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const data = await request.formData();

        const name = data.get('name')?.toString();
        const tenure = data.get('tenure')?.toString();

        const newDocument = new President({
            name: name,
            tenure: tenure
        });
        await newDocument.save();
        return NextResponse.json({ "msg": "president added successfully", success: true });
    }


    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }


}