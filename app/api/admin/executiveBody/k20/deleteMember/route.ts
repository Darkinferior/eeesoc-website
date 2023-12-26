// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = []


import { NextResponse } from 'next/server';
import { ExecutiveBodyk20 } from "@/lib/models/executiveBodyk20";

export async function DELETE(request: Request): Promise<NextResponse> {
    const url = new URL(request.url);
    const member_id = url.searchParams.get("id");

    if (!member_id) {
        return NextResponse.json({ "msg": "Member ID parameter is missing", success: false });
    }

    const existingMember = await ExecutiveBodyk20.findOne({ _id: member_id });

    if (existingMember) {
        await ExecutiveBodyk20.deleteOne({ _id: member_id });
        return NextResponse.json({ "msg": "Member deleted successfully", success: true });
    } 
    else {
        return NextResponse.json({ "msg": "Member not found for deletion", success: false });
    }
}
