// ./src/app/login/registerForm.tsx
"use client";

import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

export default function RegisterForm() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_IS_TEST) {
            setRegisterUsername("1234@5678");
            setRegisterEmail("1234@5678");
            setRegisterPassword("1234@5678");
            setRegisterConfirmPassword("1234@5678");
        }
    }, []);

    async function handleRegister(event: React.FormEvent) {
        event.preventDefault();

        if (registerPassword !== registerConfirmPassword) {
            toast.error("Please check your password again.");
            return;
        }
        try {
            const res = await fetch("/api/users/register", {
                method: "POST",
                body: JSON.stringify({username: registerUsername, email: registerEmail, password: registerPassword}),
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">註冊</h2>
            <form onSubmit={handleRegister}>
                <div className="flex items-center mb-4">
                    <label htmlFor="register-username" className="w-1/4 text-right mr-4">用戶名稱:</label>
                    <input
                        id="register-username"
                        className="w-3/4 py-2 px-4 border rounded shadow-sm"
                        name="register-username"
                        placeholder="用戶名稱"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
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
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
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
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
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
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="button-orange w-full py-2 mt-4" type="submit">
                    註冊
                </button>
            </form>
        </div>
);
}