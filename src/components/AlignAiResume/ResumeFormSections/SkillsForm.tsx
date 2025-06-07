
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeFormValues } from "@/lib/zod-schemas";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrayFieldForm } from "./ArrayFieldForm";

interface SkillsFormProps {
  form: UseFormReturn<GenerateResumeFormValues>;
}

// Default value for a new skill item in the array
const defaultSkillValue = "";

export function SkillsForm({ form }: SkillsFormProps) {
  return (
    <ArrayFieldForm
      control={form.control}
      name="skills" // Name of the field array in form values
      singularItemName="Skill"
      defaultItemValue={defaultSkillValue} // Value to append for a new skill
      renderItem={(index) => (
        <FormField
          control={form.control}
          // Path to the specific skill string within the array
          name={`skills.${index}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Skill #{index + 1}</FormLabel>
              <FormControl>
                <Input placeholder="e.g., JavaScript" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    />
  );
}
