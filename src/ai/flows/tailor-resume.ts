
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
    .describe('The job description to tailor the resume to. This includes job role, profile, specific requirements, skills, and technologies mentioned.'),
});
export type TailorResumeInput = z.infer<typeof TailorResumeInputSchema>;

const TailorResumeOutputSchema = z.object({
  tailoredResume: z
    .string()
    .nullable() // Made nullable to handle potential AI omissions gracefully
    .describe('The tailored resume, heavily optimized for the job description. This should be in PLAIN TEXT format, ATS-friendly, and ready to copy-paste. It must incorporate keywords and align content with the job description effectively, while remaining concise and impactful. If unable to generate, this can be null.'),
  review: z.object({
    strengths: z.string().describe('Specific strengths of the resume in relation to the job description. MUST be a list of brief, distinct points, each on a new line, ideally starting with a hyphen or asterisk (e.g., "- Point 1\n- Point 2"). Each point should be a single concise sentence or phrase.'),
    weaknesses: z.string().describe('Specific weaknesses or gaps in the resume when compared against the job description. MUST be a list of brief, distinct points, each on a new line, ideally starting with a hyphen or asterisk (e.g., "- Point 1\n- Point 2"). Each point should be a single concise sentence or phrase. Avoid long paragraphs.'),
    atsScore: z.number().min(0).max(100).describe('Estimated ATS score percentage (0-100) of the resume against the job description, considering keyword match and structure.'),
    readability: z.string().describe('Brief readability assessment of the resume (e.g., "Excellent: Clear and concise", "Good: Generally easy to read", "Fair: Could be more concise", "Needs Improvement: Difficult to parse, lengthy sentences, or jargon").'),
    keywordMatchRate: z
      .number()
      .min(0).max(100)
      .describe('Estimated keyword match rate percentage (0-100) of the resume with the most important keywords from the job description.'),
    suggestions: z
      .string()
      .describe('Specific, actionable suggestions to further improve the resume for this particular job description. MUST be a list of brief, distinct points, each on a new line, ideally starting with a hyphen or asterisk (e.g., "- Point 1\n- Point 2"). Each point should be a single concise sentence or phrase.'),
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

  **Objective:** Analyze the provided resume and job description. You MUST generate BOTH:
  1. A new, **concise and impactful** tailored version of the resume ('tailoredResume') that is heavily optimized for the given job description, focusing on the job role, profile, and specific requirements mentioned.
  2. A comprehensive and actionable review object ('review').

  The tailored resume MUST be in PLAIN TEXT format.

  **Key Tailoring Instructions for the 'tailoredResume':**
  1.  **Deep Keyword Integration (Concise):** Meticulously scrutinize the job description for the **most critical** key skills, technologies, responsibilities, qualifications, desired experience, job role specifics, and company culture cues. Strategically and naturally weave these exact keywords and phrases from the job description into the resume content, especially in the summary/job profile (if applicable), skills, work experience, and project sections. **Prioritize quality and relevance of keywords over quantity.**
  2.  **Highlight Relevance & Impact (Briefly):** Rephrase and reorder bullet points and descriptions to directly address and showcase experience relevant to the requirements mentioned in the job description. Emphasize accomplishments and experiences that are most valuable for THIS specific role. Quantify achievements where possible, keeping descriptions brief.
  3.  **Structure for Job Profile:** If the resume has a summary or objective, rewrite it to align perfectly with the target job role and company if information is available, keeping it succinct.
  4.  **Address Gaps (Implicitly & Explicitly):** If the resume lacks certain skills or experiences mentioned prominently in the job description, the tailored resume should try to bridge these by re-prioritizing or rephrasing existing content to show transferable skills. Do not invent experiences. Maximize the presentation of existing ones **concisely**.
  5.  **Tone and Language:** Mirror the tone and language of the job description where appropriate.
  6.  **ATS-Friendly Plain Text & Brevity:** The output tailored resume MUST be in clean, well-structured PLAIN TEXT, ready for copy-pasting. Use standard headings and bullet points. **The resume should be as brief as possible while covering essential alignment points.** Avoid overly long sentences or sections.

  **'review' Section Instructions (Be specific, actionable, and VERY CONCISE for list-based fields):**
  - strengths: Specific strengths of the resume for the job. **MUST be a list of BRIEF, distinct points, each on a new line (e.g., "- Point 1\n- Point 2"). Each point a single concise sentence/phrase.**
  - weaknesses: Specific weaknesses/gaps for this job. **MUST be a list of BRIEF, distinct points, each on a new line (e.g., "- Point 1\n- Point 2"). Each point a single concise sentence/phrase. AVOID LONG PARAGRAPHS.**
  - atsScore: Estimated ATS score (0-100).
  - readability: Brief assessment (e.g., "Excellent: Clear and concise").
  - keywordMatchRate: Estimated keyword match rate (0-100).
  - suggestions: Actionable suggestions to improve. **MUST be a list of BRIEF, distinct points, each on a new line (e.g., "- Point 1\n- Point 2"). Each point a single concise sentence/phrase.**

  If you cannot generate a meaningful tailored resume, output a null value for 'tailoredResume' but still attempt to provide the review.

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
    if (!output) {
      // Handle case where the model returns no output at all
      return {
        tailoredResume: "",
        review: {
          strengths: "AI could not generate strengths.",
          weaknesses: "AI could not generate weaknesses.",
          atsScore: 0,
          readability: "N/A",
          keywordMatchRate: 0,
          suggestions: "AI could not generate suggestions.",
        }
      };
    }
    // Ensure tailoredResume is a string, even if null was returned by the AI
    const tailoredResumeText = output.tailoredResume ?? "";
    return {...output, tailoredResume: tailoredResumeText};
  }
);
    
