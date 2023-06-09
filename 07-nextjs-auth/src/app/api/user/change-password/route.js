import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/db';
import { hashPassword, verifyPassword } from '../../../../../lib/auth';
import { getSession } from 'next-auth/react';


export async function PATCH(request, response) {

    const session = await getSession(request.json());

    if (!session) {
        return NextResponse.json(
            {
                message:
                    'Not authenticated!',
            },
            { status: 401 }
        );
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
        client.close();
        return NextResponse.json(
            { message: 'User not found.' },
            { status: 404 }
        );
    }

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(
        oldPassword,
        currentPassword
    );

    if (!passwordsAreEqual) {
        client.close();
        return NextResponse.json(
            {
                message:
                    'Invalid password.',
            },
            { status: 403 }
        );
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
        { email: userEmail },
        { $set: { password: hashedPassword } }
    );

    client.close();
    res.status(200).json({ message: 'Password updated!' });
}

