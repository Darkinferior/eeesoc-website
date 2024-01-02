// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [title, content, contentImage]



import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { NextResponse } from 'next/server';
import {Workshop } from "@/lib/models/workshop"


export async function PATCH(request: Request): Promise<NextResponse> {

    const url = new URL(request.url);
    const workshop_id = url.searchParams.get("id");

    const data = await request.formData();

    const newTitle = data.get('title')?.toString();
    const newContent = data.get('content')?.toString();


    const newContentImage = data.get('contentImage')
    if (!workshop_id) {
        return NextResponse.json({ "msg": "'id' parameter is missing", success: false });
    }


    const existingWorkshop = await Workshop.findOne({ _id: workshop_id });

    if (existingWorkshop) {

        var path;

        if (newContentImage instanceof File) {
            const byteData = await newContentImage.arrayBuffer();
            const buffer = Buffer.from(byteData);
            path = `./public/executiveBody/finalYear/${newContentImage.name}`;
            const directory = dirname(path);
            await fsPromises.mkdir(directory, { recursive: true });
            await fsPromises.writeFile(path, buffer);
        }


        if (newTitle) existingWorkshop.title = newTitle;
        if (newContent) existingWorkshop.content = newContent;
        if (newContentImage instanceof File) {
            existingWorkshop.contentImage = path;
            existingWorkshop.cardImage = path;
        }



        await existingWorkshop.save();

        return NextResponse.json({ "msg": "workshop data updated successfully", success: true });
    }
    else {
        return NextResponse.json({ "msg": "no workshop found", success: false });
    }
}
