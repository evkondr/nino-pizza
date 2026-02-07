import { getUserSession } from '@/lib/get-user-session';
import { prisma } from '@/lib/prisma-client';
import ProfileForm from '@/shared/ProfileForm';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const session = await getUserSession();
 
  if (!session) {
    return redirect('/not-auth');
  }
  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id)
    }
  });
  return (
    <ProfileForm data={user!} />
  );
};

export default ProfilePage;