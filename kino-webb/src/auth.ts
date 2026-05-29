import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/app/lib/zod";
import { verifyPassword } from '@/app/utils/password';
import { getUserByEmail } from "@/app/utils/db";
import { Role } from '@/generated/prisma/client';
import { NextResponse } from "next/server";

 
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
        session.user.id = token.sub!;
      }
      return session;
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === Role.ADMIN;
      const path  = nextUrl.pathname;

      if (path.startsWith("/admin") && (!isLoggedIn || !isAdmin)) {
        const url = nextUrl.clone();
        url.pathname = '/';
        url.searchParams.set('openLogin', 'true');
        return NextResponse.redirect(url);
      }

      if (path.startsWith("/member-page") && !isLoggedIn) {
        const url = nextUrl.clone();
        url.pathname = '/';
        url.searchParams.set('openLogin', 'true');
        return NextResponse.redirect(url);
      }
      return true;
    },
  },
  session: {
    strategy: "jwt"
  },
});
