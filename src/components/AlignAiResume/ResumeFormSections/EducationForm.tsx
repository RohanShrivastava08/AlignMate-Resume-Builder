"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeInput } from "@/ai/flows/generate-resume";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrayFieldForm } from "./ArrayFieldForm";

interface EducationFormProps {
  form: UseFormReturn<GenerateResumeInput>;
}

const defaultEducation = {
  institution: "",
  degree: "",
  startDate: "",
  endDate: "",
};

export function EducationForm({ form }: EducationFormProps) {
  return (
    <ArrayFieldForm
      control={form.control}
      name="education"
      singularItemName="Education"
      defaultItemValue={defaultEducation}
      renderItem={(index) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name={`education.${index}.institution`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Indian Institute of Technology, Delhi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`education.${index}.degree`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree/Certificate</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., B.Tech in Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`education.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Aug 2016" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., May 2020" {...field} />
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
