import { NextResponse } from 'next/server';
import { hashPassword } from '../../../../../lib/auth';
import { connectToDatabase } from '../../../../../lib/db';
export async function POST(request) {
    const { email, password } = await request.json();

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        NextResponse.json(
            {
                message:
                    'Invalid input - password should also be at least 7 characters long.',
            },
            { status: 422 }
        );
        return;
    }

    

    let client;

    try {
        client = await connectToDatabase();
    } catch (error) {
        NextResponse.json(
            { message: 'Could not connect to database.' },
            { status: 500 }
        );
        return;
    }

    const db = client.db();

    const hashedPassword = await hashPassword(password);
    const newUsers = {
        email: email,
        password: hashedPassword
    }
    try {
        const result = await db.collection('users').insertOne(newUsers);
        newUsers.id = result.insertedId;
    } catch (error) {
        client.close();
        NextResponse.json(
            { message: 'Storing message failed!' },
            { status: 500 }
        );
        return;
    }

    client.close();

    console.log(newUsers);

    return NextResponse.json(
        { message: 'Created user!', message: newUsers },
        { status: 201 }
    );
}
