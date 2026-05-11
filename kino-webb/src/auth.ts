import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from '@/src/app/lib/password';
import { getUserByEmail } from "./app/lib/db";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-post", type: "email", placeholder: "exempel@exempel.se"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null; // TODO: Behövs annan felhantering?

        const user = await getUserByEmail(credentials.email as string);

        if (!user) return null;

        const passwordValid = await verifyPassword(
          credentials.password as string,
          user.passwordHash
        );

        if (!passwordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
})
