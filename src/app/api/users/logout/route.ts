// ./src/app/api/users/logout/route.ts
import {dbWrapper} from "@/lib/connectDatabase";
import {logoutHandler} from "./handler";
import {printRequestInfo} from "@/lib/common";

export const POST = async (req: Request) => {
    await printRequestInfo(req);
    return dbWrapper(logoutHandler, req, {});
};
