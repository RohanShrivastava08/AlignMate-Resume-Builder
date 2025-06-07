
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { optimizeResumeFromText } from "@/ai/flows/optimize-resume";
import { tailorResume, type TailorResumeOutput } from "@/ai/flows/tailor-resume";
import { ResumeForm } from "./ResumeForm";
import { ResumePreview } from "./ResumePreview";
import { ResumeReviewModal } from "./ResumeReviewModal";
import { useToast } from "@/hooks/use-toast";
import { Download, Copy, Loader2, FileSearch2 } from "lucide-react";

export function ResumeBuilder() {
  const { toast } = useToast();
  const [inputMode, setInputMode] = useState<"paste" | "form">("form");
  const [pastedResume, setPastedResume] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
  
  const [isLoadingOptimize, setIsLoadingOptimize] = useState(false);
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false); // Used by ResumeForm
  const [isLoadingTailor, setIsLoadingTailor] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(false); // New state for AI Review button
  
  const [reviewData, setReviewData] = useState<TailorResumeOutput["review"] | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Load saved data from localStorage (excluding generatedResume)
  useEffect(() => {
    const savedPastedResume = localStorage.getItem("alignai_pastedResume");
    if (savedPastedResume) setPastedResume(savedPastedResume);
    // const savedGeneratedResume = localStorage.getItem("alignai_generatedResume"); // Removed
    // if (savedGeneratedResume) setGeneratedResume(savedGeneratedResume);          // Removed
    const savedJobTitle = localStorage.getItem("alignai_jobTitle");
    if (savedJobTitle) setJobTitle(savedJobTitle);
    const savedJobDescription = localStorage.getItem("alignai_jobDescription");
    if (savedJobDescription) setJobDescription(savedJobDescription);
  }, []);

  // Save data to localStorage (excluding generatedResume)
  useEffect(() => {
    localStorage.setItem("alignai_pastedResume", pastedResume);
  }, [pastedResume]);
  // useEffect(() => {                                                        // Removed
  //   localStorage.setItem("alignai_generatedResume", generatedResume);      // Removed
  // }, [generatedResume]);                                                   // Removed
   useEffect(() => {
    localStorage.setItem("alignai_jobTitle", jobTitle);
  }, [jobTitle]);
  useEffect(() => {
    localStorage.setItem("alignai_jobDescription", jobDescription);
  }, [jobDescription]);


  const handleOptimizeResume = async () => {
    if (!pastedResume.trim()) {
      toast({ title: "Input Required", description: "Please paste your resume text.", variant: "destructive" });
      return;
    }
    setIsLoadingOptimize(true);
    try {
      const result = await optimizeResumeFromText({ resumeText: pastedResume });
      setGeneratedResume(result.optimizedResume);
      toast({ title: "Resume Optimized!", description: "Your resume has been optimized by AI." });
    } catch (error) {
      console.error("Error optimizing resume:", error);
      toast({ title: "Error", description: "Failed to optimize resume. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingOptimize(false);
    }
  };

  const handleTailorResume = async () => {
    if (!generatedResume.trim()) {
      toast({ title: "Resume Required", description: "Please generate or optimize a resume first.", variant: "destructive" });
      return;
    }
    if (!jobDescription.trim()) {
      toast({ title: "Job Description Required", description: "Please enter the job description.", variant: "destructive" });
      return;
    }
    setIsLoadingTailor(true);
    try {
      const result = await tailorResume({ resumeText: generatedResume, jobDescription });
      setGeneratedResume(result.tailoredResume);
      setReviewData(result.review);
      setIsReviewModalOpen(true);
      toast({ title: "Resume Tailored!", description: "Your resume has been tailored to the job description." });
    } catch (error) {
      console.error("Error tailoring resume:", error);
      toast({ title: "Error", description: "Failed to tailor resume. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingTailor(false);
    }
  };

  const handleGetReview = async () => {
    if (!generatedResume.trim()) {
      toast({ title: "Resume Required", description: "Please generate or optimize a resume first.", variant: "destructive" });
      return;
    }
    if (!jobDescription.trim()) {
      toast({ title: "Job Description Required", description: "Please enter the job description in the section above to get a review.", variant: "destructive" });
      return;
    }
    setIsLoadingReview(true);
    try {
      const result = await tailorResume({ resumeText: generatedResume, jobDescription });
      // DO NOT setGeneratedResume here, only show review
      setReviewData(result.review);
      setIsReviewModalOpen(true);
      toast({ title: "AI Review Ready!", description: "The AI analysis of your resume is available." });
    } catch (error) {
      console.error("Error getting resume review:", error);
      toast({ title: "Error", description: "Failed to get resume review. Please try again.", variant: "destructive" });
    } finally {
      setIsLoadingReview(false);
    }
  };

  const handleCopyResume = () => {
    if (!generatedResume.trim()) {
      toast({ title: "Nothing to Copy", description: "Generate a resume first.", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(generatedResume);
    toast({ title: "Copied!", description: "Resume text copied to clipboard." });
  };

  const handleDownloadResume = () => {
    if (!generatedResume.trim()) {
      toast({ title: "Nothing to Download", description: "Generate a resume first.", variant: "destructive" });
      return;
    }
    const blob = new Blob([generatedResume], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "AlignAI_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast({ title: "Downloaded!", description: "Resume downloaded as AlignAI_Resume.txt." });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <Tabs value={inputMode} onValueChange={(value) => setInputMode(value as "paste" | "form")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Build with Form</TabsTrigger>
            <TabsTrigger value="paste">Paste Existing Resume</TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="mt-6">
            <ResumeForm 
              onResumeGenerated={setGeneratedResume} 
              setIsLoading={setIsLoadingGenerate}
              isLoading={isLoadingGenerate}
            />
          </TabsContent>
          <TabsContent value="paste" className="mt-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-headline">Paste Your Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={pastedResume}
                  onChange={(e) => setPastedResume(e.target.value)}
                  rows={15}
                  className="min-h-[300px]"
                />
                <Button onClick={handleOptimizeResume} className="w-full" disabled={isLoadingOptimize}>
                  {isLoadingOptimize ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Optimize Resume with AI
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-headline">Tailor to Job Description (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Job Title (e.g., Software Engineer)"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <Textarea
              placeholder="Paste the full Job Description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              className="min-h-[200px]"
            />
            <Button onClick={handleTailorResume} className="w-full" disabled={isLoadingTailor || !generatedResume.trim()}>
              {isLoadingTailor ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Tailor Resume with AI
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="sticky top-20"> {/* Make preview sticky */}
        <ResumePreview resumeText={generatedResume} />
        <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button onClick={handleCopyResume} variant="outline" className="flex-1" disabled={!generatedResume.trim()}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button onClick={handleDownloadResume} variant="outline" className="flex-1" disabled={!generatedResume.trim()}>
            <Download className="mr-2 h-4 w-4" /> Download .txt
          </Button>
          <Button 
            onClick={handleGetReview} 
            variant="outline" 
            className="flex-1" 
            disabled={isLoadingReview || !generatedResume.trim() || !jobDescription.trim()}
          >
            {isLoadingReview ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileSearch2 className="mr-2 h-4 w-4" />}
            Get AI Review
          </Button>
        </div>
      </div>

      <ResumeReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviewData={reviewData}
      />
    </div>
  );
}
