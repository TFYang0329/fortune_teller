// ./src/app/api/users/[id]/route.ts
import { dbWrapper } from '@/lib/connectDatabase';
import { printRequestInfo } from '@/lib/common';
import { getUserHandler, updateUserHandler, deleteUserHandler } from './handler';

// GET Method
export const GET = async (req: Request, context: { params: { id: string } }) => {
    await printRequestInfo(req);
    return dbWrapper(getUserHandler, req, context);
};

// PATCH Method
export const PATCH = async (req: Request, context: { params: { id: string } }) => {
    await printRequestInfo(req);
    return dbWrapper(updateUserHandler, req, context);
};

// DELETE Method
export const DELETE = async (req: Request, context: { params: { id: string } }) => {
    await printRequestInfo(req);
    return dbWrapper(deleteUserHandler, req, context);
};