// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = []


import { NextResponse } from 'next/server';
import { Card } from "@/lib/models/gallery/card";
import { connectToDb } from "@/lib/dbConnection/connect"

export async function DELETE(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const image_id = url.searchParams.get("id");

        if (!image_id) {
            return NextResponse.json({ "msg": "image ID parameter is missing", success: false });
        }

        const existingImage = await Card.findOne({ _id: image_id });

        if (existingImage) {
            await Card.deleteOne({ _id: image_id });
            return NextResponse.json({ "msg": "image deleted successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "image not found for deletion", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}