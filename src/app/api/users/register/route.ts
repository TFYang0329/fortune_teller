// ./src/app/api/users/register/route.ts
import { dbWrapper } from "@/lib/connectDatabase"; // 引入通用邏輯
import { registerUser } from "./handler";
import {printRequestInfo} from "@/lib/common";

// **CREATE** - POST /api/users/register
export const POST = async (req: Request,
                           context: { params: { email: string, password: string } }) => {
    await printRequestInfo(req);
    return dbWrapper(registerUser, req, context);
};