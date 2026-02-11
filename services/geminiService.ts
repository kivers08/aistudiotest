import { GoogleGenAI } from "@google/genai";

const systemInstruction = `You are the Data Ingestion Gatekeeper. You transform messy financial documents into a Transaction-First Markdown Schema.
CORE TASK:
Analyze the provided file. For every transaction found, you MUST 'stitch' the date, description, and amount together into a unified block.

OUTPUT FORMAT:
Use Markdown-KV blocks for each transaction exactly like this:

Date:
Entity:
Amount: [$XX.XX]
Type:
Document_Type:

EXECUTION RULES:
INFERENCE: The Document_Type field MUST be inferred from the visual characteristics and headers of the document (e.g., 'Bank Statement', 'Invoice', 'Receipt', 'Credit Card Statement').
ASSOCIATION: Do not provide separate lists. If an amount is found, find its physical neighbor (date/entity) on the page image.
MISSING DATA: If a field cannot be found for an amount, label it <MISSING_DATA>.
FIDELITY: Maintain 100% numerical accuracy. Do not round.
HANDOFF: Prepare output for the Google A2A Protocol.`;

export const analyzeDocument = async (file: File, base64Data: string): Promise<string> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return "Error: API key is not available. Please ensure it is configured in your environment.";
    }
    const ai = new GoogleGenAI({ apiKey });

    try {
        const imagePart = {
            inlineData: {
                data: base64Data,
                mimeType: file.type,
            },
        };

        const textPart = {
            text: "Analyze the financial document provided and extract all transactions based on your instructions. Ensure the Document_Type is correctly identified for each transaction."
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: { parts: [textPart, imagePart] },
            config: {
                systemInstruction: systemInstruction,
            }
        });

        const responseText = response.text;
        if (!responseText) {
            throw new Error("API returned an empty response. The document might be unreadable or contain no transactions.");
        }
        
        return responseText;
    } catch (error) {
        console.error("Full error response from Gemini API:", error);

        let errorMessage = "An unknown error occurred during analysis.";
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                errorMessage = "The provided API key is not valid. Please check your configuration.";
            } else if (error.message.includes('[400]')) {
                 errorMessage = "The request was malformed. This could be due to an issue with the uploaded file, such as corruption or an unsupported format. Please try a different file.";
            } else if (error.message.includes('[403]')) {
                 errorMessage = "Permission denied. Please ensure your API key has the correct permissions for the Gemini API.";
            } else if (error.message.toLowerCase().includes('fetch failed')) {
                errorMessage = "Network error. Please check your internet connection and try again.";
            } else if (error.message.includes('SAFETY')) {
                errorMessage = "The request was blocked due to safety settings. The content of the document may have been flagged.";
            }
             else {
                errorMessage = error.message;
            }
        }
        
        return `Error: ${errorMessage}`;
    }
};
