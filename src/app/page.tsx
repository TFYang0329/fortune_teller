// ./src/app/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/form";

export default function Fortune() {
    const router = useRouter();

    const handleLogout = async () => {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        if (res.ok) {
            router.push("/login"); // 跳转到登录页面
        } else {
            alert("登出失败");
        }
    };

    return (
        <div>
            <h1 id="fortune_header">易經卜卦</h1>
            <div id="notification">
                <h2>卜卦注意事項</h2>
                <ol>
                    <li>環境盡量安靜，避免受到外在環境干擾</li>
                    <li>心誠則靈，勿以試探的心來卜卦</li>
                    <li>卜卦時要專心</li>
                    <li id="eleven">卜卦時間勿超過晚上11點</li>
                </ol>
            </div>
            <div id="process">
                <h2>卜卦步驟說明</h2>
                <ol>
                    <li>準備三個相同的硬幣</li>
                    <li>在下面的問題格中填入要問的問題，需以正面的方式提問</li>
                    <ul>
                        <li>不要出現&#34;能不能&#34;這一類的敘述</li>
                        <li>可以的問法: 3個月內會升官嗎?</li>
                        <li id="dont_do_that">不可以的問法: 3個月內會不會升官?</li>
                        <li id="can_do_that">可以的問法: 3個月內會升官嗎?</li>
                    </ul>
                    <li>靜心且專心的念卜卦文</li>
                    <p id="doc">
                        <strong>
                            天何言哉，叩之即應，神之靈矣，感而遂(歲)通，今我OOO 叩問 某事，不知休咎(就)，罔(網)釋厥疑，唯神唯靈，若可若否，望垂昭報 某年某月某日
                        </strong>
                    </p>
                    <ul>
                        <li>OOO: 姓名</li>
                        <li>某事: 步驟2所寫的問題</li>
                        <li>日期: 今天的日期，例如: 113年2月24日</li>
                    </ul>
                    <li>把錢幣放到左手手掌，右手掌弓起來蓋上左手掌</li>
                    <ul>
                        <li>讓錢幣在手掌之間有移動的空間</li>
                    </ul>
                    <li>心裡想著要問的問題，然後手上下搖動後把錢幣往桌子上丟</li>
                    <ul>
                        <li>總共要丟6次</li>
                        <li>紀錄每次硬幣幾正幾反並寫在下面的表單中</li>
                        <li>人頭為正，數字為反</li>
                    </ul>
                </ol>
                <Form />
            </div>
            <button onClick={handleLogout}>登出</button>
        </div>
    );
}