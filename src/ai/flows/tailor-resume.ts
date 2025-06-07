// src/ai/flows/tailor-resume.ts
'use server';

/**
 * @fileOverview A flow to tailor a resume to a specific job description.
 *
 * - tailorResume - A function that tailors a resume to a job description.
 * - TailorResumeInput - The input type for the tailorResume function.
 * - TailorResumeOutput - The return type for the tailorResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorResumeInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text of the resume to be tailored.'),
  jobDescription: z
    .string()
    .describe('The job description to tailor the resume to.'),
});
export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

const TailorResumeOutputSchema = z.object({
  tailoredResume: z
    .string()
    .describe('The tailored resume, optimized for the job description.'),
  review: z.object({
    strengths: z.string().describe('Strengths of the resume.'),
    weaknesses: z.string().describe('Weaknesses of the resume.'),
    atsScore: z.number().describe('ATS score percentage of the resume.'),
    readability: z.string().describe('Readability assessment of the resume.'),
    keywordMatchRate: z
      .number()
      .describe('Keyword match rate of the resume with the job description.'),
    suggestions: z
      .string()
      .describe('Suggestions to further improve the resume.'),
  }),
});

export type TailorResumeOutput = z.infer<typeof TailorResumeOutputSchema>;

export async function tailorResume(input: TailorResumeInput): Promise<TailorResumeOutput> {
  return tailorResumeFlow(input);
}

const tailorResumePrompt = ai.definePrompt({
  name: 'tailorResumePrompt',
  input: {schema: TailorResumeInputSchema},
  output: {schema: TailorResumeOutputSchema},
  prompt: `You are an expert resume writer specializing in tailoring resumes to specific job descriptions.

  You will analyze the provided resume and job description, and then you will generate a tailored resume that aligns with the job requirements.
  Highlight missing areas and inject target keywords to optimize the resume for the job description. Also, provide a review of the resume.

  Resume:
  {{resumeText}}

  Job Description:
  {{jobDescription}}
  `,
});

const tailorResumeFlow = ai.defineFlow(
  {
    name: 'tailorResumeFlow',
    inputSchema: TailorResumeInputSchema,
    outputSchema: TailorResumeOutputSchema,
  },
  async input => {
    const {output} = await tailorResumePrompt(input);
    return output!;
  }
);
