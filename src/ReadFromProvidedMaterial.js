import React, {useState} from 'react';
import axios from "axios";
import * as pdfjs from 'pdfjs-dist';
import './App.css';
import {apiKey} from "./constant";

export const ReadFromProvidedMaterial = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [response, setResponse] = useState('');
    const [inputState, setInputState] = useState('');
    const [pdfText, setPdfText] = useState('');
    const [file, setFile] = useState(null);

    const handleChatRequest = async () => {
        try {
            const prompt = 'I provided text about candidate, can you find this specific info about him?';
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: pdfText.concat(inputState),
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



    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Check if a file is selected
        if (selectedFile) {
            parsePdf(selectedFile);
        }
    };

    const parsePdf = (pdfFile) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const arrayBuffer = event.target.result;

            // Load the PDF using pdf.js
            const pdf = await pdfjs.getDocument(arrayBuffer).promise;

            // Extract text from each page and concatenate it into a single string
            let fullText = '';
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item) => item.str).join(' ');
                fullText += pageText + ' ';
            }

            setPdfText(fullText);
        };

        // Read the PDF file as an ArrayBuffer
        reader.readAsArrayBuffer(pdfFile);
    };

    return (
        <>
            <div>
                <h1>Chat with GPT-3-Turbo, Iteration №4 With Provided PDF</h1>
                <input type="file" accept=".pdf" onChange={handleFileChange}/>
                <p>Parsed PDF Text:</p>
                <p>{pdfText}</p>
                <input placeholder="write your prompt" type="text" value={inputState}
                       onChange={(event) => setInputState(event.target.value)}/>
                <button onClick={handleChatRequest}>Ask ChatGPT</button>
                <p>{response}</p>
            </div>
        </>

    );
};

