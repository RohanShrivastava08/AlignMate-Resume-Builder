"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumePreviewProps {
  resumeText: string;
}

export function ResumePreview({ resumeText }: ResumePreviewProps) {
  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-headline">Resume Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-[calc(100vh-280px)] md:h-[600px] p-1 rounded-md border">
          {resumeText ? (
            <pre className="whitespace-pre-wrap break-words p-4 text-sm font-body leading-relaxed">
              {resumeText}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Your resume will appear here.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
