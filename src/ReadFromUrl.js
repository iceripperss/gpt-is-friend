import React, {useState} from 'react';
import axios from "axios";
import './App.css';
import {apiKey} from "./constant";

export const ReadFromUrl = () => {
    const [url, setURL] = useState("https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0");
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleURLChange = (event) => {
        setURL(event.target.value);
    };

    const generateTextFromURL = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',

                    messages: [
                        {
                            role: 'system',
                            content: "Can you read the following Wiki article and sum it up?",
                        },
                        {
                            role: 'user',
                            content: `Read the information from the following URL: ${url}`,
                        },
                    ],
                    max_tokens: 50,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );

            setGeneratedText(response.data.choices[0].message.content);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Chat with GPT-3-Turbo, Iteration №3 Url (not working)</h1>
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={handleURLChange}
            />
            <button onClick={generateTextFromURL} disabled={isLoading}>
                Generate Text
            </button>
            {isLoading && <p>Loading...</p>}
            {generatedText && <p>Generated Text: {generatedText}</p>}
        </div>
    );
};
