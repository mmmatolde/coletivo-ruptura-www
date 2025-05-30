import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)

  // Set a header to force scroll to top
  requestHeaders.set("x-scroll-to-top", "1")

  // Return the response with the modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
