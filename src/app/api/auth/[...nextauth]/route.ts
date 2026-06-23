// src/app/api/auth/[...nextauth]/route.ts
// NextAuth v5 App Router handler — catches all /api/auth/* requests
import { handlers } from "@/auth";

export const { GET, POST } = handlers;
