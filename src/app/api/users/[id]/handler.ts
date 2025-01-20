// ./src/app/api/users/[id]/handler.ts
import { NextResponse } from 'next/server';
import { getUserById, updateUserById, deleteUserById } from '@/lib/models/user';

// **GET Handler**
export const getUserHandler = async (req: Request, { params }: { params: { id: string } }): Promise<Response> => {
    const user = await getUserById(params.id);

    if (!user) {
        return NextResponse.json({ message: '用戶不存在' }, { status: 404 });
    }

    return NextResponse.json({ message: '用戶讀取成功', user });
};

// **PATCH Handler**
export const updateUserHandler = async (req: Request, { params }: { params: { id: string } }): Promise<Response> => {
    const body = await req.json();
    const user = await updateUserById(params.id, body);

    if (!user) {
        return NextResponse.json({ message: '用戶不存在' }, { status: 404 });
    }

    return NextResponse.json({ message: '用戶更新成功', user });
};

// **DELETE Handler**
export const deleteUserHandler = async (req: Request, { params }: { params: { id: string } }): Promise<Response> => {
    const user = await deleteUserById(params.id);

    if (!user) {
        return NextResponse.json({ message: '用戶不存在' }, { status: 404 });
    }

    return NextResponse.json({ message: '用戶刪除成功' });
};