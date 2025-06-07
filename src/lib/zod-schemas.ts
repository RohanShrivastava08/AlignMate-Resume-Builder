
import { z } from "zod";

export const PersonalDetailsSchema = z.object({
  name: z.string().min(1, "Full name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(1, "Phone number is required."),
  linkedin: z.string().url("Invalid URL for LinkedIn profile.").optional().or(z.literal('')),
  github: z.string().url("Invalid URL for GitHub profile.").optional().or(z.literal('')),
  location: z.string().min(1, "Location is required."),
});

export const JobProfileSchema = z.string().optional();

export const SkillsSchema = z.array(z.string().min(1, "Skill cannot be empty.")).min(1, "At least one skill is required.");

export const WorkExperienceSchema = z.object({
  title: z.string().min(1, "Job title is required."),
  company: z.string().min(1, "Company name is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
  description: z.string().min(1, "Description is required."),
});

export const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required."),
  description: z.string().min(1, "Description is required."),
  liveLink: z.string().url("Invalid URL for live link.").optional().or(z.literal('')),
  githubLink: z.string().url("Invalid URL for GitHub link.").optional().or(z.literal('')),
});

export const EducationSchema = z.object({
  institution: z.string().min(1, "Institution name is required."),
  degree: z.string().min(1, "Degree/Certificate is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
});

export const VolunteerExperienceSchema = z.object({
  organization: z.string().min(1, "Organization name is required."),
  role: z.string().min(1, "Role is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
  description: z.string().min(1, "Description is required."),
});

export const HobbiesSchema = z.array(z.string().min(1, "Hobby cannot be empty.")).optional();

export const GenerateResumeFormSchema = z.object({
  personalDetails: PersonalDetailsSchema,
  jobProfile: JobProfileSchema,
  skills: SkillsSchema,
  workExperience: z.array(WorkExperienceSchema).min(1, "At least one work experience is required."),
  projects: z.array(ProjectSchema).min(1, "At least one project is required."),
  education: z.array(EducationSchema).min(1, "At least one education entry is required."),
  volunteerExperience: z.array(VolunteerExperienceSchema).optional(),
  hobbies: HobbiesSchema,
});

export type GenerateResumeFormValues = z.infer<typeof GenerateResumeFormSchema>;

export const initialResumeData: GenerateResumeFormValues = {
  personalDetails: {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    location: "",
  },
  jobProfile: "",
  skills: [],
  workExperience: [
    { title: "", company: "", startDate: "", endDate: "", description: "" },
  ],
  projects: [{ name: "", description: "", liveLink: "", githubLink: "" }],
  education: [
    { institution: "", degree: "", startDate: "", endDate: "" },
  ],
  volunteerExperience: [],
  hobbies: [],
};
