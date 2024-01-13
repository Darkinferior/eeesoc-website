// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [name, designation, department, areasOfInterest, profileLink, image]
// optional data inputs from the form = []

// for data input  "areasOfInterest"  send various interests as comma-separated string

import { NextResponse } from "next/server";
import { Mentor } from "@/lib/models/mentor";
import { connectToDb } from "@/lib/dbConnection/connect";
import { uploadImageToCloudinary } from "@/lib/cloudinary/generateImageUrl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectToDb();
    const data = await request.formData();

    const name = data.get("name")?.toString();
    const designation = data.get("designation")?.toString();
    const department = data.get("department")?.toString();
    const areasOfInterest = data.get("areasOfInterest")?.toString();
    const profileLink = data.get("profileLink")?.toString();
    const image = data.get("image");

    var formattedAreasOfInterest;
    if (areasOfInterest) formattedAreasOfInterest = areasOfInterest.split(",");

    if (!image) {
      return NextResponse.json({
        msg: "no file found (check for 'contentImage' key in body)",
        success: false,
      });
    }

    if (image instanceof File) {
      const folderName = `NewImages/mentors`;
      const path = await uploadImageToCloudinary(image, folderName);

      const newDocument = new Mentor({
        name: name,
        image: path,
        department: department,
        designation: designation,
        profileLink: profileLink,
        areasOfInterest: formattedAreasOfInterest,
      });
      await newDocument.save();

      return NextResponse.json({
        msg: "mentor added successfully",
        success: true,
      });
    } else {
      return NextResponse.json({ msg: "couldn't add mentor", success: false });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ msg: "Internal server error", success: false });
  }
}
