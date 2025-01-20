// ./src/types/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        MONGODB_URI: string;
        // 如果有其他环境变量，请在这里添加
        NODE_ENV: "development" | "production" | "test";
    }
}
