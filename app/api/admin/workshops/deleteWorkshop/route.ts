// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = []


import { NextResponse } from 'next/server';
import { Workshop } from "@/lib/models/workshop";
import { connectToDb } from "@/lib/dbConnection/connect"

export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const workshop_id = url.searchParams.get("id");

        if (!workshop_id) {
            return NextResponse.json({ "msg": "Workshop ID parameter is missing", success: false });
        }

        const existingWorkshop = await Workshop.findOne({ _id: workshop_id });

        if (existingWorkshop) {
            await Workshop.deleteOne({ _id: workshop_id });
            return NextResponse.json({ "msg": "Workshop deleted successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "Workshop not found for deletion", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}