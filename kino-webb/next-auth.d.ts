import { Role } from "@/generated/prisma/enums";
import { DefaultSession, DefaultUser } from "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User extends DefaultUser {
    role: Role;
  }
  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: Role;
  }
}