// necessary query parameters = [id]
// optional query parameters = []
// optional data inputs from the form = [title, image]


import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';
import { NextResponse } from 'next/server';
import { Card } from "@/lib/models/gallery/card"
import { connectToDb } from "@/lib/dbConnection/connect"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
});



export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const image_id = url.searchParams.get("id");

        const data = await request.formData();

        const newTitle = data.get('name')?.toString();
        const newImage = data.get('image')

        if (!image_id) {
            return NextResponse.json({ "msg": "'id' parameter is missing", success: false });
        }


        const existingImage = await Card.findOne({ _id: image_id });

        if (existingImage) {

            var path;

            if (newImage instanceof File) {
                const byteData = await newImage.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: `NewImages/gallery` },
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
            }


            if (newTitle) existingImage.title = newTitle;
            if (newImage instanceof File) existingImage.url = path;

            await existingImage.save();

            return NextResponse.json({ "msg": "image updated successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "no image found", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }



}