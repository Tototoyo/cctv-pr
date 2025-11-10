import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GeneratorOptions } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateCctvPrompt(options: GeneratorOptions): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate a highly detailed CCTV surveillance camera prompt for AI video generation. Use the following parameters:

Scene Description: ${options.scene}
Location: ${options.location}
Time of Day: ${options.timeOfDay}
Weather Conditions: ${options.weather}
Visual Artifacts to Include: ${options.visualArtifacts.join(', ')}

Create a realistic CCTV-style video prompt that includes:
1. Camera specifications (angle, position, type)
2. Lighting conditions appropriate for the time and weather
3. Scene activity and movement details
4. Visual quality characteristics (resolution, artifacts)
5. Timestamp and camera ID overlay
6. Specific visual effects from the artifacts list

Format the output as a single detailed paragraph optimized for AI video generation tools like Runway, Pika, or Sora.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('No response generated');
    }

    return text;
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw error;
  }
}
