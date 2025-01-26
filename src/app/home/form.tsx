// ./src/components/form.tsx
"use client";

import React, {useState} from "react";
import {Button} from "@headlessui/react";
import {
    ArrowPathIcon
} from '@heroicons/react/16/solid'
import Modal from "@/components/popup/modal";

export default function FortuneForm() {
    const [question, setQuestion] = useState("");
    const [coinResult, setCoinResult] = useState(Array(6).fill("選擇結果"));
    const [currentStep, setCurrentStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const maxStep = 7;

    const handleSelectChange = (value: string) => {
        const updatedCoinResult = [...coinResult];
        updatedCoinResult[currentStep - 1] = value;
        setCoinResult(updatedCoinResult);
        handleNextStep()
    };

    const handleLastStep = () => {
        if (currentStep > 0 && currentStep <= maxStep) {
            coinResult[currentStep - 1] = "選擇結果"
            setCurrentStep(currentStep - 1);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleNextStep = () => {
        if (currentStep <= 6) {
            if (currentStep == 0 && question == "") {
                alert("請填寫問題")
                return
            }
            setCurrentStep(currentStep + 1);
        } else {
            openModal()
            // alert(`問題: ${question}\n選擇: ${coinResult.join(", ")}`);
        }
    };

    const cancelFortune = () => {
        setQuestion("");
        setCoinResult(Array(6).fill("選擇結果"));
        setCurrentStep(0);
    };

    const submitResult = () => {
        closeModal()
        // TODO: send request to the backend
        alert("成功")
        cancelFortune()
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
                卜卦表單
                <ArrowPathIcon className="size-8 text-orange-400" onClick={cancelFortune}/>
            </h2>
            {
                <div>
                    <input
                        id="question"
                        className="w-3/4 py-2 px-4 border rounded shadow-sm"
                        name="question"
                        type="text"
                        placeholder="輸入問題"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>
            }
            {currentStep >= 0 && (
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
                    
                    {currentStep > 1 && currentStep <= maxStep && (
                        <button
                            onClick={handleLastStep}
                            className="w-full mt-6 py-2 px-4 button-orange-deep"
                        >上一步
                        </button>
                    )}

                    {(currentStep == 0 || currentStep == maxStep) && (
                        <button
                            onClick={handleNextStep}
                            className="w-full mt-6 py-2 px-4 button-orange-deep"
                        >
                            {currentStep == 0 ? "下一步" : "提交表單"}
                        </button>
                    )}
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-xl font-semibold mb-4">確定送出卜卦結果?</h2>
                <ul className="mb-4">
                    <li>問題: {question} </li>
                    <li>結果1: {coinResult[0]}</li>
                    <li>結果2: {coinResult[1]}</li>
                    <li>結果3: {coinResult[2]}</li>
                    <li>結果4: {coinResult[3]}</li>
                    <li>結果5: {coinResult[4]}</li>
                    <li>結果6: {coinResult[5]}</li>
                </ul>
                <button 
                    onClick={submitResult}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                > 送出
                </button>

                <button 
                    onClick={closeModal}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                > 取消
                </button>
            </Modal>
        </div>
    )
}