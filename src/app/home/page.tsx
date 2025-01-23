"use client";

import React from "react";
import FortuneForm from "./form";
import FortuneIntroduction from "./introduction"

export default function Fortune() {
    return (
        <div className="p-8">
            <div className="flex flex-nowrap gap-4">
                {/* 左边描述块 */}
                <div className="flex-1">
                    <FortuneIntroduction/>
                </div>

                {/* 右边表单块 */}
                <div className="flex-1 bg-orange-200 rounded-md shadow-lg">
                    <FortuneForm/>
                </div>
            </div>
        </div>
    );
}
