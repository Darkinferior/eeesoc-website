// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [ name, linkedInUrl, EmailID, designation, facebookUrl, instagramUrl, image]

<<<<<<< Updated upstream



import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';
import { NextResponse } from 'next/server';
import { ExecutiveBodyPreFinalYear } from "@/lib/models/executiveBodyPreFinalYear"
import { connectToDb } from "@/lib/dbConnection/connect"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
});


export async function PATCH(request: Request): Promise<NextResponse> {
    try{
        await connectToDb();
        const url = new URL(request.url);
        const member_id = url.searchParams.get("id");
    
        const data = await request.formData();
    
=======
import { NextResponse } from 'next/server';
import { ExecutiveBodyPreFinalYear } from "@/lib/models/executiveBodyPreFinalYear"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';

export async function PATCH(request: Request): Promise<NextResponse> {

    try {
        await connectToDb();
        const url = new URL(request.url);
        const member_id = url.searchParams.get("id");

        const data = await request.formData();

>>>>>>> Stashed changes
        const newName = data.get('name')?.toString();
        const newLinkedinUrl = data.get('linkedinUrl')?.toString();
        const newInstagramUrl = data.get('instagramUrl')?.toString();
        const newFacebookUrl = data.get('facebookUrl')?.toString();
        const newEmailID = data.get('emailID')?.toString();
        const newDesignation = data.get('designation')?.toString();
<<<<<<< Updated upstream
    
        const newImage = data.get('image')
        if (!member_id) {
            return NextResponse.json({ "msg": "'id' parameter is missing", success: false });
        }
    
    
        const existingMember = await ExecutiveBodyPreFinalYear.findOne({ _id: member_id });
    
        if (existingMember) {
    
            var path;
    
            if (newImage instanceof File) {
                const byteData = await newImage.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: `NewImages/executiveBody/preFinalYear` },
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
    
    
            if (newName) existingMember.name = newName;
            if (newLinkedinUrl) existingMember.linkedinUrl = newLinkedinUrl;
            if (newInstagramUrl) existingMember.instagramUrl = newInstagramUrl;
            if (newFacebookUrl) existingMember.facebookUrl = newFacebookUrl;
            if (newEmailID) existingMember.emailID = newEmailID;
            if (newDesignation) existingMember.designation = newDesignation;
            if (newImage instanceof File) existingMember.image = path;
    
    
    
            await existingMember.save();
    
            return NextResponse.json({ "msg": "member data updated successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "no member found", success: false });
        }
=======

        const newImage = data.get('image')
        if (!member_id) {
            return NextResponse.json({ "msg": "'id' parameter is missing", success: false });
        }


        const existingMember = await ExecutiveBodyPreFinalYear.findOne({ _id: member_id });

        if (existingMember) {

            var path;


            if (newImage instanceof File) {
                const folderName = `NewImages/executiveBody/preFinalYear`
                path = await uploadImageToCloudinary(newImage, folderName);
            }



            if (newName) existingMember.name = newName;
            if (newLinkedinUrl) existingMember.linkedinUrl = newLinkedinUrl;
            if (newInstagramUrl) existingMember.instagramUrl = newInstagramUrl;
            if (newFacebookUrl) existingMember.facebookUrl = newFacebookUrl;
            if (newEmailID) existingMember.emailID = newEmailID;
            if (newDesignation) existingMember.designation = newDesignation;
            if (newImage instanceof File) existingMember.image = path;



            await existingMember.save();

            return NextResponse.json({ "msg": "member data updated successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "no member found", success: false });
        }
>>>>>>> Stashed changes
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
<<<<<<< Updated upstream
      }
=======
    }
>>>>>>> Stashed changes


}