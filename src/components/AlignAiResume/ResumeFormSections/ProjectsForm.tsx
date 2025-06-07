"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeInput } from "@/ai/flows/generate-resume";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrayFieldForm } from "./ArrayFieldForm";

interface ProjectsFormProps {
  form: UseFormReturn<GenerateResumeInput>;
}

const defaultProject = {
  name: "",
  description: "",
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
        </div>
      )}
    />
  );
}
