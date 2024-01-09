// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [ name, company, mediumLink, year, image]


<<<<<<< Updated upstream


import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';

import { NextResponse } from 'next/server';
import { InterviewsAll } from "@/lib/models/interviewsAll"
import { connectToDb } from "@/lib/dbConnection/connect"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string
});
=======
import { NextResponse } from 'next/server';
import { InterviewsAll } from "@/lib/models/interviewsAll"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';
>>>>>>> Stashed changes

export async function POST(request: Request): Promise<NextResponse> {

  try {
    await connectToDb();
    const data = await request.formData();

    const name = data.get('name')?.toString();
    const company = data.get('company')?.toString();
    const mediumLink = data.get('mediumLink')?.toString();
    const year = data.get('year')?.toString()
    const image = data.get('image')


    if (!image) {
      return NextResponse.json({ "msg": "no file found (check for 'image' key in body)", success: false });
    }

    if (image instanceof File) {

<<<<<<< Updated upstream
      const byteData = await image.arrayBuffer();
      const buffer = Buffer.from(byteData);
=======
      const folderName = `NewImages/interviews/${year}`
      const path = await uploadImageToCloudinary(image, folderName);
>>>>>>> Stashed changes

      var existingDocument
      if (year) {
        existingDocument = await InterviewsAll.findOne({ year: parseInt(year) });
      }
<<<<<<< Updated upstream

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



      var path;

      if (uploadResult) path = uploadResult.secure_url;

=======
>>>>>>> Stashed changes
      if (existingDocument) {
        existingDocument.interviews.push({
          name: name,
          company: company,
          mediumLink: mediumLink,
          image: path,
        });
        await existingDocument.save();
      }
      else {
        const newDocument = new InterviewsAll({
          year: year,
          interviews: [
            {
              name: name,
              company: company,
              mediumLink: mediumLink,
              image: path,
            },
          ],
        });
        await newDocument.save();
      }


      return NextResponse.json({ "msg": "interview added successfully", success: true });
    } else {
      return NextResponse.json({ "msg": "couldn't add interview", success: false });
    }
  }
  catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ "msg": "Internal server error", success: false });
  }

}