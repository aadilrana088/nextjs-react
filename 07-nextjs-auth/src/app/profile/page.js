import UserProfile from '../../../components/profile/user-profile';

async function ProfilePage() {
    // const request = NextRequest.next();
    // console.log("Context: "+context);
    // const session = await request.getAll();
    // console.log("Session: "+request);
    // if (!session) {
    //     console.log("true");
    //     // if (!session) {
    //     //     redirect('/auth')
    //     // }
    // }
    return <UserProfile />;
}

export default ProfilePage;
