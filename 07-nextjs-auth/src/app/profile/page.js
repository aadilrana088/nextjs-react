import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import UserProfile from '../../../components/profile/user-profile';
import { NextRequest } from 'next/server';

async function ProfilePage({context, request}) {
    // const request = NextRequest.next();
    console.log("Context: "+context);
    // const session = await request.getAll();
    console.log("Session: "+request);
    // if (!session) {
    //     console.log("true");
    //     // if (!session) {
    //     //     redirect('/auth')
    //     // }
    // }
    return <UserProfile />;
}

export default ProfilePage;
