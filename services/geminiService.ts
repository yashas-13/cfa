
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { Lesson } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper for decoding audio bytes
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const getGermanSpeech = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Speak clearly in German: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio data returned");

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
    
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.error("Speech generation error:", error);
  }
};

export const chatWithTutor = async (history: { role: 'user' | 'model', text: string }[], message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are "Guru", a professional German language instructor who teaches people from Karnataka. 
      You are fluent in German, English, and Kannada.
      When explaining German grammar or vocabulary, always provide the meaning in both English and Kannada.
      Keep your tone encouraging and friendly. Use Kannada script for Kannada words.
      If the user asks a question in Kannada, answer back explaining the German concept using Kannada and English support.`,
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const analyzePronunciation = async (targetWord: string, audioBase64: string, mimeType: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          { text: `The user is practicing the German word: "${targetWord}". 
          Analyze their pronunciation from the provided audio.
          Provide short, clear feedback in both English and Kannada (using Kannada script).
          Grade it as "Excellent", "Good", or "Keep Trying". 
          If incorrect, explain the phonetic mistake simply.` },
          { inlineData: { data: audioBase64, mimeType: mimeType } }
        ]
      }
    ]
  });
  return response.text;
};

export const getGrammarExplanation = async (topicTitle: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As Guru the German Instructor, provide a detailed explanation of the grammar topic: "${topicTitle}".
    Target audience: English and Kannada speakers from Karnataka.
    Structure your response with:
    1. Introduction (German concept)
    2. Comparison with English (How it differs or relates)
    3. Comparison with Kannada (Very important: explain syntax or concepts using Kannada grammatical terms if applicable, e.g., Vibhakti/Cases).
    4. 3 clear examples with German, English, and Kannada translations.
    Use clear Markdown and Kannada script.`,
  });
  return response.text;
};

export const generateAILesson = async (level: string = 'A1'): Promise<Lesson> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a new, unique German language lesson for ${level} level. 
    Topic should be practical (e.g., At the Market, Visiting a Friend, Hobbies). 
    Translate all content into English and Kannada.
    Include 5 vocabulary items, 3 quiz questions, and a short 4-node dialogue.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          titleKannada: { type: Type.STRING },
          description: { type: Type.STRING },
          descriptionKannada: { type: Type.STRING },
          level: { type: Type.STRING },
          content: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                german: { type: Type.STRING },
                english: { type: Type.STRING },
                kannada: { type: Type.STRING },
                pronunciation: { type: Type.STRING }
              }
            }
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                question: { type: Type.STRING },
                questionKannada: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING },
                explanation: { type: Type.STRING },
                explanationKannada: { type: Type.STRING }
              }
            }
          },
          dialogue: {
            type: Type.OBJECT,
            properties: {
              startNodeId: { type: Type.STRING },
              nodes: {
                type: Type.OBJECT,
                description: "Keys are node IDs like 'start', 'node1', 'end'"
              }
            }
          }
        },
        required: ["title", "titleKannada", "description", "content", "quiz", "dialogue"]
      }
    }
  });

  const lesson = JSON.parse(response.text) as Lesson;
  lesson.id = 'ai-lesson-' + Date.now();
  lesson.isAI = true;
  return lesson;
};
