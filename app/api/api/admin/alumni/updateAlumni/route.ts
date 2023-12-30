// necessary query parameters = [year, prevName, prevWorkplace]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [ name, workplace, position, linkedInUrl, year, image]


import { promises as fsPromises } from 'fs';
import { dirname } from 'path';
import { NextResponse } from 'next/server';
import { Alumni } from "@/lib/models/alumni";

export async function PATCH(request: Request): Promise<NextResponse> {
    const url = new URL(request.url);

    const prevName = url.searchParams.get("prevName");
    const prevWorkplace = url.searchParams.get("prevWorkplace");
    const year = url.searchParams.get("year");

    const data = await request.formData();
    const newName = data.get('name')?.toString();
    const newWorkplace = data.get('workplace')?.toString();
    const newPosition = data.get('position')?.toString();
    const linkedinUrl = data.get('linkedinUrl')?.toString();

    const newImage = data.get('image');

    if (!year) {
        return NextResponse.json({ "msg": "Year parameter is missing", success: false });
    }

    const existingDocument = await Alumni.findOne({ year: parseInt(year) });

    if (existingDocument) {
        const existingAlumni = existingDocument.alumni.find((alumni: {
            name: string;
            workplace: string;
            position: string;
            image: string;
            linkedinUrl: string;
        }) => alumni.name === prevName && alumni.workplace === prevWorkplace);

        var path;

        if (newImage instanceof File) {
            const byteData = await newImage.arrayBuffer();
            const buffer = Buffer.from(byteData);
            path = `./public/alumni/${year}/${newImage.name}`;
            const directory = dirname(path);
            await fsPromises.mkdir(directory, { recursive: true });
            await fsPromises.writeFile(path, buffer);
        }

        if (existingAlumni) {
            if (newName) existingAlumni.name = newName;
            if (newWorkplace) existingAlumni.workplace = newWorkplace;
            if (linkedinUrl) existingAlumni.linkedinUrl = linkedinUrl;
            if (newImage instanceof File) existingAlumni.image = path;
            if (newPosition) existingAlumni.position = newPosition;
        }

        await existingDocument.save();

        return NextResponse.json({ "msg": "Alumni data updated successfully", success: true });
    } else {
        return NextResponse.json({ "msg": "Alumni document not found", success: false });
    }
}
