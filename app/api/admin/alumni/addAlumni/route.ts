// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [ name, workplace, position, linkedInUrl, year, image]




import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UploadApiErrorResponse } from 'cloudinary';

import { NextResponse } from 'next/server';
import { Alumni } from "@/lib/models/alumni"
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

    const name = data.get('name')?.toString();
    const workplace = data.get('workplace')?.toString();
    const position = data.get('position')?.toString();
    const linkedinUrl = data.get('linkedinUrl')?.toString();
    const year = data.get('year')?.toString()
    const image = data.get('image')


    if (!image) {
      return NextResponse.json({ "msg": "no file found (check for 'image' key in body)", success: false });
    }

    if (image instanceof File) {

      const byteData = await image.arrayBuffer();
      const buffer = Buffer.from(byteData);

      var existingDocument
      if (year) {
        existingDocument = await Alumni.findOne({ year: parseInt(year) });
      }

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



      var path;

      if (uploadResult) path = uploadResult.secure_url;

      if (existingDocument) {
        existingDocument.alumni.push({
          name: name,
          workplace: workplace,
          linkedinUrl: linkedinUrl,
          image: path,
          position: position
        });
        await existingDocument.save();
      }
      else {
        const newDocument = new Alumni({
          year: year,
          alumni: [
            {
              name: name,
              workplace: workplace,
              linkedinUrl: linkedinUrl,
              image: path,
              position: position
            },
          ],
        });
        await newDocument.save();
      }


      return NextResponse.json({ "msg": "alumni added successfully", success: true });
    } else {
      return NextResponse.json({ "msg": "couldn't add alumni", success: false });
    }
  }
  catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ "msg": "Internal server error", success: false });
  }

}