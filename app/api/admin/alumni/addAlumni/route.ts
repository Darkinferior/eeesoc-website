// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [ name, workplace, position, linkedInUrl, year, image]


import { NextResponse } from 'next/server';
import { Alumni } from "@/lib/models/alumni"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';



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

      var existingDocument
      if (year) {
        existingDocument = await Alumni.findOne({ year: parseInt(year) });
      }
      const folderName = `NewImages/alumni/${year}`
      const path = await uploadImageToCloudinary(image, folderName);


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