// ./src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

const WHITELIST_PATHS = ["/api/users/register", "/api/users/login", "/css"]; // 白名單路徑

export function middleware(req: NextRequest) {
    console.log("Middleware triggered for URL:", req.url);

    const token = req.cookies.get("authToken")?.value;
    const path = req.nextUrl.pathname;

    if (WHITELIST_PATHS.includes(path)) {
        console.log("Path is in whitelist. Skipping middleware:", path);
        return NextResponse.next();
    }

    const isApi = path.startsWith("/api");
    const isLoginPage = path.startsWith("/login");
    const isRootPage = path === "/";

    const response = NextResponse.next();
    if (!token) {
        if (!isLoginPage) {
            console.log("No token found. Redirecting to login.");
            if (isApi) {
                return new NextResponse(
                    JSON.stringify({ message: "權限不足" }),
                    {
                        status: 401,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } else {
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }
    } else {
        response.cookies.set("loginStatus", "loggedIn", { path: "/", maxAge: 60 * 60 * 24 });

        if (isLoginPage || isRootPage) {
            console.log("Token found. Redirecting to /home.");
            return NextResponse.redirect(new URL("/home", req.url));
        }
    }

    console.log("Token exists:", token);
    return response;
}

export const config = {
    matcher: ["/((?!_next/static|favicon.ico).*)"], // 匹配所有路径，排除静态资源
};
