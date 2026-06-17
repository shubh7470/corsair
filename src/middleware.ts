export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - login (auth page)
     * - features, how-it-works, pricing, docs (public marketing pages)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo.png (static assets)
     * - $ (the root path /)
     */
    "/((?!api/auth|login|features|how-it-works|pricing|docs|_next/static|_next/image|favicon.ico|logo.png|$).*)",
  ],
};
