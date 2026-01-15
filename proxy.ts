// middleware.ts (or proxy.ts)
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // Import your Better Auth instance

export async function proxy(request: NextRequest) {
  // Actually validate the session
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  // If no valid session, redirect to home
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Session is valid, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Also added :path* for nested routes
};
