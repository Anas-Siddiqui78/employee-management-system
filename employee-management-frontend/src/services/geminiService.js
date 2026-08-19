import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const askGemini = async (question) => {
  try {
  const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: question,
});

    console.log(response);

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error talking to Gemini";
  }
};