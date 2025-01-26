// ./src/app/layout.tsx
import React from "react";
import "@/styles/globals.css";
import "@/styles/globals-button.css";
import { notoSansTC } from "@/config/webFonts";
import ToasterFormat from "@/components/toastFormat";
import TopBar from "@/components/layout/topBar";
import Sidebar from "@/components/layout/sideBar";
import { cookies } from 'next/headers';

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    const isLoggedIn = !!token;

    return (
        <html lang="zh-TW" className={`${notoSansTC.variable}`}>
        <body>
        <ToasterFormat/>
        <div className="layout">
            {/* TopBar */}
            {isLoggedIn && <TopBar/>}

            {/* 主容器 */}
            <div className="layout-page">
                {/* 側邊欄 */}
                <div className="layout-sidebar">
                    {isLoggedIn && <Sidebar/>}
                </div>

                {/* 主要內容 */}
                <div className="layout-child">
                    {children}
                </div>
            </div>
        </div>
        </body>
        </html>
    );
}