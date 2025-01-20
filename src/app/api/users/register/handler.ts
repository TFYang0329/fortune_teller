// ./src/app/api/users/register/handler.ts
import {NextResponse} from "next/server";
import {User} from "@/lib/models/user"; // 引入 User 模型
import bcrypt from "bcryptjs";

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

    return NextResponse.json({message: "用戶新增成功", user: newUser});
};
