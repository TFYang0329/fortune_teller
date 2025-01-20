// ./src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

console.log("Middleware loaded.");

export function middleware(req: NextRequest) {
    console.log("Middleware triggered for URL:", req.url);

    const token = req.cookies.get("authToken")?.value;
    if (!token) {
        // 如果没有 Token 且访问的不是登录页面，则跳转到登录页面
        if (!req.nextUrl.pathname.startsWith("/login")) {
            console.log("No token found. Redirecting to /login.");
            return NextResponse.redirect(new URL("/login", req.url));
        }
    } else {
        // 如果有 Token 且访问的是登录页面，则跳转到首页
        if (req.nextUrl.pathname.startsWith("/login")) {
            console.log("Token found. Redirecting to /.");
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    console.log("Token exists:", token);
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/:path*"], // 匹配所有路径
};