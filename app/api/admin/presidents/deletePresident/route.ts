// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = []


import { NextResponse } from 'next/server';
import { President } from "@/lib/models/president";
import { connectToDb } from "@/lib/dbConnection/connect"

export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const president_id = url.searchParams.get("id");

        if (!president_id) {
            return NextResponse.json({ "msg": "President ID parameter is missing", success: false });
        }

        const existingPresident = await President.findOne({ _id: president_id });

        if (existingPresident) {
            await President.deleteOne({ _id: president_id });
            return NextResponse.json({ "msg": "President deleted successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "President not found for deletion", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}