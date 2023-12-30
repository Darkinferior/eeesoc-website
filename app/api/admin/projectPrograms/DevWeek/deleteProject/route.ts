// necessary query parameters = [projectName, year]
// optional query parameters = []



import { NextResponse } from 'next/server';
import { Project } from "@/lib/models/project"


export async function DELETE(request: Request): Promise<NextResponse> {

    const url = new URL(request.url);

    const projectName = url.searchParams.get("name");
    const year = url.searchParams.get("year")

    if (!year) {
        return NextResponse.json({ "msg": "Year parameter is missing", success: false });
    }


    const existingDocument = await Project.findOne({ "type": "DevWeek" })

    if (existingDocument) {

        const yearIndex = existingDocument.yearWiseProjects.findIndex((item: { year: number }) => item.year === parseInt(year));

        if (yearIndex !== -1) {
            const projectArray = existingDocument.yearWiseProjects[yearIndex].projects
            const nameIndex = projectArray.findIndex((item: { name: String }) => item.name === projectName)
            if (nameIndex !== -1) {
                projectArray.splice(nameIndex, 1)
                await existingDocument.save();
                return NextResponse.json({ "msg": "project deleted successfully", success: true });
            }
            return NextResponse.json({ "msg": "project 'name' not found for deletion", success: false });
        }

        return NextResponse.json({ "msg": "poject not found for deletion", success: false });
    }

    return NextResponse.json({ "msg": "project 'type' not found for deletion", success: false });


}
