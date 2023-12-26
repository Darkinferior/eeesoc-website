// necessary query parameters = []
// optional query parameters = []
// necessary data inputs from the form = [ name, workplace, position, linkedInUrl, year, image]



import { promises as fsPromises } from 'fs';
import { dirname, join } from 'path';
import { NextResponse } from 'next/server';
import { Alumni } from "@/lib/models/alumni"


export async function POST(request: Request): Promise<NextResponse> {
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
    const path = `./public/alumni/${year}/${image.name}`;
    const directory = dirname(path);
    await fsPromises.mkdir(directory, { recursive: true });

    await fsPromises.writeFile(path, buffer);
    var existingDocument
    if (year) {
      existingDocument = await Alumni.findOne({ year: parseInt(year) });
    }

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


    return NextResponse.json({ "msg": "alumni added successfully", success: true});
  } else {
    return NextResponse.json({ "msg": "couldn't add alumni", success: false });
  }
}
