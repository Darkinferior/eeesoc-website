// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [title, content, contentImage]
// optional data inputs from the form = []

import { NextResponse } from "next/server";
import { Workshop } from "@/lib/models/workshop";
import { connectToDb } from "@/lib/dbConnection/connect";
import { uploadImageToCloudinary } from "@/lib/cloudinary/generateImageUrl";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    await connectToDb();
    const data = await request.formData();

    const title = data.get("title")?.toString();
    const cardImage = data.get("cardImage")?.toString();
    const content = data.get("content")?.toString();

    const contentImage = data.get("contentImage");

    if (!contentImage) {
      return NextResponse.json({
        msg: "no file found (check for 'contentImage' key in body)",
        success: false,
      });
    }

    if (contentImage instanceof File) {
      const folderName = `NewImages/workshops`;
      const path = await uploadImageToCloudinary(contentImage, folderName);

      const newDocument = new Workshop({
        title: title,
        cardImage: path,
        contentImage: path,
        content: content,
      });
      await newDocument.save();

      return NextResponse.json({
        msg: "workshop added successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        msg: "couldn't add workshop",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ msg: "Internal server error", success: false });
  }
}
