// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [ name, linkedInUrl, EmailID, designation, image]
// optional data inputs from the form = [facebookUrl, instagramUrl]

import { NextResponse } from "next/server";
import { ExecutiveBodyFinalYear } from "@/lib/models/executiveBodyFinalYear";
import { connectToDb } from "@/lib/dbConnection/connect";
import { uploadImageToCloudinary } from "@/lib/cloudinary/generateImageUrl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectToDb();
    const data = await request.formData();

    const name = data.get("name")?.toString();
    const linkedinUrl = data.get("linkedinUrl")?.toString();
    const instagramUrl = data.get("instagramUrl")?.toString();
    const facebookUrl = data.get("facebookUrl")?.toString();
    const EmailID = data.get("EmailID")?.toString();
    const designation = data.get("designation")?.toString();

    const image = data.get("image");

    if (!image) {
      return NextResponse.json({
        msg: "no file found (check for 'image' key in body)",
        success: false,
      });
    }

    if (image instanceof File) {
      const folderName = `NewImages/executiveBody/finalYear`;
      const path = await uploadImageToCloudinary(image, folderName);
      const newDocument = new ExecutiveBodyFinalYear({
        name: name,
        linkedinUrl: linkedinUrl,
        instagramUrl: instagramUrl,
        facebookUrl: facebookUrl,
        EmailID: EmailID,
        designation: designation,
        image: path,
      });
      await newDocument.save();

      return NextResponse.json({
        msg: "member added successfully",
        success: true,
      });
    } else {
      return NextResponse.json({ msg: "couldn't add member", success: false });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ msg: "Internal server error", success: false });
  }
}
