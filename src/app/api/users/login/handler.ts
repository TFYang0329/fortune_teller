// ./src/app/api/users/login/handler.ts
import { NextResponse } from "next/server";
import { User } from "@/lib/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const loginHandler = async (req: Request): Promise<Response> => {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json({ message: "請提供有效的信箱和密碼" }, { status: 400 });
    }

    // 在数据库中查找用户
    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ message: "用戶不存在" }, { status: 404 });
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: "密碼錯誤" }, { status: 401 });
    }

    // 生成 JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "24h", // Token 有效期为 24 小时
    });

    // 设置 HttpOnly Cookie
    const response = NextResponse.json({
        message: "登入成功",
        user: {
            id: user._id,
            email: user.email,
            username: user.username,
        },
    });
    response.cookies.set("authToken", token, {
        httpOnly: true, // 防止前端 JavaScript 访问
        sameSite: "strict", // 防止跨站请求伪造 (CSRF)
        maxAge: 24 * 60 * 60, // 有效期为 24 小时，单位为秒
    });

    response.cookies.set("username", user.username, {
        httpOnly: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 小时
    });

    response.cookies.set("email", user.email, {
        httpOnly: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 小时
    });

    return response;
};