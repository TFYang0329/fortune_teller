// ./src/app/api/users/login/route.ts
import {dbWrapper} from "@/lib/connectDatabase";
import {loginHandler} from "./handler";
import {printRequestInfo} from "@/lib/common";

export const POST = async (req: Request,
                           context: { params: { username: string, email: string, password: string } }) => {
    await printRequestInfo(req);
    return dbWrapper(loginHandler, req, context);
};
