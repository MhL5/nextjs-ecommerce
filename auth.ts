import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import prisma from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  events: {
    async signIn({ user }) {
      if (user?.id) await mergeAnonymousCartIntoUserCart(user.id);
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
