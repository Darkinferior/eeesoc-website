// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [ name, company, mediumLink, year, image]


import { NextResponse } from 'next/server';
import { InterviewsAll } from "@/lib/models/interviewsAll"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';

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

      const folderName = `NewImages/interviews/${year}`
      const path = await uploadImageToCloudinary(image, folderName);

      var existingDocument
      if (year) {
        existingDocument = await InterviewsAll.findOne({ year: parseInt(year) });
      }
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