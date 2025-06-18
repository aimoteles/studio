'use server';

/**
 * @fileOverview Implements the Field-Bot Discovery flow for gathering information from motel staff.
 *
 * This file exports:
 * - `fieldBotDiscovery`: A function to initiate the conversational discovery process.
 * - `FieldBotDiscoveryInput`: The input type for the `fieldBotDiscovery` function.
 * - `FieldBotDiscoveryOutput`: The output type for the `fieldBotDiscovery` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FieldBotDiscoveryInputSchema = z.object({
  staffRole: z.string().describe('The role of the staff member being interviewed.'),
  motelName: z.string().describe('The name of the motel.'),
  question: z.string().describe('The question posed to the staff member.'),
  previousResponses: z
    .array(z.object({question: z.string(), answer: z.string()}))
    .optional()
    .describe('Previous questions and answers in the conversation.'),
});
export type FieldBotDiscoveryInput = z.infer<typeof FieldBotDiscoveryInputSchema>;

const FieldBotDiscoveryOutputSchema = z.object({
  answer: z.string().describe('The Field-Bot response to the staff member.'),
  nextQuestion: z.string().optional().describe('The next question to ask, if any.'),
  isFinished: z.boolean().describe('Indicates whether the discovery process is finished.'),
});
export type FieldBotDiscoveryOutput = z.infer<typeof FieldBotDiscoveryOutputSchema>;

export async function fieldBotDiscovery(input: FieldBotDiscoveryInput): Promise<FieldBotDiscoveryOutput> {
  return fieldBotDiscoveryFlow(input);
}

const fieldBotDiscoveryPrompt = ai.definePrompt({
  name: 'fieldBotDiscoveryPrompt',
  input: {schema: FieldBotDiscoveryInputSchema},
  output: {schema: FieldBotDiscoveryOutputSchema},
  prompt: `You are Field-Bot, an AI assistant designed to interview motel staff and identify areas for automation and improvement. You are interviewing a staff member from {{motelName}}.

The staff member's role is: {{staffRole}}

Previous conversation:
{{#each previousResponses}}
  Question: {{this.question}}
  Answer: {{this.answer}}
{{/each}}

User question: {{question}}

Answer the user's question. If appropriate ask a follow up question to identify pain points and areas for automation related to their role.

If you have enough information, set isFinished to true. Otherwise, set it to false. When the discovery process is finished, do not ask a follow up question.

Follow the FieldBotDiscoveryOutputSchema to generate your answer.`,
});

const fieldBotDiscoveryFlow = ai.defineFlow(
  {
    name: 'fieldBotDiscoveryFlow',
    inputSchema: FieldBotDiscoveryInputSchema,
    outputSchema: FieldBotDiscoveryOutputSchema,
  },
  async input => {
    const {output} = await fieldBotDiscoveryPrompt(input);
    return output!;
  }
);
