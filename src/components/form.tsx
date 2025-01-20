// ./src/components/form.tsx
import React, { useState } from "react";

export default function Form() {
    const [formData, setFormData] = useState({
        question: "",
        choices: Array(6).fill("選擇結果"),
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, question: event.target.value });
    };

    const handleSelectChange = (index: number, value: string) => {
        const newChoices = [...formData.choices];
        newChoices[index] = value;
        setFormData({ ...formData, choices: newChoices });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        alert(`问题: ${formData.question}\n选择: ${formData.choices.join(", ")}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                問題:
                <input
                    type="text"
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                />
            </label>
            {formData.choices.map((choice, index) => (
                <div key={index}>
                    <label>硬幣結果 {index + 1}:</label>
                    <select
                        value={choice}
                        onChange={(e) => handleSelectChange(index, e.target.value)}
                        required
                    >
                        <option value="選擇結果">選擇結果</option>
                        <option value="三個正面">三個正面</option>
                        <option value="兩個正面一個反面">兩個正面一個反面</option>
                        <option value="一個正面兩個反面">一個正面兩個反面</option>
                        <option value="三個反面">三個反面</option>
                    </select>
                </div>
            ))}
            <button type="submit">提交</button>
        </form>
    );
}