import { getSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import UserProfile from '../../../components/profile/user-profile';

async function ProfilePage({ params }) {
    const session = await getSession({ req: params.req });
    if (!session) {
        console.log("true");
        if (!session) {
            redirect('/auth')
        }
    }
    return <UserProfile />;
}

export default ProfilePage;
