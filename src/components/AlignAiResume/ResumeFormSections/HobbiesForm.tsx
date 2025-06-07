
"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeFormValues } from "@/lib/zod-schemas";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface HobbiesFormProps {
  form: UseFormReturn<GenerateResumeFormValues>;
}

export function HobbiesForm({ form }: HobbiesFormProps) {
  return (
    <FormField
      control={form.control}
      name="hobbies"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Hobbies (Optional)</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Enter hobbies separated by COMMA (e.g., Reading, Hiking, Coding)"
              {...field}
               onChange={(e) => {
                const hobbiesArray = e.target.value.split(',').map(hobby => hobby.trim()).filter(hobby => hobby);
                field.onChange(hobbiesArray);
              }}
              value={Array.isArray(field.value) ? field.value.join(', ') : ''}
              rows={2}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

