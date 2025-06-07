
// src/ai/flows/generate-resume.ts
'use server';
/**
 * @fileOverview A flow for generating a resume from structured form data.
 *
 * - generateResume - A function that handles the resume generation process.
 * - GenerateResumeInput - The input type for the generateResume function.
 * - GenerateResumeOutput - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalDetailsSchema = z.object({
  name: z.string().describe('The full name of the person.'),
  email: z.string().email().describe('The email address of the person.'),
  phone: z.string().describe('The phone number of the person.'),
  linkedin: z.string().optional().describe('The LinkedIn profile URL of the person.'),
  github: z.string().optional().describe('The GitHub profile URL of the person.'),
  portfolio: z.string().optional().describe('The portfolio URL of the person.'),
  location: z.string().describe('The location of the person.'),
});

const JobProfileSchema = z.string().describe('The job profile or title of the person.');

const SkillsSchema = z.array(z.string()).describe('A list of skills.');

const WorkExperienceSchema = z.object({
  title: z.string().describe('The job title.'),
  company: z.string().describe('The company name.'),
  startDate: z.string().describe('The start date of the job.'),
  endDate: z.string().describe('The end date of the job (or "Present").'),
  description: z.string().describe('A description of the job responsibilities and achievements.'),
});

const ProjectSchema = z.object({
  name: z.string().describe('The name of the project.'),
  description: z.string().describe('A description of the project and its outcomes.'),
  liveLink: z.string().optional().describe('A live URL for the project.'),
  githubLink: z.string().optional().describe('A GitHub URL for the project.'),
});

const EducationSchema = z.object({
  institution: z.string().describe('The name of the educational institution.'),
  degree: z.string().describe('The degree obtained.'),
  startDate: z.string().describe('The start date of the education.'),
  endDate: z.string().describe('The end date of the education.'),
});

const VolunteerExperienceSchema = z.object({
  organization: z.string().describe('The name of the volunteer organization.'),
  role: z.string().describe('The role held during volunteering.'),
  startDate: z.string().describe('The start date of volunteering.'),
  endDate: z.string().describe('The end date of volunteering.'),
  description: z.string().describe('A description of the volunteer responsibilities and achievements.'),
});

const HobbiesSchema = z.array(z.string()).describe('A list of hobbies.');

const GenerateResumeInputSchema = z.object({
  personalDetails: PersonalDetailsSchema.describe('Personal details of the person.'),
  jobProfile: JobProfileSchema.optional().describe('The job profile or title of the person.'),
  skills: SkillsSchema.describe('A list of skills.'),
  workExperience: z.array(WorkExperienceSchema).describe('A list of work experiences.'),
  projects: z.array(ProjectSchema).describe('A list of projects.'),
  education: z.array(EducationSchema).describe('A list of education entries.'),
  volunteerExperience: z.array(VolunteerExperienceSchema).optional().describe('A list of volunteer experiences.'),
  hobbies: HobbiesSchema.optional().describe('A list of hobbies.'),
});

export type GenerateResumeInput = z.infer<typeof GenerateResumeInputSchema>;

// This schema is for the flow's public contract (must be a string)
const GenerateResumeOutputSchema = z.string().describe('The generated resume in plain text format.');
export type GenerateResumeOutput = z.infer<typeof GenerateResumeOutputSchema>;

// This schema is for the prompt's internal handling, allowing null
const NullableGenerateResumeOutputSchema = z.string().nullable().describe('The generated resume in plain text format, possibly null.');


export async function generateResume(input: GenerateResumeInput): Promise<GenerateResumeOutput> {
  return generateResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: {schema: GenerateResumeInputSchema},
  output: {schema: NullableGenerateResumeOutputSchema},
  prompt: `You are an expert resume writer. Transform the following structured information into a professional, grammatically correct, ATS-optimized resume in PLAIN TEXT format.
  Do NOT output JSON. The resume should be ready to be copied and pasted into a text editor (like Notepad) or a Word document.

  Output Format Guidelines:
  - Start with the Job Profile/Resume Heading if provided, centered or prominently displayed.
  - Then list Personal Details: Name (prominently), followed by Email, Phone, and Location on one line. On the next line, list LinkedIn, GitHub, and Portfolio URLs if provided, clearly labeled.
  - Follow with a 'SKILLS' section, listing skills clearly (e.g., comma-separated or bulleted list under a 'SKILLS' heading).
  - Then, 'WORK EXPERIENCE' section. For each experience: Title and Company on one line, Dates (Start - End) on the next, and a Description (use bullet points starting with '-' for responsibilities/achievements).
  - Then, 'PROJECTS' section. For each project: Name, Description (use bullet points), Live Link (if provided), GitHub Link (if provided).
  - Then, 'EDUCATION' section. For each entry: Institution and Degree on one line, Dates (Start - End) on the next.
  - If Volunteer Experience is provided, include a 'VOLUNTEER EXPERIENCE' section similar to Work Experience.
  - If Hobbies are provided, include a 'HOBBIES' section, listing them clearly.
  - Use clear uppercase headings for each section (e.g., "PERSONAL DETAILS", "SKILLS", "WORK EXPERIENCE", "PROJECTS", "EDUCATION", "VOLUNTEER EXPERIENCE", "HOBBIES").
  - Use consistent formatting and ample line breaks for readability.
  - If you cannot generate a meaningful resume from the input, output nothing.

  Resume Data:

  {{#if jobProfile}}
  {{{jobProfile}}}
  --------------------
  {{/if}}

  PERSONAL DETAILS
  --------------------
  Name: {{{personalDetails.name}}}
  Email: {{{personalDetails.email}}} | Phone: {{{personalDetails.phone}}} | Location: {{{personalDetails.location}}}
  {{#if personalDetails.linkedin}}LinkedIn: {{{personalDetails.linkedin}}}{{/if}}{{#if personalDetails.github}} | GitHub: {{{personalDetails.github}}}{{/if}}{{#if personalDetails.portfolio}} | Portfolio: {{{personalDetails.portfolio}}}{{/if}}

  SKILLS
  --------------------
  {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  WORK EXPERIENCE
  --------------------
  {{#each workExperience}}
  Title: {{{this.title}}} at Company: {{{this.company}}}
  Dates: {{{this.startDate}}} - {{{this.endDate}}}
  Description:
  {{{this.description}}}
  {{#unless @last}}

  {{/unless}}
  {{/each}}

  PROJECTS
  --------------------
  {{#each projects}}
  Project: {{{this.name}}}
  Description:
  {{{this.description}}}
  {{#if this.liveLink}}Live Link: {{{this.liveLink}}}{{/if}}
  {{#if this.githubLink}}GitHub Link: {{{this.githubLink}}}{{/if}}
  {{#unless @last}}

  {{/unless}}
  {{/each}}

  EDUCATION
  --------------------
  {{#each education}}
  Institution: {{{this.institution}}}, Degree: {{{this.degree}}}
  Dates: {{{this.startDate}}} - {{{this.endDate}}}
  {{#unless @last}}

  {{/unless}}
  {{/each}}

  {{#if volunteerExperience}}
  VOLUNTEER EXPERIENCE
  --------------------
  {{#each volunteerExperience}}
  Organization: {{{this.organization}}}, Role: {{{this.role}}}
  Dates: {{{this.startDate}}} - {{{this.endDate}}}
  Description:
  {{{this.description}}}
  {{#unless @last}}

  {{/unless}}
  {{/each}}
  {{/if}}

  {{#if hobbies}}
  HOBBIES
  --------------------
  {{#each hobbies}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  {{/if}}
  `,
});

const generateResumeFlow = ai.defineFlow(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GenerateResumeOutputSchema, // Flow must return a string
  },
  async input => {
    const response = await prompt(input); // response.text can be string | null
    const textOutput = response.text;
    if (textOutput === null || textOutput === undefined) {
      console.warn('generateResumePrompt returned null or undefined text. Returning empty string.');
      return ""; // Ensure flow returns a string
    }
    return textOutput; // Returns a string
  }
);
