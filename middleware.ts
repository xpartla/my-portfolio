import {auth} from "@/auth";
import {NextResponse} from "next/server";

export async function middleware(req: Request) {
    const session = await auth();

    if (!session) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }
    const allowedUser = "xpartla";
    const allowedEmail = "xpartla@stuba.sk"

    if (session.user?.name !== allowedUser && session.user?.email !== allowedEmail ) {
        return new NextResponse("Access denied", {status: 403});
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
}