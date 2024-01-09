// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = []


import { NextResponse } from 'next/server';
import { Mentor } from "@/lib/models/mentor";
import { connectToDb } from "@/lib/dbConnection/connect"

export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const mentor_id = url.searchParams.get("id");

        if (!mentor_id) {
            return NextResponse.json({ "msg": "mentor ID parameter is missing", success: false });
        }

        const existingMentor = await Mentor.findOne({ _id: mentor_id });

        if (existingMentor) {
            await Mentor.deleteOne({ _id: mentor_id });
            return NextResponse.json({ "msg": "mentor deleted successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "mentor not found for deletion", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}