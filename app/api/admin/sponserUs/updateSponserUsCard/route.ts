// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [content, image]
// optional data inputs from the form = []

import { NextResponse } from 'next/server';
import { SponserUs } from "@/lib/models/sponserUs"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';


export async function PUT(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const data = await request.formData();

        const content = data.get('content')?.toString();
        const image = data.get('image')
        const existingDocument = await SponserUs.findOne();
        if (existingDocument) {
            if (content) existingDocument.content = content;
            if (image && image instanceof File) {
                const folderName = `NewImages/sponserUs`
                const path = await uploadImageToCloudinary(image, folderName);
                if(path) existingDocument.image = path
            }
            await existingDocument.save();
        }

        else {
            if (!image) {
                return NextResponse.json({ "msg": "no file found (check for 'image' key in body)", success: false });
            }
    
            if (image instanceof File) {
                const folderName = `NewImages/sponserUs`
                const path = await uploadImageToCloudinary(image, folderName);
    
    
                const newDocument = new SponserUs({
                    content: content,
                    image: path,
                });
                await newDocument.save();
    
                return NextResponse.json({ "msg": "data added successfully", success: true });
            }
        }
        return NextResponse.json({ "msg": "data updated successfully", success: true });
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }


}