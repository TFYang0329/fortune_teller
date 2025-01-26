// ./src/app/api/users/register/handler.ts
import {NextResponse} from "next/server";
import {User} from "@/lib/models/user"; // 引入 User 模型
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// **CREATE** - POST /api/users/register
export const registerUser = async (req: Request) => {
    const body = await req.json();
    const {username, email, password} = body;

    console.log("Received data:", username, email, password);

    if (!username || !email || !password) {
        return NextResponse.json(
            {message: "請提供完整的用戶資料"},
            {status: 400}
        );
    }

    // 檢查用戶是否已存在
    const existingUser = await User.findOne({email});
    if (existingUser) {
        return NextResponse.json(
            {message: "電子郵件已被使用"},
            {status: 409}
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 創建新用戶
    const newUser = new User({username, email, password: hashedPassword});
    await newUser.save();

    // 生成 JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
        expiresIn: "24h", // Token 有效期为 24 小时
    });

    // 设置 HttpOnly Cookie
    const response = NextResponse.json({
        message: "註冊成功",
        user: {
            id: newUser._id,
            email: newUser.email,
            username: newUser.username,
        },
    });
    response.cookies.set("authToken", token, {
        httpOnly: true, // 防止前端 JavaScript 访问
        sameSite: "strict", // 防止跨站请求伪造 (CSRF)
        maxAge: 24 * 60 * 60, // 有效期为 24 小时，单位为秒
    });

    response.cookies.set("username", newUser.username, {
        httpOnly: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 小时
    });

    response.cookies.set("email", newUser.email, {
        httpOnly: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 小时
    });

    return response;
};
