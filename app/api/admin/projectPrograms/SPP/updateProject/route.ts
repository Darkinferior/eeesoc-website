// necessary query parameters = [prevName , year]
// optional query parameters = []
// optional data inputs from the form =[]
// optional data inputs from the form = [year, name, title, image, description, reportLink]

<<<<<<< Updated upstream
<<<<<<< Updated upstream

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';
import { NextResponse } from 'next/server';
import { Project } from "@/lib/models/project"
import { connectToDb } from "@/lib/dbConnection/connect"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
});
=======
import { NextResponse } from 'next/server';
import { Project } from "@/lib/models/project"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';
>>>>>>> Stashed changes
=======
import { NextResponse } from 'next/server';
import { Project } from "@/lib/models/project"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';
>>>>>>> Stashed changes


export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                        const byteData = await newImage.arrayBuffer();
                        const buffer = Buffer.from(byteData);
                        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
                            cloudinary.uploader.upload_stream(
                                { folder: `NewImages/projects/SPP/${year}` },
                                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                                    if (error) {
                                        console.error('Error uploading image:', error);
                                        reject(error);
                                    } else {
                                        if (result) {
                                            resolve(result);
                                        } else {
                                            reject(new Error('Upload result is undefined.'));
                                        }
                                    }
                                }
                            ).end(buffer);
                        });

                        if (uploadResult) path = uploadResult.secure_url;
=======
                        const folderName = `NewImages/projects/SPP/${year}`
                        path = await uploadImageToCloudinary(newImage, folderName);
>>>>>>> Stashed changes
=======
                        const folderName = `NewImages/projects/SPP/${year}`
                        path = await uploadImageToCloudinary(newImage, folderName);
>>>>>>> Stashed changes
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
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }


}