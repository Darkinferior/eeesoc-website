// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [title, formLink]

import { NextResponse } from 'next/server';
import { EventRegister } from "@/lib/models/events/eventRegister"
import { connectToDb } from "@/lib/dbConnection/connect"


export async function PUT(request: Request): Promise<NextResponse> {
    try {

        await connectToDb();
        const data = await request.formData();

        const title = data.get('title')?.toString();
        const formLink = data.get('formLink')?.toString();

        const existingEvent = await EventRegister.findOne();

        if (existingEvent) {
            if (title) existingEvent.title = title;
            if (formLink) existingEvent.formLink = formLink;
            await existingEvent.save();
        }
        else {
            const newDocument = new EventRegister({
                title: title,
                formLink: formLink
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