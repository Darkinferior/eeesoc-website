// necessary query parameters = [ id ]
// optional query parameters = []
// necessary data inputs from the form = []
// optional data inputs from the form = [ name, linkedInUrl, EmailID, designation, facebookUrl, instagramUrl, image]



import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { NextResponse } from 'next/server';
import { ExecutiveBodyPreFinalYear } from "@/lib/models/executiveBodyPreFinalYear"


export async function PATCH(request: Request): Promise<NextResponse> {

    const url = new URL(request.url);
    const member_id = url.searchParams.get("id");

    const data = await request.formData();

    const newName = data.get('name')?.toString();
    const newLinkedinUrl = data.get('linkedinUrl')?.toString();
    const newInstagramUrl = data.get('instagramUrl')?.toString();
    const newFacebookUrl = data.get('facebookUrl')?.toString();
    const newEmailID = data.get('emailID')?.toString();
    const newDesignation = data.get('designation')?.toString();

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
            path = `./public/executiveBody/preFinalYear/${newImage.name}`;
            const directory = dirname(path);
            await fsPromises.mkdir(directory, { recursive: true });
            await fsPromises.writeFile(path, buffer);
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
}
