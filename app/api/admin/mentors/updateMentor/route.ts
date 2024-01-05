// necessary query parameters = [id]
// optional query parameters = []
// optional data inputs from the form = [name, designation, department, areasOfInterest, profileLink, image]


// for data input  "areasOfInterest"  send various interests as comma-separated string

import { NextResponse } from 'next/server';
import { Mentor } from "@/lib/models/mentor"
import { connectToDb } from "@/lib/dbConnection/connect"
import { uploadImageToCloudinary } from '@/lib/cloudinary/generateImageUrl';


export async function PATCH(request: Request): Promise<NextResponse> {
    try {
        await connectToDb();
        const url = new URL(request.url);
        const mentor_id = url.searchParams.get("id");

        const data = await request.formData();

        const newName = data.get('name')?.toString();
        const newDesignation = data.get('designation')?.toString();
        const newDepartment = data.get('department')?.toString();
        const newAreasOfInterest = data.get('areasOfInterest')?.toString();
        const newProfileLink = data.get('profileLink')?.toString();

        var formattedAreasOfInterest
        if(newAreasOfInterest) formattedAreasOfInterest = newAreasOfInterest.split(',');

        const newImage = data.get('image')

        if (!mentor_id) {
            return NextResponse.json({ "msg": "'id' parameter is missing", success: false });
        }


        const existingMentor = await Mentor.findOne({ _id: mentor_id });

        if (existingMentor) {

            var path;

            if (newImage instanceof File) {
                const folderName = `NewImages/mentors`
                path = await uploadImageToCloudinary(newImage, folderName);
            }


            if (newName) existingMentor.name = newName;
            if (newDesignation) existingMentor.designation = newDesignation;
            if (newImage instanceof File) existingMentor.image = path;
            if (newDepartment) existingMentor.department = newDepartment;
            if (newProfileLink) existingMentor.profileLink = newProfileLink;
            if (formattedAreasOfInterest) existingMentor.areasOfInterest = formattedAreasOfInterest;
            

            await existingMentor.save();

            return NextResponse.json({ "msg": "workshop data updated successfully", success: true });
        }
        else {
            return NextResponse.json({ "msg": "no workshop found", success: false });
        }
    }
    catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ "msg": "Internal server error", success: false });
    }



}