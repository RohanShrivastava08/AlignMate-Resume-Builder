"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeInput } from "@/ai/flows/generate-resume";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface SkillsFormProps {
  form: UseFormReturn<GenerateResumeInput>;
}

export function SkillsForm({ form }: SkillsFormProps) {
  return (
    <FormField
      control={form.control}
      name="skills"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Skills</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter skills separated by commas (e.g., JavaScript, React, Node.js, Python, SQL)"
              {...field}
              onChange={(e) => {
                // Convert comma-separated string to array of strings for the form state
                const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                field.onChange(skillsArray);
              }}
              // Display skills as comma-separated string in the textarea
              value={Array.isArray(field.value) ? field.value.join(', ') : ''}
              rows={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
