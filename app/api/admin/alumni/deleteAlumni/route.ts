// necessary query parameters = [year, name, workplace]
// optional query parameters = []




import { NextResponse } from 'next/server';
import { Alumni } from "@/lib/models/alumni";

import { connectToDb } from "@/lib/dbConnection/connect"


export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);

        const name = url.searchParams.get("name");
        const workplace = url.searchParams.get("workplace");
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
            else {
                return NextResponse.json({ "msg": "Alumni document not found", success: false });
            }


        } else {
            return NextResponse.json({ "msg": "Alumni document not found", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}