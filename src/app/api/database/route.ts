// ./src/app/api/database/route.ts
import { dbWrapper } from "@/lib/connectDatabase";
import { getCollectionsHandler } from "./handler";
import { printRequestInfo } from "@/lib/common";

// 使用 dbWrapper 包装 getCollectionsHandler
export async function GET(req: Request) {
    await printRequestInfo(req);
    return await dbWrapper(getCollectionsHandler, req, {});
}