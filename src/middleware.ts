// ./src/middleware.ts
import { NextRequest, NextResponse } from "next/server";

console.log("Middleware loaded.");

const WHITELIST_PATHS = ["/api/users/register", "/api/users/login"]; // 白名單路徑

export function middleware(req: NextRequest) {
    console.log("Middleware triggered for URL:", req.url);

    const token = req.cookies.get("authToken")?.value;

    // 获取请求路径
    const path = req.nextUrl.pathname;
    console.log("Path:", path);
    if (WHITELIST_PATHS.includes(path)) {
        console.log("Path is in whitelist. Skipping middleware:", path);
        return NextResponse.next();
    }

    // 区分 API 和页面
    const isApi = path.startsWith("/api");
    const isLoginPage = path.startsWith("/login");

    if (!token) {
        // 如果没有 Token
        if (!isLoginPage) {
            console.log("No token found. Redirecting to login.");
            if (isApi) {
                // 对于 API 请求，返回未授权状态
                return new NextResponse(
                    JSON.stringify({ message: "權限不足" }),
                    {
                        status: 401,
                        headers: { "Content-Type": "application/json" },
                    }
                );
            } else {
                // 对于页面请求，跳转到登录页面
                return NextResponse.redirect(new URL("/login", req.url));
            }
        }
    } else if (isLoginPage) {
        console.log("Token found. Redirecting to /.");
        return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("Token exists:", token);
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|favicon.ico).*)"], // 匹配所有路径，排除静态资源
};