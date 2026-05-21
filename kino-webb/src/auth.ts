import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/app/lib/zod";
import { verifyPassword } from '@/app/utils/password';
import { getUserByEmail } from "@/app/utils/db";
import { Role } from '@/generated/prisma/client';

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-post", type: "email", placeholder: "exempelnamn@exempel.se"},
        password: { label: "Lösenord", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          const user = await getUserByEmail(email);

          if(user) {
            const passwordVerified = await verifyPassword(password, user.passwordHash);
            if (passwordVerified) {
              return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
              };
            }
          } else return null;
        } catch (error) {
          if (error instanceof ZodError) return null;
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === Role.ADMIN;
      const path  = nextUrl.pathname;

      if (path.startsWith("/admin") && (!isLoggedIn || !isAdmin)) {
        return false;
      }

      if (path.startsWith("/member-page") && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt"
  },
});
