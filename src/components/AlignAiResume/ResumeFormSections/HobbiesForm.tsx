
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeFormValues } from "@/lib/zod-schemas";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrayFieldForm } from "./ArrayFieldForm";

interface HobbiesFormProps {
  form: UseFormReturn<GenerateResumeFormValues>;
}

// Default value for a new hobby item in the array
const defaultHobbyValue = "";

export function HobbiesForm({ form }: HobbiesFormProps) {
  return (
    <ArrayFieldForm
      control={form.control}
      name="hobbies" // Name of the field array in form values
      singularItemName="Hobby"
      defaultItemValue={defaultHobbyValue} // Value to append for a new hobby
      renderItem={(index) => (
        <FormField
          control={form.control}
          // Path to the specific hobby string within the array
          name={`hobbies.${index}`}
          render={({ field }) => (
            <FormItem>
                <FormLabel className="sr-only">Hobby #{index + 1}</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Reading, Hiking" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    />
  );
}
