// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [ name, linkedInUrl, EmailID, designation, image]
// optional data inputs from the form = [facebookUrl, instagramUrl]



import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { NextResponse } from 'next/server';
import { ExecutiveBodyk21 } from "@/lib/models/executiveBodyk21"


export async function POST(request: Request): Promise<NextResponse> {

    const data = await request.formData();

    const name = data.get('name')?.toString();
    const linkedinUrl = data.get('linkedinUrl')?.toString();
    const instagramUrl = data.get('instagramUrl')?.toString();
    const facebookUrl = data.get('facebookUrl')?.toString();
    const EmailID = data.get('EmailID')?.toString();
    const designation = data.get('designation')?.toString();

    const image = data.get('image')


    if (!image) {
        return NextResponse.json({ "msg": "no file found (check for 'image' key in body)", success: false });
    }

    if (image instanceof File) {
        const byteData = await image.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const path = `./public/executiveBody/k21/${image.name}`;
        const directory = dirname(path);

        await fsPromises.mkdir(directory, { recursive: true });
        await fsPromises.writeFile(path, buffer);

        const newDocument = new ExecutiveBodyk21({
            name: name,
            linkedinUrl: linkedinUrl,
            instagramUrl: instagramUrl,
            facebookUrl: facebookUrl,
            EmailID: EmailID,
            designation: designation,
            image: path,
        });
        await newDocument.save();

        return NextResponse.json({ "msg": "member added successfully", success: true });
    } 
    else {
        return NextResponse.json({ "msg": "couldn't add member", success: false });
    }
}
