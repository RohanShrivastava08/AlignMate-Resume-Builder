
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
  prompt: `You are an expert resume writer. Please reformat and optimize the following resume text.
The output MUST be a clean, well-structured PLAIN TEXT resume, ATS-friendly, and suitable for copy-pasting directly into job applications or a text editor.
Ensure consistent headings for sections (e.g., "SUMMARY", "EXPERIENCE", "EDUCATION", "SKILLS", "PROJECTS").
Use bullet points (e.g., starting lines with '-' or '*') for achievements, responsibilities, and project details.
Maintain professional formatting with clear separation between sections and entries.
Focus on using strong action verbs, quantified results, and industry-relevant keywords.
If the input resume is messy or poorly structured, create a new, clean layout based on its content. Do not replicate poor formatting.

Resume Text to Optimize and Reformat:
{{{resumeText}}}`,
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
