// ./src/lib/common.ts
/**
 * 打印请求的相关信息
 * @param req - HTTP 请求对象
 */
export async function printRequestInfo(req: Request): Promise<void> {
    console.log('[Request] Method:', req.method, 'URL:', req.url);
}