// ./src/app/login/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
    const [formType, setFormType] = useState<"login" | "signup" | null>(null);

    useEffect(() => {
        setFormType("login");
    }, []);

    const handleToggle = (type: "login" | "signup") => {
        setFormType(type);
    };

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("login-email") as string;
        const password = formData.get("login-password") as string;

        const res = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message);
            console.log("Token:", data.token);
        } else {
            alert(data.message);
        }
        console.log(data)
    }

    async function handleRegister(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get("register-username") as string;
        const email = formData.get("register-email") as string;
        const password = formData.get("register-password") as string;
        const confirmPassword = formData.get("register-confirm-password") as string;

        if (password !== confirmPassword) {
            toast.error("Please check your password again.");
            return;
        }
        const res = await fetch("/api/users/register", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (res.ok) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    }

    return (
        <div className="max-w-5xl mx-auto text-center">
            <Toaster />
            <div className="mb-4">
                <h1 className="text-4xl font-bold mb-6 text-amber-900">玄門易經卜卦</h1>
                <p className="text-xl leading-8 text-gray-800">
                    歡迎來到玄門易經卜卦網站<br />
                    這個網站是由一群玄門的弟子所成立<br />
                    希望能讓站在十字路口的你獲得一點方向<br />
                    <br />
                    我們都還沒出師<br />
                    因此都不會跟你收取任何的費用<br />
                </p>
            </div>
            <div>
                <div className="flex justify-center mb-8 gap-4">
                    <button
                        className={`px-6 py-2 rounded ${formType === "login" ? "bg-blue-700 text-white" : "bg-gray-300 text-black"}`}
                        onClick={() => handleToggle("login")}
                    >
                        登入
                    </button>
                    <button
                        className={`px-6 py-2 rounded ${formType === "signup" ? "bg-blue-700 text-white" : "bg-gray-300 text-black"}`}
                        onClick={() => handleToggle("signup")}
                    >
                        註冊
                    </button>
                </div>
                <div className="mt-5 flex justify-center">
                    {formType === "login" && (
                        <div className="bg-gray-50 p-6 rounded-md shadow-md animate-fadeIn w-full max-w-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">登入</h2>
                            <form onSubmit={handleLogin}>
                                <div className="flex items-center mb-4">
                                    <label htmlFor="login-email" className="w-1/4 text-right mr-4">信箱:</label>
                                    <input
                                        id="login-email"
                                        className="w-3/4 py-2 px-4 border rounded shadow-sm"
                                        name="login-email"
                                        type="email"
                                        placeholder="輸入信箱"
                                        defaultValue="ch@0328"
                                        required
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <label htmlFor="login-password" className="w-1/4 text-right mr-4">密碼:</label>
                                    <input
                                        id="login-password"
                                        className="w-3/4 py-2 px-4 border rounded shadow-sm"
                                        name="login-password"
                                        type="password"
                                        placeholder="輸入密碼"
                                        defaultValue="ch@0328"
                                        required
                                    />
                                </div>
                                <button className="w-full py-2 mt-4 bg-blue-700 text-white rounded hover:bg-blue-800" type="submit">
                                    登入
                                </button>
                            </form>
                        </div>
                    )}
                    {formType === "signup" && (
                        <div className="bg-gray-50 p-6 rounded-md shadow-md animate-fadeIn w-full max-w-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">註冊</h2>
                            <form onSubmit={handleRegister}>
                                <div className="flex items-center mb-4">
                                    <label htmlFor="register-username" className="w-1/4 text-right mr-4">用戶名稱:</label>
                                    <input
                                        id="register-username"
                                        className="w-3/4 py-2 px-4 border rounded shadow-sm"
                                        name="register-username"
                                        placeholder="用戶名稱"
                                        defaultValue="ch@0328"
                                        required
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <label htmlFor="register-email" className="w-1/4 text-right mr-4">電子郵件:</label>
                                    <input
                                        id="register-email"
                                        className="w-3/4 py-2 px-4 border rounded shadow-sm"
                                        name="register-email"
                                        type="email"
                                        placeholder="電子郵件"
                                        defaultValue="ch@0328"
                                        required
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <label htmlFor="register-password" className="w-1/4 text-right mr-4">密碼:</label>
                                    <input
                                        id="register-password"
                                        className="w-3/4 py-2 px-4 border rounded shadow-sm"
                                        name="register-password"
                                        type="password"
                                        placeholder="輸入密碼"
                                        defaultValue="ch@0328"
                                        required
                                    />
                                </div>
                                <div className="flex items-center mb-4">
                                    <label htmlFor="register-confirm-password" className="w-1/4 text-right mr-4">確認密碼:</label>
                                    <input
                                        id="register-confirm-password"
                                        className="w-3/4 py-2 px-4 border rounded shadow-sm"
                                        name="register-confirm-password"
                                        type="password"
                                        placeholder="確認密碼"
                                        defaultValue="ch@0328"
                                        required
                                    />
                                </div>
                                <button className="w-full py-2 bg-blue-700 text-white rounded hover:bg-blue-800" type="submit">
                                    註冊
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}