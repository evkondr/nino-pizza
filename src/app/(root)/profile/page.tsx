import { getUserSession } from '@/lib/get-user-session'
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const session = await getUserSession();
 
  if (!session) {
    return redirect('/not-auth');
  }
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage