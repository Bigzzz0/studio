'use server';
/**
 * @fileOverview An AI flow that provides weather and air quality advice.
 *
 * - weatherAdvisor - A function that handles generating weather advice.
 * - WeatherAdvisorInput - The input type for the weatherAdvisor function.
 * - WeatherAdvisorOutput - The return type for the weatherAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { WeatherAndAqiData } from '@/lib/types';

const WeatherAdvisorInputSchema = z.object({
  weather: z.object({
    temp: z.number(),
    description: z.string(),
    wind_speed: z.number(),
    humidity: z.number(),
  }),
  aqi: z.object({
    aqi: z.number(),
  }),
});
export type WeatherAdvisorInput = z.infer<typeof WeatherAdvisorInputSchema>;

const WeatherAdvisorOutputSchema = z.object({
  advice: z.string().describe('A short, friendly, and actionable piece of advice for the user based on the weather and air quality. The advice should be in Thai.'),
});
export type WeatherAdvisorOutput = z.infer<typeof WeatherAdvisorOutputSchema>;

export async function weatherAdvisor(input: WeatherAndAqiData): Promise<WeatherAdvisorOutput> {
  return weatherAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherAdvisorPrompt',
  input: {schema: WeatherAdvisorInputSchema},
  output: {schema: WeatherAdvisorOutputSchema},
  prompt: `You are a helpful weather assistant. Based on the provided weather and air quality data, generate a short, friendly, and actionable piece of advice for the user. The response must be in Thai.

Weather Data:
- Temperature: {{{weather.temp}}}°C
- Description: {{{weather.description}}}
- Wind Speed: {{{weather.wind_speed}}} m/s
- Humidity: {{{weather.humidity}}}%

Air Quality Index (AQI):
- AQI Value: {{{aqi.aqi}}} (1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor)

Generate a concise and easy-to-understand recommendation. For example: "วันนี้อากาศดี เหมาะกับการออกไปทำกิจกรรมกลางแจ้ง" or "มลพิษทางอากาศสูง ควรใส่หน้ากากอนามัยหากต้องออกไปข้างนอก"`,
});

const weatherAdvisorFlow = ai.defineFlow(
  {
    name: 'weatherAdvisorFlow',
    inputSchema: WeatherAdvisorInputSchema,
    outputSchema: WeatherAdvisorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
