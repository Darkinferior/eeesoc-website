// necessary query parameters = [id]
// optional query parameters = []
// optional data inputs from the form = [title, image]


import { NextResponse } from 'next/server';
import { Card } from "@/lib/models/gallery/card"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';


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
                const folderName = `NewImages/gallery`
                path = await uploadImageToCloudinary(newImage, folderName);
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