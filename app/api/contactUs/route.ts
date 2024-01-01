
// required data inputs from the form = [ name, email, subject, description]

import { NextResponse } from 'next/server';
import { ContactUs } from '@/lib/models/contactUs';


export async function POST(request: Request): Promise<NextResponse> {

    const data = await request.formData();

    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const subject = data.get('subject')?.toString();
    const description = data.get('description')?.toString();

    try {
        const newDocument = new ContactUs({
            name: name,
            email: email,
            subject: subject,
            description: description
        });

        await newDocument.save();
        return NextResponse.json({ "msg": "response added successfully", success: true });
    }
    catch {
        return NextResponse.json({ "msg": "couldn't add response", success: false });
    }





}
