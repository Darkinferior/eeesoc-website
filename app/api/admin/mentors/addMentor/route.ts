// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [name, designation, department, areasOfInterest, profileLink, image]
// optional data inputs from the form = []

// for data input  "areasOfInterest"  send various interests as comma-separated string

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
import { NextResponse } from 'next/server';
import { Mentor } from "@/lib/models/mentor"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';
>>>>>>> Stashed changes

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const data = await request.formData();

        const name = data.get('name')?.toString();
        const designation = data.get('designation')?.toString();
        const department = data.get('department')?.toString();
        const areasOfInterest = data.get('areasOfInterest')?.toString();
        const profileLink = data.get('profileLink')?.toString();
        const image = data.get('image')

        var formattedAreasOfInterest
        if(areasOfInterest) formattedAreasOfInterest = areasOfInterest.split(',');

        if (!image) {
            return NextResponse.json({ "msg": "no file found (check for 'contentImage' key in body)", success: false });
        }

        if (image instanceof File) {
<<<<<<< Updated upstream
            const byteData = await image.arrayBuffer();
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

            var path;

            if (uploadResult) path = uploadResult.secure_url;
=======
            const folderName = `NewImages/mentors`
            const path = await uploadImageToCloudinary(image, folderName);
>>>>>>> Stashed changes

            const newDocument = new Mentor({
                name: name,
                image: path,
                department: department,
                designation: designation,
                profileLink: profileLink,
                areasOfInterest: formattedAreasOfInterest
            });
            await newDocument.save();

            return NextResponse.json({ "msg": "mentor added successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "couldn't add mentor", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }


}