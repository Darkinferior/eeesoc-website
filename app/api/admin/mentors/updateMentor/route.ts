// necessary query parameters = [id]
// optional query parameters = []
// optional data inputs from the form = [name, designation, department, areasOfInterest, profileLink, image]


// for data input  "areasOfInterest"  send various interests as comma-separated string

<<<<<<< Updated upstream
<<<<<<< Updated upstream

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';
import { NextResponse } from 'next/server';
import { Mentor } from "@/lib/models/mentor"
import { connectToDb } from "@/lib/dbConnection/connect"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
});

=======
=======
>>>>>>> Stashed changes
import { NextResponse } from 'next/server';
import { Mentor } from "@/lib/models/mentor"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes


export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const mentor_id = url.searchParams.get("id");

        const data = await request.formData();

        const newName = data.get('name')?.toString();
        const newDesignation = data.get('designation')?.toString();
        const newDepartment = data.get('department')?.toString();
        const newAreasOfInterest = data.get('areasOfInterest')?.toString();
        const newProfileLink = data.get('profileLink')?.toString();

        var formattedAreasOfInterest
        if(newAreasOfInterest) formattedAreasOfInterest = newAreasOfInterest.split(',');

        const newImage = data.get('image')

        if (!mentor_id) {
            return NextResponse.json({ "msg": "'id' parameter is missing", success: false });
        }


        const existingMentor = await Mentor.findOne({ _id: mentor_id });

        if (existingMentor) {

            var path;

            if (newImage instanceof File) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
                const byteData = await newImage.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: `NewImages/mentors` },
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
                const folderName = `NewImages/mentors`
                path = await uploadImageToCloudinary(newImage, folderName);
>>>>>>> Stashed changes
=======
                const folderName = `NewImages/mentors`
                path = await uploadImageToCloudinary(newImage, folderName);
>>>>>>> Stashed changes
            }


            if (newName) existingMentor.name = newName;
            if (newDesignation) existingMentor.designation = newDesignation;
            if (newImage instanceof File) existingMentor.image = path;
            if (newDepartment) existingMentor.department = newDepartment;
            if (newProfileLink) existingMentor.profileLink = newProfileLink;
            if (formattedAreasOfInterest) existingMentor.areasOfInterest = formattedAreasOfInterest;
            
<<<<<<< Updated upstream
<<<<<<< Updated upstream
            



=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

            await existingMentor.save();

            return NextResponse.json({ "msg": "workshop data updated successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "no workshop found", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }



}