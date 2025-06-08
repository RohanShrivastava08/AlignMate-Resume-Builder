
"use client";

import type { TailorResumeOutput } from "@/ai/flows/tailor-resume";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResumeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewData: TailorResumeOutput["review"] | null;
}

const renderListFromString = (text: string | undefined) => {
  if (!text) return null;
  return (
    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
      {text.split('\n').map((item, index) => {
        const trimmedItem = item.replace(/^[-*]\s*/, '').trim(); // Remove leading hyphens/asterisks and trim
        if (trimmedItem) {
          return <li key={index}>{trimmedItem}</li>;
        }
        return null;
      })}
    </ul>
  );
};

export function ResumeReviewModal({ isOpen, onClose, reviewData }: ResumeReviewModalProps) {
  if (!reviewData) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-headline">Resume Review & Analysis</AlertDialogTitle>
          <AlertDialogDescription>
            Here's an AI-powered analysis of your resume against the job description.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="max-h-[60vh] p-1 pr-4">
          <div className="space-y-6 py-4">
            <div>
              <h3 className="font-semibold mb-2 text-lg">ATS Score</h3>
              <div className="flex items-center space-x-2">
                <Progress value={reviewData.atsScore} className="w-full" />
                <Badge variant="secondary" className="text-sm">{reviewData.atsScore}%</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-lg">Keyword Match Rate</h3>
               <div className="flex items-center space-x-2">
                <Progress value={reviewData.keywordMatchRate} className="w-full" />
                <Badge variant="secondary" className="text-sm">{reviewData.keywordMatchRate}%</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1 text-lg">Strengths</h3>
              {renderListFromString(reviewData.strengths)}
            </div>

            <div>
              <h3 className="font-semibold mb-1 text-lg">Weaknesses</h3>
              {renderListFromString(reviewData.weaknesses)}
            </div>

            <div>
              <h3 className="font-semibold mb-1 text-lg">Readability</h3>
              <p className="text-sm text-muted-foreground">{reviewData.readability}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-1 text-lg">Suggestions for Improvement</h3>
              {renderListFromString(reviewData.suggestions)}
            </div>
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

    