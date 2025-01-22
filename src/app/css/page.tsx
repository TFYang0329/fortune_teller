// ./src/app/css/page.tsx

import React from "react";

const buttonColors = [
    "orange",
    "blue",
    "red",
    "green",
    "purple",
    "yellow",
    "gray",
    "teal",
    "cyan",
    "pink",
];

const buttonSizes = [
    { size: "sm", className: "button-sm", label: "Small" },
    { size: "default", className: "", label: "Default" },
    { size: "lg", className: "button-lg", label: "Large" },
];

export default function ButtonsPage() {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Button Showcase</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Color</th>
                    <th className="border border-gray-300 px-4 py-2">Style</th>
                    {buttonSizes.map((size) => (
                        <th
                            key={size.size}
                            className="border border-gray-300 px-4 py-2"
                        >
                            {size.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {buttonColors.map((color) => (
                    <React.Fragment key={color}>
                        {["outline", "light", "", "deep"].map((style) => (
                            <tr key={style}>
                                <td className="border border-gray-300 px-4 py-2 capitalize">
                                    {color}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {style || "default"}
                                </td>
                                {buttonSizes.map((size) => (
                                    <td
                                        key={size.size}
                                        className="border border-gray-300 px-4 py-2"
                                    >
                                        <button
                                            className={`button-${color}${style ? `-${style}` : ""} ${size.className}`}
                                        >
                                            {`${color} ${style || "default"} ${
                                                size.label
                                            }`}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}
