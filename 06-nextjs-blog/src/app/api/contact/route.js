import { NextResponse } from 'next/server';

export async function POST(request) {
    const { email, name, message } = await request.json();
    if (
        !email ||
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !message ||
        message.trim() === ''
    ) {
        NextResponse.json({ message: 'Invalid input.' }, { status: 422 });
        return;
    }

    const newMessage = {
        email,
        name,
        message,
    };

    console.log(newMessage);

    return NextResponse.json({ message: 'Successfully stored message!', message: newMessage }, { status: 201 });
}
