// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [title, content, contentImage]
// optional data inputs from the form = []



import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { NextResponse } from 'next/server';
import { Workshop } from "@/lib/models/workshop"


export async function POST(request: Request): Promise<NextResponse> {

    const data = await request.formData();

    const title = data.get('title')?.toString();
    const cardImage = data.get('cardImage')?.toString();
    const content = data.get('content')?.toString();
    
    const contentImage = data.get('contentImage')
    


    if (!contentImage) {
        return NextResponse.json({ "msg": "no file found (check for 'contentImage' key in body)", success: false });
    }

    if (contentImage instanceof File) {
        const byteData = await contentImage.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const path = `./public/workshops/${contentImage.name}`;
        const directory = dirname(path);

        await fsPromises.mkdir(directory, { recursive: true });
        await fsPromises.writeFile(path, buffer);

        const newDocument = new Workshop({
            title: title,
            cardImage: path,
            contentImage: path,
            content: content
        });
        await newDocument.save();

        return NextResponse.json({ "msg": "workshop added successfully", success: true });
    } 
    else {
        return NextResponse.json({ "msg": "couldn't add workshop", success: false });
    }
}
