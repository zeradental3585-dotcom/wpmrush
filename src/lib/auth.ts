import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { upsertUser } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.uid = user.id;
        try {
          await upsertUser({
            id: user.id,
            email: user.email ?? null,
            name: user.name ?? null,
            image: user.image ?? null,
          });
        } catch (err) {
          // Don't block sign-in if the DB write fails (e.g. Postgres not
          // provisioned yet) — the session still works, just without a
          // guaranteed local user row until the next successful sign-in.
          console.error("Failed to upsert user on sign-in", err);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.uid === "string") {
        session.user.id = token.uid;
      }
      return session;
    },
  },
};
