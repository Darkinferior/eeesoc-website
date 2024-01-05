// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [year, name, title, image, description, reportLink]

import { NextResponse } from 'next/server';
import { Project } from "@/lib/models/project"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
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
            const folderName = `NewImages/projects/SPP/${year}`
            const path = await uploadImageToCloudinary(image, folderName);

            const existingDocument = await Project.findOne({ "type": "SPP" })

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
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}