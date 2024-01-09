// necessary query parameters = [year, name, workplace]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [ name, workplace, position, linkedInUrl, image]
<<<<<<< Updated upstream



import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';
=======



>>>>>>> Stashed changes
import { NextResponse } from 'next/server';
import { Alumni } from "@/lib/models/alumni"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';



import { connectToDb } from "@/lib/dbConnection/connect"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
});

export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
<<<<<<< Updated upstream
        
        const url = new URL(request.url);

        const name = url.searchParams.get("name");
        const workplace = url.searchParams.get("workplace");
        const year = url.searchParams.get("year");

        const data = await request.formData();
        const newName = data.get('name')?.toString();
        const newWorkplace = data.get('workplace')?.toString();
        const newPosition = data.get('position')?.toString();
        const linkedinUrl = data.get('linkedinUrl')?.toString();

        const newImage = data.get('image');

=======

        const url = new URL(request.url);

        const name = url.searchParams.get("name");
        const workplace = url.searchParams.get("workplace");
        const year = url.searchParams.get("year");

        const data = await request.formData();
        const newName = data.get('name')?.toString();
        const newWorkplace = data.get('workplace')?.toString();
        const newPosition = data.get('position')?.toString();
        const linkedinUrl = data.get('linkedinUrl')?.toString();

        const newImage = data.get('image');

>>>>>>> Stashed changes
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
            }) => alumni.name === name && alumni.workplace === workplace);

            var path;

            if (newImage instanceof File) {
<<<<<<< Updated upstream
                const byteData = await newImage.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: `NewImages/alumni/${year}` },
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
                const folderName = `NewImages/alumni/${year}`
                path = await uploadImageToCloudinary(newImage, folderName);
>>>>>>> Stashed changes
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
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}