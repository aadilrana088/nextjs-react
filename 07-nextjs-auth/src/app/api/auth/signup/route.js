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
        return NextResponse.json(
            {
                message:
                    'Invalid input - password should also be at least 7 characters long.',
            },
            { status: 422 }
        );
    }

    let client;

    try {
        client = await connectToDatabase();
    } catch (error) {
        return NextResponse.json(
            { message: 'Could not connect to database.' },
            { status: 500 }
        );
    }

    const db = client.db();

    const existingUser = await db.collection('users').findOne({ email: email });

    if (existingUser) {
        client.close();
        return NextResponse.json(
            { message: 'User exists already!' },
            { status: 422 }
        );
    }

    const hashedPassword = await hashPassword(password);
    const newUsers = {
        email: email,
        password: hashedPassword,
    };
    try {
        const result = await db.collection('users').insertOne(newUsers);
        newUsers.id = result.insertedId;
    } catch (error) {
        client.close();
        return NextResponse.json(
            { message: 'Storing message failed!' },
            { status: 500 }
        );
    }

    client.close();

    console.log(newUsers);

    return NextResponse.json(
        { message: 'Created user!', message: newUsers },
        { status: 201 }
    );
}
