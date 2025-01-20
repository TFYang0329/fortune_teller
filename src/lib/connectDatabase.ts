// ./src/lib/connectDatabase.ts
import mongoose, { Mongoose } from "mongoose";

// MongoDB 连接实例
const mongooseInstance: {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
} = {
  conn: null,
  promise: null,
};

// MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || "";
console.error("MONGODB_URI: ", MONGODB_URI);

if (!MONGODB_URI || !MONGODB_URI.startsWith("mongodb://")) {
  throw new Error("MONGODB_URI 必须是有效的 MongoDB 连接字符串");
}

// **连接 MongoDB**
export const connectDB = async (): Promise<Mongoose> => {
  // 如果已有连接，直接返回
  if (mongooseInstance.conn) {
    return mongooseInstance.conn;
  }

  // 如果没有连接实例，创建新的连接
  if (!mongooseInstance.promise) {
    mongooseInstance.promise = mongoose
        .connect(MONGODB_URI)
        .then((mongooseInstance) => {
          console.log("MongoDB 连接成功");
          return mongooseInstance;
        })
        .catch((error) => {
          console.error("MongoDB 连接失败：", error);
          throw error;
        });
  }

  // 等待连接完成后，更新 conn
  const conn = await mongooseInstance.promise;
  mongooseInstance.conn = conn;

  return conn;
};

type HandlerFunction<C = unknown> = (req: Request, context: C) => Promise<Response>;

export const dbWrapper = async <C>(
    handler: HandlerFunction<C>,
    req: Request,
    context: C
): Promise<Response> => {
  try {
    await connectDB();
    return await handler(req, context);
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return new Response(
        JSON.stringify({ message: '操作失败', error: errorMessage }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};