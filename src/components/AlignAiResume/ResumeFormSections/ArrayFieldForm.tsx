"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";

interface ArrayFieldFormProps<TFieldValues extends FieldValues, TFieldArrayName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>;
  name: TFieldArrayName;
  renderItem: (index: number, remove: (index?: number | number[]) => void) => React.ReactNode;
  singularItemName: string;
  defaultItemValue: any; // Value for a new item
}

export function ArrayFieldForm<TFieldValues extends FieldValues, TFieldArrayName extends FieldPath<TFieldValues>>({
  control,
  name,
  renderItem,
  singularItemName,
  defaultItemValue,
}: ArrayFieldFormProps<TFieldValues, TFieldArrayName>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="space-y-4">
      {fields.map((item, index) => (
        <Card key={item.id} className="relative pt-8 shadow-sm">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-destructive hover:text-destructive"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove {singularItemName}</span>
          </Button>
          <CardContent>
            {renderItem(index, remove)}
          </CardContent>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => append(defaultItemValue)}
        className="w-full"
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add {singularItemName}
      </Button>
    </div>
  );
}
