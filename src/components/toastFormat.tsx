// ./src/components/toastFormat.tsx
import React from "react";
import {Toaster} from "react-hot-toast";

export default function ToasterFormat() {

    return (
        <Toaster
            position="top-right"
            reverseOrder={true}
            gutter={8}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                removeDelay: 1000,
                style: {
                    fontSize: '1.5rem',
                },
            }}
        />
    );
}