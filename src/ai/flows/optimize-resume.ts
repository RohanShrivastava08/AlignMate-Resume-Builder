// src/ai/flows/optimize-resume.ts
'use server';
/**
 * @fileOverview A resume optimization AI agent that takes in resume text and outputs an optimized resume.
 *
 * - optimizeResumeFromText - A function that handles the resume optimization process.
 * - OptimizeResumeInput - The input type for the optimizeResumeFromText function.
 * - OptimizeResumeOutput - The return type for the optimizeResumeFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeResumeInputSchema = z.object({
  resumeText: z.string().describe('The text of the resume to optimize.'),
});
export type OptimizeResumeInput = z.infer<typeof OptimizeResumeInputSchema>;

const OptimizeResumeOutputSchema = z.object({
  optimizedResume: z.string().describe('The optimized resume text.'),
});
export type OptimizeResumeOutput = z.infer<typeof OptimizeResumeOutputSchema>;

export async function optimizeResumeFromText(input: OptimizeResumeInput): Promise<OptimizeResumeOutput> {
  return optimizeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeResumePrompt',
  input: {schema: OptimizeResumeInputSchema},
  output: {schema: OptimizeResumeOutputSchema},
  prompt: `You are an expert resume writer. Please optimize the following resume text to be ATS-friendly, well-formatted, and use strong action verbs, quantified results, and industry-relevant keywords.\n\nResume Text: {{{resumeText}}}`,
});

const optimizeResumeFlow = ai.defineFlow(
  {
    name: 'optimizeResumeFlow',
    inputSchema: OptimizeResumeInputSchema,
    outputSchema: OptimizeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
