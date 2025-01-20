// ./src/app/database/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function TestDBPage() {
    const [data, setData] = useState<{
        message: string;
        collections?: { name: string; fields: string[] }[];
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/database');
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                    return result;
                }
                setError(`Fetch failed: ${response.status} ${response.statusText}`);
                return (`Fetch failed: ${response.status} ${response.statusText}`);
            } catch (err) {
                setError((err as Error).message);
                return (err as Error).message;
            }
        };
        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div className="max-w-2xl text-3xl  mx-auto text-center">
            <h1>資料庫連接測試</h1>
            {error && <p style={{color: 'red'}}>錯誤: {error}</p>}
            {data ? (
                <div>
                    <p>{data.message}</p>
                    {data.collections && data.collections.length > 0 ? (
                        <ul>
                            {data.collections.map((collection, index) => (
                                <li key={index}>
                                    {collection.name} :
                                    {collection.fields.length > 0 ? (
                                        <span>
                                            {collection.fields.map((field, fieldIndex) => (
                                                <span key={fieldIndex}>&#34;{field}&#34;, </span>
                                            ))}
                                        </span>
                                    ) : (
                                        <span>NULL</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>目前沒有集合。</p>
                    )}
                </div>
            ) : (
                <p>正在加載數據...</p>
            )}
        </div>
    );
}
