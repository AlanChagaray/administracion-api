import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("🚀 Middleware ejecutado para:", req.nextUrl.pathname);
  console.log("🌎 Entorno:", process.env.enviroment);

  const allowedOrigin =
    process.env.enviroment === "production"
      ? "https://administracion-titiacookies.vercel.app"
      : "http://localhost:3000";

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/app/api/:path*"],
};
