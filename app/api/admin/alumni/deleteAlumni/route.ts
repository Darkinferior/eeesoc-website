// necessary query parameters = [year, prevName, prevWorkplace]
// optional query parameters = []




import { NextResponse } from 'next/server';
import { Alumni } from "@/lib/models/alumni";

export async function DELETE(request: Request): Promise<NextResponse> {
    const url = new URL(request.url);

    const name = url.searchParams.get("prevName");
    const workplace = url.searchParams.get("prevWorkplace");
    const year = url.searchParams.get("year");

    if (!year) {
        return NextResponse.json({ "msg": "Year parameter is missing", success: false });
    }

    const existingDocument = await Alumni.findOne({ year: parseInt(year) });

    if (existingDocument) {
        const existingAlumniIndex = existingDocument.alumni.findIndex((alumni: {
            name: string;
            workplace: string;
        }) => alumni.name === name && alumni.workplace === workplace);

        if (existingAlumniIndex !== -1) {
            existingDocument.alumni.splice(existingAlumniIndex, 1);
            await existingDocument.save();
            return NextResponse.json({ "msg": "Alumni data deleted successfully", success: true });
        }
        else{
            return NextResponse.json({ "msg": "Alumni document not found", success: false });
        }

        
    } else {
        return NextResponse.json({ "msg": "Alumni document not found", success: false });
    }
}
