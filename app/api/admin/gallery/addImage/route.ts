// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [title, image]
// optional data inputs from the form = []

import { NextResponse } from 'next/server';
import { Card } from "@/lib/models/gallery/card"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';


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
            const folderName = `NewImages/gallery`
            const path = await uploadImageToCloudinary(image, folderName);


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