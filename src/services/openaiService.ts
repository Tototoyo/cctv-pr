import type { GeneratorOptions } from '../types';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('Missing OpenAI API key');
}

export async function generateCctvPrompt(options: GeneratorOptions): Promise<string> {
  try {
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at creating detailed CCTV surveillance camera prompts for AI video generation. Generate realistic, detailed prompts that capture authentic surveillance footage characteristics.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content;

    if (!text) {
      throw new Error('No response generated');
    }

    return text;
  } catch (error) {
    console.error('Error generating prompt:', error);
    throw error;
  }
}
