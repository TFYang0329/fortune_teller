// ./src/app/api/users/logout/handler.ts
import { NextResponse } from "next/server";

export const logoutHandler = async (): Promise<Response> => {
    const response = NextResponse.json({
        message: "登出成功",
    });

    // 清除 HttpOnly Cookie
    response.cookies.set("authToken", "", {
        httpOnly: true, // 保持安全性
        sameSite: "strict", // 防止 CSRF
        maxAge: -1, // 设置为过期状态
        path: "/", // 确保所有路径都能清除 Cookie
    });

    return response;
};