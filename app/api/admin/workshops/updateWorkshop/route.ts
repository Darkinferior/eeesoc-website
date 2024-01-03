// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [title, content, contentImage]


import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';
import { NextResponse } from 'next/server';
import { Workshop } from "@/lib/models/workshop"
import { connectToDb } from "@/lib/dbConnection/connect"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.API_KEY as string,
    api_secret: process.env.API_SECRET as string
});



export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const workshop_id = url.searchParams.get("id");

        const data = await request.formData();

        const newTitle = data.get('title')?.toString();
        const newContent = data.get('content')?.toString();


        const newContentImage = data.get('contentImage')
        if (!workshop_id) {
            return NextResponse.json({ "msg": "'id' parameter is missing", success: false });
        }


        const existingWorkshop = await Workshop.findOne({ _id: workshop_id });

        if (existingWorkshop) {

            var path;

            if (newContentImage instanceof File) {
                const byteData = await newContentImage.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: `NewImages/workshops` },
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


            if (newTitle) existingWorkshop.title = newTitle;
            if (newContent) existingWorkshop.content = newContent;
            if (newContentImage instanceof File) {
                existingWorkshop.contentImage = path;
                existingWorkshop.cardImage = path;
            }



            await existingWorkshop.save();

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