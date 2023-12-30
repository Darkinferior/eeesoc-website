// necessary query parameters = [prevName , year]
// optional query parameters = []
// optional data inputs from the form =[]
// optional data inputs from the form = [year, name, title, image, description, reportLink]


import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { NextResponse } from 'next/server';
import { Project } from "@/lib/models/project"


export async function PATCH(request: Request): Promise<NextResponse> {

    const url = new URL(request.url);

    const prevName = url.searchParams.get("name");
    const year = url.searchParams.get("year")

    const data = await request.formData();

    const newName = data.get('name')?.toString();
    const newTitle = data.get('title')?.toString();
    const newDescription = data.get('description')?.toString();
    const newReportLink = data.get('reportLink')?.toString();
    const newImage = data.get('image')

    if (!year) {
        return NextResponse.json({ "msg": "Year parameter is missing", success: false });
    }


    const existingDocument = await Project.findOne({ "type": "SPP" })

    if (existingDocument) {

        const yearIndex = existingDocument.yearWiseProjects.findIndex((item: { year: number }) => item.year === parseInt(year));

        if (yearIndex !== -1) {
            const projectArray = existingDocument.yearWiseProjects[yearIndex].projects
            
            const nameIndex = projectArray.findIndex((item: { name: String }) => item.name === prevName)
            if (nameIndex !== -1) {
                var path
                if (newImage instanceof File) {
                    const byteData = await newImage.arrayBuffer();
                    const buffer = Buffer.from(byteData);
                    path = `./public/projects/SPP/${year}/${newImage.name}`;
                    const directory = dirname(path);
                    await fsPromises.mkdir(directory, { recursive: true });
                    await fsPromises.writeFile(path, buffer);
                }
                if (newName) projectArray[nameIndex].name = newName;
                if (newTitle) projectArray[nameIndex].title = newTitle;
                if (newDescription) projectArray[nameIndex].description = newDescription;
                if (newImage instanceof File) projectArray[nameIndex].image = path;
                if (newReportLink) projectArray[nameIndex].reportLink = newReportLink;

                await existingDocument.save();

                return NextResponse.json({ "msg": "project updated successfully", success: true });
            }

            return NextResponse.json({ "msg": "project 'name' not found for updation", success: false });

        }


        return NextResponse.json({ "msg": "project not found for updation", success: false });
    }

    return NextResponse.json({ "msg": "poject 'type' not found for updation", success: false });
}

