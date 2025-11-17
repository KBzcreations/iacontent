
import { GoogleGenAI } from "@google/genai";

// Fix: Refactored to align with Gemini API guidelines.
// The API key is sourced directly from the environment variable `process.env.API_KEY`
// and is assumed to be pre-configured and valid.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while communicating with the AI. Please check your API key and try again.";
  }
};
