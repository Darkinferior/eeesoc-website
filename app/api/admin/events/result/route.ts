// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [title, link]

import { NextResponse } from 'next/server';
import { EventResult } from "@/lib/models/events/eventResult"
import { connectToDb } from "@/lib/dbConnection/connect"


export async function PUT(request: Request): Promise<NextResponse> {
    try {

        await connectToDb();
        const data = await request.formData();

        const title = data.get('title')?.toString();
        const link = data.get('link')?.toString();

        const existingEvent = await EventResult.findOne();

        if (existingEvent) {
            if (title) existingEvent.title = title;
            if (link) existingEvent.link = link;
            await existingEvent.save();
        }
        else {
            const newDocument = new EventResult({
                title: title,
                link: link
            });
            await newDocument.save();
        }
        return NextResponse.json({ "msg": "event data updated successfully", success: true });
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}