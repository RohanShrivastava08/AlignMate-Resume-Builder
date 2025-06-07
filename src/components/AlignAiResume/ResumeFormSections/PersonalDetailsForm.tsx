
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeFormValues } from "@/lib/zod-schemas";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Linkedin, Github, Briefcase } from "lucide-react"; // Or Link for portfolio

interface PersonalDetailsFormProps {
  form: UseFormReturn<GenerateResumeFormValues>;
}

export function PersonalDetailsForm({ form }: PersonalDetailsFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="personalDetails.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Priya Sharma" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalDetails.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="e.g., priya.sharma@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalDetails.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="e.g., +91 9876543210" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalDetails.location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Bangalore, India" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalDetails.linkedin"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn Profile (Optional)
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., linkedin.com/in/priyasharma" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalDetails.github"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center">
              <Github className="mr-2 h-4 w-4" /> GitHub Profile (Optional)
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., github.com/priyasharma" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personalDetails.portfolio"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" /> Portfolio URL (Optional)
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., yourportfolio.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
