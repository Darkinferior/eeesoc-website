// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [name, tenure]

import { NextResponse } from 'next/server';
import { President } from "@/lib/models/president"
import { connectToDb } from "@/lib/dbConnection/connect"


export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const president_id = url.searchParams.get("id");

        const data = await request.formData();

        const newName = data.get('name')?.toString();
        const newTenure = data.get('tenure')?.toString();

        const existingPresident = await President.findOne({ _id: president_id });

        if (existingPresident) {
            if (newName) existingPresident.name = newName;
            if (newTenure) existingPresident.tenure = newTenure;
            await existingPresident.save();

            return NextResponse.json({ "msg": "president data updated successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "no president found", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}