// ./src/app/layout.tsx
import React from "react";
import {Metadata} from "next";
import "@/styles/globals.css"
import "@/styles/globals-button.css"
import {notoSansTC} from "@/config/webFonts";
import ToasterFormat from "@/components/toastFormat";
import TopBar from "@/components/layout/topBar";
import Sidebar from "@/components/layout/sideBar"; // 导入 Sidebar 组件

export const metadata: Metadata = {
    title: "玄門易經卜卦",
    description: "玄門易經卜卦描述",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="zh-TW" className={`${notoSansTC.variable}`}>
        <body>
        <ToasterFormat/>
        <div className="layout">
            {/* TopBar */}
            <TopBar/>

            {/* Main Container */}
            <div className="layout-page">
                {/* Sidebar */}
                <div className="layout-sidebar">
                    <Sidebar/>
                </div>

                {/* Page Content */}
                <div className="layout-child">
                    {children}
                </div>
            </div>
        </div>
        </body>
        </html>
    );
}
