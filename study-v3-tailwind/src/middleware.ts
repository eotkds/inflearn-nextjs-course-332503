import { NextResponse } from "next/server";
import { auth } from "./auth";
import type { NextRequest } from "next/server";

// See "Matching Paths" below to learn more
export async function middleware(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.redirect(new URL("/i/flow/login", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
