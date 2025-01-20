// ./src/app/layout.tsx
import type {Metadata} from "next";
import React from "react";
import {Noto_Sans_TC} from "next/font/google";
import "@/styles/globals.css";
const notoSansTC = Noto_Sans_TC({
    variable: "--font-noto-sans-tc", // 繁體中文
    subsets: ["latin"], // 确保字体子集完整
});

// 使用 Next.js 提供的 Metadata 类型
export const metadata: Metadata = {
    title: "玄門易經卜卦",
    description: "玄門易經卜卦描述",
};

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-TW" className={`${notoSansTC.variable}`}>
        <body>
        {children}
        </body>
        </html>
    );
}
