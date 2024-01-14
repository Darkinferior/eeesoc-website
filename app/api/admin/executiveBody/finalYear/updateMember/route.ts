// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [ name, linkedInUrl, EmailID, designation, facebookUrl, instagramUrl, image]

import { NextResponse } from "next/server";
import { ExecutiveBodyFinalYear } from "@/lib/models/executiveBodyFinalYear";
import { connectToDb } from "@/lib/dbConnection/connect";
import { uploadImageToCloudinary } from "@/lib/cloudinary/generateImageUrl";

export async function PATCH(request: Request): Promise<NextResponse> {
  try {
    await connectToDb();
    const url = new URL(request.url);
    const member_id = url.searchParams.get("id");

    const data = await request.formData();

    const newName = data.get("name")?.toString();
    const newLinkedinUrl = data.get("linkedinUrl")?.toString();
    const newInstagramUrl = data.get("instagramUrl")?.toString();
    const newFacebookUrl = data.get("facebookUrl")?.toString();
    const newEmailID = data.get("EmailID")?.toString();
    const newDesignation = data.get("designation")?.toString();

    const newImage = data.get("image");
    if (!member_id) {
      return NextResponse.json({
        msg: "'id' parameter is missing",
        success: false,
      });
    }

    const existingMember = await ExecutiveBodyFinalYear.findOne({
      _id: member_id,
    });

    if (existingMember) {
      var path;

      if (newImage instanceof File) {
        const folderName = `NewImages/executiveBody/finalYear`;
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

      return NextResponse.json({
        msg: "member data updated successfully",
        success: true,
      });
    } else {
      return NextResponse.json({ msg: "no member found", success: false });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ msg: "Internal server error", success: false });
  }
}
