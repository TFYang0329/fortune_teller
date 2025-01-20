// ./src/app/api/database/handler.ts
import mongoose from "mongoose";

export async function getCollectionsHandler() {
    const db = mongoose.connection.db as mongoose.mongo.Db;

    try {
        const collections = await db.listCollections().toArray();
        const collectionsWithFields = await Promise.all(
            collections.map(async (collection) => {
                try {
                    const docs = await db.collection(collection.name).find({}).limit(1).toArray();
                    const fields = docs.length > 0 ? Object.keys(docs[0]) : [];
                    return { name: collection.name, fields };
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : "未知错误";
                    return { name: collection.name, fields: [], error: errorMessage };
                }
            })
        );

        return new Response(
            JSON.stringify({ message: "MongoDB 連接成功！", collections: collectionsWithFields }),
            { headers: { "Content-Type": "application/json" }, status: 200 }
        );
    } catch (error) {
        console.error("获取集合信息时发生错误：", error);

        const errorMessage =
            error instanceof Error ? error.message : "未知错误";

        return new Response(
            JSON.stringify({
                message: "获取集合信息失败",
                error: errorMessage,
            }),
            {headers: {"Content-Type": "application/json"}, status: 500}
        );
    }
}