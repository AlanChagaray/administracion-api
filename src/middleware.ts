import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const allowedOrigin =
    process.env.NODE_ENV === "production"
      ? "https://administracion-titiacookies.vercel.app"
      : "http://localhost:3000";

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  response.headers.set("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return response;
  }
  
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return response;
  }
  const token = req.cookies.get("access_token")?.value;
  console.log("token: ",token)
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "No autorizado" }), {
      status: 401,
          headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Credentials": "true",
        }
    });
  }
  return response;
}

export const config = {
  matcher: ["/api/:path*", "/app/api/:path*"],
};