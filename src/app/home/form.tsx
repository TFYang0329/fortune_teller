// ./src/components/form.tsx
"use client";

import React, {useState} from "react";
import {Button} from "@headlessui/react";
import {
    ArrowPathIcon
} from '@heroicons/react/16/solid'
export default function FortuneForm() {
    const [startFortuneTeller, setStartFortuneTeller] = useState(false);
    const [question, setQuestion] = useState("");
    const [coinResult, setCoinResult] = useState(Array(6).fill("選擇結果"));
    const [currentStep, setCurrentStep] = useState(0);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value);
    };

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

    const startFortune = () => {
        setStartFortuneTeller(true);
        setCurrentStep(0);
    };

    const cancelFortune = () => {
        setStartFortuneTeller(false);
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
            {!startFortuneTeller ? (
                <Button
                    className="w-full py-2 px-4 button-orange-deep"
                    onClick={startFortune}
                >
                    開始進行卜卦
                </Button>
            ) : (
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">問題:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={handleInputChange}
                        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="請輸入問題"
                        required
                        disabled={currentStep !== 0}
                    />
                    {currentStep === 0 && (
                        <Button
                            onClick={handleNextStep}
                            className="w-full py-2 px-4 button-orange-deep"
                        >
                            下一步
                        </Button>
                    )
                    }
                </div>
            )}
            {currentStep > 0 && (
                <div>
                    {coinResult.slice(0, Math.max(0, currentStep)).map((result, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-lg mb-2">硬幣結果 {index + 1}:</label>
                            <div className="flex gap-4 justify-center">
                                {["三個正面", "兩個正面一個反面", "一個正面兩個反面", "三個反面"].map((option) => (
                                    <Button
                                        key={option}
                                        onClick={() => handleSelectChange(option)}
                                        className={`py-2 px-4 rounded-md ${result === option
                                            ? "bg-orange-600 text-white font-bold hover-scale-125"
                                            : "bg-orange-300 text-black hover:bg-orange-400 hover-scale-125"
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
                        className="w-full py-2 px-4 button-orange-light"
                    >
                        {currentStep < 6 ? "確認並進入下一步" : "提交表單"}
                    </button>
                </div>
            )}
        </div>
    )
}