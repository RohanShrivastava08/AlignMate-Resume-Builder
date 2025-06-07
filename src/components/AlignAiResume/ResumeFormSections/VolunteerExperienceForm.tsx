"use client";

import type { UseFormReturn } from "react-hook-form";
import type { GenerateResumeInput } from "@/ai/flows/generate-resume";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrayFieldForm } from "./ArrayFieldForm";

interface VolunteerExperienceFormProps {
  form: UseFormReturn<GenerateResumeInput>;
}

const defaultVolunteerExperience = {
  organization: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
};

export function VolunteerExperienceForm({ form }: VolunteerExperienceFormProps) {
  return (
    <ArrayFieldForm
      control={form.control}
      name="volunteerExperience"
      singularItemName="Volunteer Experience"
      defaultItemValue={defaultVolunteerExperience}
      renderItem={(index) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name={`volunteerExperience.${index}.organization`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Local NGO" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`volunteerExperience.${index}.role`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Event Coordinator" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`volunteerExperience.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jan 2019" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`volunteerExperience.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Dec 2019" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={`volunteerExperience.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your contributions and impact."
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
