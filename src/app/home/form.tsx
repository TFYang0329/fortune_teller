// ./src/components/form.tsx
"use client";

import React, {useState} from "react";
import {Button} from "@headlessui/react";
import {
    ArrowPathIcon
} from '@heroicons/react/16/solid'
export default function FortuneForm() {
    const [question, setQuestion] = useState("");
    const [coinResult, setCoinResult] = useState(Array(6).fill("選擇結果"));
    const [currentStep, setCurrentStep] = useState(0);

    const handleSelectChange = (value: string) => {
        const updatedCoinResult = [...coinResult];
        updatedCoinResult[currentStep - 1] = value;
        setCoinResult(updatedCoinResult);
    };

    const handleNextStep = () => {
        if (currentStep < 6) {
            setCurrentStep(currentStep + 1);
        } else {
            alert(`問題: ${question}\n選擇: ${coinResult.join(", ")}`);
        }
    };

    const cancelFortune = () => {
        setQuestion("");
        setCoinResult(Array(6).fill("選擇結果"));
        setCurrentStep(0);
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
                卜卦表單
                <ArrowPathIcon className="size-8 text-orange-400" onClick={cancelFortune}/>
            </h2>
            {currentStep > 0 && (
                <div>
                    {coinResult.slice(0, Math.max(0, currentStep)).map((result, index) => (
                        <div key={index} className="flex mb-4 gap-4 items-center">
                            <label className="text-lg">擲幣結果 {index + 1}:</label>
                            <div className="flex flex-1 justify-evenly">
                                {["三個 正面", "兩正 一反", "一正 兩反", "三個 反面"].map((option) => (
                                    <Button
                                        key={option}
                                        onClick={() => handleSelectChange(option)}
                                        className={`py-2 px-4 w-32 rounded-md 
                                        ${index < currentStep - 1
                                            ? result === option
                                                ? "button-gray-deep cursor-not-allowed"
                                                : "button-gray-light cursor-not-allowed"
                                            : result === option
                                                ? "button-orange-deep hover-scale-125"
                                                : "button-orange-light hover-scale-125"
                                        }`}
                                        disabled={index < currentStep - 1}
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleNextStep}
                        className="w-full mt-6 py-2 px-4 button-orange-deep"
                    >
                        {currentStep < 6 ? "下一步" : "提交表單"}
                    </button>
                </div>
            )}
        </div>
    )
}