// src/auth.ts
// NextAuth v5 core configuration (App Router compatible)
import NextAuth, { type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// Extend the built-in session types to include our custom user fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // ─── Providers ───────────────────────────────────────────────────
  providers: [
    // 1. Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 2. Email + Password (Credentials)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        await connectToDatabase();

        // Find user and explicitly select the password field (excluded by default)
        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error("No account found with this email address.");
        }

        if (!user.password) {
          throw new Error("This account uses Google Sign-In. Please sign in with Google.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Incorrect password. Please try again.");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  // ─── Pages ───────────────────────────────────────────────────────
  pages: {
    signIn: "/auth", // Our custom auth page
    error: "/auth",  // Redirect auth errors to the same page
  },

  // ─── Session ─────────────────────────────────────────────────────
  session: {
    strategy: "jwt",
  },

  // ─── Callbacks ───────────────────────────────────────────────────
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google OAuth sign-ins — upsert user in MongoDB
      if (account?.provider === "google") {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name ?? "Google User",
            email: user.email ?? "",
            image: user.image ?? undefined,
            provider: "google",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // Secret for JWT signing (must be set in .env.local)
  secret: process.env.NEXTAUTH_SECRET,
});
