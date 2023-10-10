import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import {apiKey} from "./constant";

export const ChatComponent = () => {
    const [response, setResponse] = useState('');
    const [inputState, setInputState] = useState('');

    const handleChatRequest = async () => {
        try {
            const prompt = 'Aswer to provided question?';
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: inputState,
                        },
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );
            setResponse(response.data.choices[0].message.content);
            setInputState('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section>
            <h1>Chat with GPT-3-Turbo, Iteration №1</h1>
            <input placeholder="Write your prompt" type="text" value={inputState}
                   onChange={(event) => setInputState(event.target.value)}/>
            <button onClick={handleChatRequest}>Ask ChatGPT</button>
            <p>{response}</p>
        </section>
    );
};
