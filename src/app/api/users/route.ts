// ./src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { createUser, getAllUsers } from './handler';
import {printRequestInfo} from "@/lib/common";

export async function POST(req: Request) {
    await printRequestInfo(req);
    try {
        const body = await req.json();
        const newUser = await createUser(body);

        return NextResponse.json({ message: '用戶新增成功', user: newUser });
    } catch (error) {
        return NextResponse.json(
            { message: '用戶新增失敗', error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    await printRequestInfo(req);
    try {
        const users = await getAllUsers();
        return NextResponse.json({ message: '用戶列表讀取成功', users });
    } catch (error) {
        return NextResponse.json(
            { message: '用戶列表讀取失敗', error: (error as Error).message },
            { status: 500 }
        );
    }
}