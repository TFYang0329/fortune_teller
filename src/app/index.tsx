// ./src/app/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("authToken"); // 从 Cookie 获取登录 Token
        if (!token) {
            // 如果没有 Token，跳转到登录页
            router.replace("/login");
        } else {
            // 如果有 Token，跳转到主页
            router.replace("/home");
        }
    }, [router]);

    return null; // 页面不需要渲染内容，只处理重定向
}