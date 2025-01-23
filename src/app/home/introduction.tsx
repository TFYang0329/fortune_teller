"use client";

import React, {Fragment} from "react";

export default function FortuneIntroduction() {
    return (
        <Fragment>
            <div className="bg-orange-200 rounded-md shadow-lg p-6 mb-4">
                <h2 className="text-2xl font-semibold mb-4">卜卦注意事項</h2>
                <ol className="list-decimal pl-5 space-y-2">
                    <li>環境盡量安靜，避免受到外在環境干擾</li>
                    <li>心誠則靈，勿以試探的心來卜卦</li>
                    <li>卜卦時要專心</li>
                    <li className="text-red-700 font-semibold">卜卦時間勿超過晚上11點</li>
                </ol>
            </div>
            <div className="bg-orange-200 rounded-md shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">卜卦步驟說明</h2>
                <ol className="list-decimal pl-5 space-y-4">
                    <li>準備三個相同的硬幣</li>
                    <li>
                        在下面的問題格中填入要問的問題，需以正面的方式提問
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                            <li>不要出現 &#34;能不能&#34; 這一類的敘述</li>
                            <li className="text-red-700 font-semibold">不可以的問法: 3個月內會不會升官?</li>
                            <li className="text-green-700 font-semibold">可以的問法: 3個月內會升官嗎?</li>
                        </ul>
                    </li>
                    <li>靜心且專心的念卜卦文</li>
                    <div className="bg-orange-100 p-2 italic rounded-md shadow-md">
                        <strong>
                            <div>天何言哉，叩之即應，神之靈矣，感而遂(歲)通，今我OOO 叩問 某事，</div>
                            <div>不知休咎(就)，罔(網)釋厥疑，唯神唯靈，若可若否，望垂昭報 某年某月某日</div>
                        </strong>
                    </div>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li>OOO: 姓名</li>
                        <li>某事: 步驟2所寫的問題</li>
                        <li>日期: 今天的日期，例如: 113年2月24日</li>
                    </ul>
                    <li>把錢幣放到左手手掌，右手掌弓起來蓋上左手掌</li>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li>讓錢幣在手掌之間有移動的空間</li>
                    </ul>
                    <li>心裡想著要問的問題，然後手上下搖動後把錢幣往桌子上丟</li>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li>總共要丟6次</li>
                        <li>紀錄每次硬幣幾正幾反並寫在下面的表單中</li>
                        <li>人頭為正，數字為反</li>
                    </ul>
                </ol>
            </div>
        </Fragment>
    );
}
