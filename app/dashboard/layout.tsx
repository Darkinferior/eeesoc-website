import options from "@/lib/admin/auth";
import { Link } from "@nextui-org/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { button as buttonStyles } from "@nextui-org/theme";

interface User {
  name: string | null;
  email: string | null;
  image: File | null;
  role: "admin" | "User";
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
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  return (
    <section className='items-center justify-center gap-4 py-8 md:py-10'>
      <div className='absolute right-10 top-[65px]'>
        {session && (
          <Link
            href='/api/auth/signout'
            className={`${buttonStyles({
              variant: "shadow",
              radius: "full",
            })} bg-gradient-to-tr from-rose-500 to-red-500 w-fit h-7`}
          >
            Log Out
          </Link>
        )}
      </div>
      <div className='text-center justify-center'>
        {session?.user?.role === "admin" ? (
          children
        ) : (
          <h3>You don't have the permissions to visit this site.</h3>
        )}
      </div>
    </section>
  );
}
