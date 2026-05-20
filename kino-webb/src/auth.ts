import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/app/lib/zod";
import { saltAndHashPassword } from '@/app/utils/password';
import { getUserFromDb } from "@/app/utils/db";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-post", type: "email", placeholder: "exempelnamn@exempel.se"},
        password: { label: "Lösenord", type: "password" },
      },
      async authorize(credentials, _request) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { email, password } = await signInSchema.parseAsync(credentials);

          const pwHash = await saltAndHashPassword(password);

          const user = await getUserFromDb(email, pwHash);

          if (!user) return null;

          return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          };
        } catch (error) {
          if (error instanceof ZodError) return null;
          return null;
        }
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
    }
  },
  session: {
    strategy: "jwt"
  },
})
