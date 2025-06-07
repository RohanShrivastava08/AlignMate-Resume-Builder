
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeFormValues } from "@/lib/zod-schemas"; // Corrected import
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrayFieldForm } from "./ArrayFieldForm";

interface ProjectsFormProps {
  form: UseFormReturn<GenerateResumeFormValues>; // Corrected type
}

const defaultProject = {
  name: "",
  description: "",
  liveLink: "",
  githubLink: "",
};

export function ProjectsForm({ form }: ProjectsFormProps) {
  return (
    <ArrayFieldForm
      control={form.control}
      name="projects"
      singularItemName="Project"
      defaultItemValue={defaultProject}
      renderItem={(index) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name={`projects.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., E-commerce Platform" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`projects.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the project, your role, and technologies used. Highlight outcomes."
                    {...field}
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`projects.${index}.liveLink`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Link (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., https://myproject.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`projects.${index}.githubLink`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Link (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., https://github.com/user/project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
    />
  );
}
