import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const cookie = request.cookies.get("token");
  const protectedPaths = ["/editor", "/gallery", "/products"];
  const pathname = new URL(request.url).pathname;
  if (cookie) {
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/editor", request.url));
    }
    try {
      return NextResponse.next();
    } catch (error) {
      throw new Error("Not authorized");
    }
  } else {
    if (protectedPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
};

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
