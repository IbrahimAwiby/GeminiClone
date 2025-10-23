import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyBU_LerJiCldizg8zM6k5ol8OiQ4VGk3NU";
if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY. Please set it in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    console.log("Gemini Response:", responseText); // Log response to console
    return responseText;
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return "Error fetching response.";
  }
}

export default run;
