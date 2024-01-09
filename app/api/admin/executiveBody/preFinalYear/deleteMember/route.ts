// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = []


import { NextResponse } from 'next/server';
import { ExecutiveBodyPreFinalYear } from "@/lib/models/executiveBodyPreFinalYear";
import { connectToDb } from "@/lib/dbConnection/connect"

export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const member_id = url.searchParams.get("id");

        if (!member_id) {
            return NextResponse.json({ "msg": "Member ID parameter is missing", success: false });
        }

        const existingMember = await ExecutiveBodyPreFinalYear.findOne({ _id: member_id });

        if (existingMember) {
            await ExecutiveBodyPreFinalYear.deleteOne({ _id: member_id });
            return NextResponse.json({ "msg": "Member deleted successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "Member not found for deletion", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}