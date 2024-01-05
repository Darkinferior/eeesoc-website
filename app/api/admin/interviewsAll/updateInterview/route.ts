// necessary query parameters = [year, name, company]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [ name, company, image, mediumLink]



import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';
import { NextResponse } from 'next/server';
import { InterviewsAll } from "@/lib/models/interviewsAll";

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

        const name = url.searchParams.get("name");
        const company = url.searchParams.get("company");
        const year = url.searchParams.get("year");

        const data = await request.formData();
        const newName = data.get('name')?.toString();
        const newComapny = data.get('company')?.toString();
        const newMediumLink = data.get('mediumLink')?.toString();

        const newImage = data.get('image');

        if (!year) {
            return NextResponse.json({ "msg": "Year parameter is missing", success: false });
        }

        const existingDocument = await InterviewsAll.findOne({ year: parseInt(year) });

        if (existingDocument) {
            const existingInterview = existingDocument.interviews.find((interviews: {
                name: string;
                company: string;
                image: string;
                mediumLink: string;
            }) => interviews.name === name && interviews.company === company);

            var path;

            if (newImage instanceof File) {
                const byteData = await newImage.arrayBuffer();
                const buffer = Buffer.from(byteData);
                const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: `NewImages/interviews/${year}` },
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


            if (existingInterview) {
                if (newName) existingInterview.name = newName;
                if (newComapny) existingInterview.company = newComapny;
                if (newMediumLink) existingInterview.mediumLink = newMediumLink;
                if (newImage instanceof File) existingInterview.image = path;
            }

            await existingDocument.save();

            return NextResponse.json({ "msg": "Interview data updated successfully", success: true });
        } else {
            return NextResponse.json({ "msg": "Interview document not found", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }

}