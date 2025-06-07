
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
    .describe('The tailored resume, optimized for the job description. This should be in PLAIN TEXT format, ATS-friendly, and ready to copy-paste.'),
  review: z.object({
    strengths: z.string().describe('Strengths of the resume in relation to the job description.'),
    weaknesses: z.string().describe('Weaknesses of the resume in relation to the job description.'),
    atsScore: z.number().describe('Estimated ATS score percentage (0-100) of the resume against the job description.'),
    readability: z.string().describe('Readability assessment of the resume (e.g., "Good", "Fair", "Needs Improvement with reasons").'),
    keywordMatchRate: z
      .number()
      .describe('Estimated keyword match rate percentage (0-100) of the resume with the job description.'),
    suggestions: z
      .string()
      .describe('Specific, actionable suggestions to further improve the resume for this particular job description.'),
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
  prompt: `You are an expert resume writer and career consultant specializing in tailoring resumes to specific job descriptions for optimal impact and ATS compatibility.

  **Objective:** Analyze the provided resume and job description. Generate a new, tailored version of the resume that is heavily optimized for the given job description. Also, provide a comprehensive review. The tailored resume MUST be in PLAIN TEXT format.

  **Key Tailoring Instructions for the Resume:**
  1.  **Keyword Integration:** Scrutinize the job description for key skills, technologies, responsibilities, and qualifications (job role, profile, specific requirements). Strategically and naturally weave these exact keywords and phrases from the job description into the resume content, especially in the summary (if applicable), skills, experience, and project sections.
  2.  **Highlight Relevance:** Rephrase and reorder bullet points and descriptions to directly address the requirements mentioned in the job description. Emphasize accomplishments and experiences that are most relevant.
  3.  **Address Gaps (Implicitly):** If the resume lacks certain skills or experiences mentioned prominently in the job description, the tailored resume should reflect this focus, perhaps by slightly re-prioritizing existing content or by making it clear where transferable skills apply. Do not invent experiences.
  4.  **Tone and Language:** Mirror the tone and language of the job description where appropriate (e.g., if it's for a fast-paced startup vs. a large corporation).
  5.  **ATS-Friendly Plain Text:** The output tailored resume MUST be in clean, well-structured PLAIN TEXT, ready for copy-pasting. Use standard headings (e.g., SUMMARY, EXPERIENCE, SKILLS) and bullet points.

  **Review Section Instructions:**
  Provide a concise review covering:
  - Strengths: What parts of the resume align well with the job description?
  - Weaknesses: What are the key areas where the resume falls short for this specific role?
  - ATS Score: An estimated percentage (0-100) reflecting how well the resume might perform in an ATS for this job.
  - Readability: A brief assessment of its clarity and ease of reading.
  - Keyword Match Rate: An estimated percentage (0-100) of how well keywords from the job description are present in the resume.
  - Suggestions: Actionable advice to further improve the resume specifically for this job description.

  **Input Data:**

  **Resume to Tailor:**
  {{{resumeText}}}

  **Job Description to Target:**
  {{{jobDescription}}}
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

