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

const GenerateResumeOutputSchema = z.string().describe('The generated resume in plain text format.');

export type GenerateResumeOutput = z.infer<typeof GenerateResumeOutputSchema>;

export async function generateResume(input: GenerateResumeInput): Promise<GenerateResumeOutput> {
  return generateResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: {schema: GenerateResumeInputSchema},
  output: {schema: GenerateResumeOutputSchema},
  prompt: `You are an expert resume writer. You will generate a professional, grammatically correct, ATS-optimized resume in plain text format from the provided information.

  Personal Details:
  Name: {{{personalDetails.name}}}
  Email: {{{personalDetails.email}}}
  Phone: {{{personalDetails.phone}}}
  LinkedIn: {{{personalDetails.linkedin}}}
  GitHub: {{{personalDetails.github}}}
  Location: {{{personalDetails.location}}}

  {{#if jobProfile}}
  Job Profile: {{{jobProfile}}}
  {{/if}}

  Skills:
  {{#each skills}}
  - {{{this}}}
  {{/each}}

  Work Experience:
  {{#each workExperience}}
  Title: {{{this.title}}}
  Company: {{{this.company}}}
  Start Date: {{{this.startDate}}}
  End Date: {{{this.endDate}}}
  Description: {{{this.description}}}
  {{/each}}

  Projects:
  {{#each projects}}
  Name: {{{this.name}}}
  Description: {{{this.description}}}
  {{/each}}

  Education:
  {{#each education}}
  Institution: {{{this.institution}}}
  Degree: {{{this.degree}}}
  Start Date: {{{this.startDate}}}
  End Date: {{{this.endDate}}}
  {{/each}}

  {{#if volunteerExperience}}
  Volunteer Experience:
  {{#each volunteerExperience}}
  Organization: {{{this.organization}}}
  Role: {{{this.role}}}
  Start Date: {{{this.startDate}}}
  End Date: {{{this.endDate}}}
  Description: {{{this.description}}}
  {{/each}}
  {{/if}}

  {{#if hobbies}}
  Hobbies:
  {{#each hobbies}}
  - {{{this}}}
  {{/each}}
  {{/if}}
  `,
});

const generateResumeFlow = ai.defineFlow(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GenerateResumeOutputSchema,
  },
  async input => {
    const {text} = await prompt(input);
    return text!;
  }
);
