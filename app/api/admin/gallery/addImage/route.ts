// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [title, image]
// optional data inputs from the form = []


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

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const data = await request.formData();

        const title = data.get('title')?.toString();
        const image = data.get('image')

        if (!image) {
            return NextResponse.json({ "msg": "no file found (check for 'contentImage' key in body)", success: false });
        }

        if (image instanceof File) {
            const byteData = await image.arrayBuffer();
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

            var path;

            if (uploadResult) path = uploadResult.secure_url;

            const newDocument = new Card({
                title: title,
                url: path,
            });
            await newDocument.save();

            return NextResponse.json({ "msg": "image added successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "couldn't add image", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }


}