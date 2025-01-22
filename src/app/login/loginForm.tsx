// ./src/app/login/loginForm.tsx
"use client";

import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

export default function LoginForm() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_IS_TEST) {
            setLoginEmail("1234@5678");
            setLoginPassword("1234@5678");
        }
    }, []);

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                body: JSON.stringify({email: loginEmail, password: loginPassword}),
                headers: {"Content-Type": "application/json"},
            });

            if (!res.ok) {
                const error = await res.json();
                toast.error(error.message || "An error occurred.");
                return;
            }

            const data = await res.json();
            toast.success(data.message);
        } catch (error) {
            console.error("API error:", error);
            toast.error("Network error. Please try again later.");
        }
    }

    return (
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
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
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
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="button-orange w-full py-2 mt-4" type="submit">
                    登入
                </button>
            </form>
        </div>
    );
}