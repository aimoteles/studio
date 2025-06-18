// src/ai/flows/generate-alerts.ts
'use server';
/**
 * @fileOverview A flow that generates security alerts based on anomaly detection.
 *
 * - generateAlerts - A function that generates security alerts based on motel security data.
 * - GenerateAlertsInput - The input type for the generateAlerts function.
 * - GenerateAlertsOutput - The return type for the generateAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAlertsInputSchema = z.object({
  securityData: z
    .string()
    .describe('Motel security data, including logs and sensor readings.'),
});
export type GenerateAlertsInput = z.infer<typeof GenerateAlertsInputSchema>;

const GenerateAlertsOutputSchema = z.object({
  alerts: z
    .array(z.string())
    .describe('A list of security alerts generated from the security data.'),
});
export type GenerateAlertsOutput = z.infer<typeof GenerateAlertsOutputSchema>;

export async function generateAlerts(input: GenerateAlertsInput): Promise<GenerateAlertsOutput> {
  return generateAlertsFlow(input);
}

const generateAlertsPrompt = ai.definePrompt({
  name: 'generateAlertsPrompt',
  input: {schema: GenerateAlertsInputSchema},
  output: {schema: GenerateAlertsOutputSchema},
  prompt: `You are an AI security expert analyzing motel security data to generate alerts.

  Analyze the following security data and generate a list of alerts for potential threats or anomalies.

  Security Data: {{{securityData}}}
  `,
});

const generateAlertsFlow = ai.defineFlow(
  {
    name: 'generateAlertsFlow',
    inputSchema: GenerateAlertsInputSchema,
    outputSchema: GenerateAlertsOutputSchema,
  },
  async input => {
    const {output} = await generateAlertsPrompt(input);
    return output!;
  }
);
