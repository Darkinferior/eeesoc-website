// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [year, name, title, image, description, reportLink]



import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { NextResponse } from 'next/server';
import { Project } from "@/lib/models/project"


export async function POST(request: Request): Promise<NextResponse> {
    const data = await request.formData();

    const name = data.get('name')?.toString();
    const title = data.get('title')?.toString();
    const description = data.get('description')?.toString();
    const reportLink = data.get('reportLink')?.toString();
    const year = data.get('year')?.toString()
    const image = data.get('image')

    if (!year) {
        return NextResponse.json({ "msg": "year not entered (check for 'year' key in body)", success: false });
    }

    if (!image) {
        return NextResponse.json({ "msg": "no file found (check for 'image' key in body)", success: false });
    }

    if (image instanceof File) {
        const byteData = await image.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const path = `./public/projects/SMP/${year}/${image.name}`;
        const directory = dirname(path);
        await fsPromises.mkdir(directory, { recursive: true });

        await fsPromises.writeFile(path, buffer);

        const existingDocument = await Project.findOne({ "type": "SMP" })

        if (existingDocument) {
            const yearIndex = existingDocument.yearWiseProjects.findIndex((item: { year: number }) => item.year === parseInt(year));
            if (yearIndex !== -1) {
                existingDocument.yearWiseProjects[yearIndex].projects.push({
                    name: name,
                    title: title,
                    reportLink: reportLink,
                    image: path,
                    description: description
                });
                await existingDocument.save();
            }
            else {
                existingDocument.yearWiseProjects.push({
                    year: year,
                    projects: [
                        {
                            name: name,
                            title: title,
                            reportLink: reportLink,
                            image: path,
                            description: description
                        }
                    ]

                });
                await existingDocument.save();
            }
            return NextResponse.json({ "msg": "project added successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "project 'type' not found", success: false });
        }


    }
    else {
        return NextResponse.json({ "msg": "couldn't add project", success: false });
    }
}
