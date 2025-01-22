// ./src/app/login/page.tsx
"use client";

import React from "react";
import { Tab, TabGroup, TabPanel, TabPanels } from '@headlessui/react'
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function LoginPage() {
    return (
        <div className="max-w-5xl mx-auto text-center">
            {/* Header Section */}
            <div className="mb-4">
                <h1 className="text-4xl font-bold mb-6 text-amber-900">玄門易經卜卦</h1>
                <article className="text-xl leading-8 text-gray-800">
                    <p>歡迎來到玄門易經卜卦網站</p>
                    <p>這個網站是由一群玄門的弟子所成立</p>
                    <p>希望能讓站在十字路口的你獲得一點方向</p>
                    <p>我們都還沒出師</p>
                    <p>因此都不會跟你收取任何的費用</p>
                </article>
            </div>

            {/* Tab Section */}
            <TabGroup defaultIndex={0}>
                {/* Tab Buttons */}
                <div className="flex justify-center mb-8 gap-4">
                    <Tab as="button" className={({ selected }) =>
                        `px-6 py-2 rounded ${
                            selected
                                ? "bg-orange-600 text-white font-bold hover-scale-125"
                                : "bg-orange-300 text-black hover:bg-orange-400 hover-scale-125"
                        }`
                    }>
                        登入
                    </Tab>
                    <Tab as="button" className={({ selected }) =>
                        `px-6 py-2 rounded ${
                            selected
                                ? "bg-orange-600 text-white font-bold hover-scale-125"
                                : "bg-orange-300 text-black hover:bg-orange-400 hover-scale-125"
                        }`
                    }>
                        註冊
                    </Tab>
                </div>

                {/* Tab Panels */}
                <TabPanels>
                    <TabPanel>
                        <div className="mt-5 flex justify-center">
                            <LoginForm />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="mt-5 flex justify-center">
                            <RegisterForm />
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    );
}
