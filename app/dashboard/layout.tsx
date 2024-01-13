import options from '@/lib/admin/auth';
import { Button, Link } from '@nextui-org/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { button as buttonStyles } from '@nextui-org/theme';

interface User {
  name: string | null;
  email: string | null;
  image: File | null;
  role: 'admin' | 'User';
}

interface Session {
  user: User;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(options)) as Session;

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  return (
    <>
      <div className="mb-4 w-2/12">
        {session && (
          <Button
            fullWidth
            href="/api/auth/signout"
            as={Link}
            color="danger"
            variant="shadow"
          >
            Log Out
          </Button>
        )}
      </div>
      <section className="items-center justify-center gap-4">
        <div className="text-center justify-center">
          {session?.user?.role === 'admin' ? (
            children
          ) : (
            <h3>You don't have the permissions to visit this site.</h3>
          )}
        </div>
      </section>
    </>
  );
}
