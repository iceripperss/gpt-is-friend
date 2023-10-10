import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import {apiKey} from "./constant";

export const SpeechRecognition = () => {
    const [recognizedText, setRecognizedText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [response, setResponse] = useState('');

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
                            content: recognizedText,
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
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            setIsRecording(true);
        };

        recognition.onresult = (event) => {
            const interimTranscript = event.results[event.results.length - 1][0].transcript;
            setRecognizedText(interimTranscript);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        setRecognition(recognition);
    }, []);

    const startRecording = () => {
        if (recognition) {
            recognition.start();
        }
    };

    const stopRecording = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    return (
        <div>
            <h1>Chat with GPT-3-Turbo, Iteration №2 Speech</h1>
            <button onClick={startRecording} disabled={isRecording}>
                Start Recording
            </button>
            <button onClick={stopRecording} disabled={!isRecording}>
                Stop Recording
            </button>
            <p>Recognized Text: {recognizedText}</p>
            <button onClick={handleChatRequest}>Ask ChatGPT</button>
            <p>{response}</p>
        </div>
    );
}
