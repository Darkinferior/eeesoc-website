import GitHubProvider from "next-auth/providers/github";
import { TokenSet, Session, User, NextAuthOptions } from "next-auth";

const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        let userRole: string = "User";
        if (profile?.email === "eeesoc@bitmesra.ac.in") {
          userRole = "admin";
        }
        return {
          ...profile,
          id: profile.id.toString(),
          role: userRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: TokenSet; user?: User }) {
      if (user) token.role = (user as User & { role: string }).role;
      return token;
    },
    async session({ session, token }: { session: Session; token: TokenSet }) {
      if (session?.user) {
        const userWithRole = {
          ...session.user,
          role: token.role as string,
        };
        session.user = userWithRole;
      }
      return session;
    },
  },
};

export default options;
