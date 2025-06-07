
"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import type { GenerateResumeFormValues } from "@/lib/zod-schemas";

// Helper function to generate a modern plain text preview from form data
const generatePlainTextPreview = (data: GenerateResumeFormValues | null): string => {
  if (!data) return "";
  let preview = "";

  if (data.jobProfile && data.jobProfile.trim() !== "") {
    preview += `${data.jobProfile.trim().toUpperCase()}\n\n`;
  }

  if (data.personalDetails) {
    if (data.personalDetails.name && data.personalDetails.name.trim() !== "") {
      preview += `${data.personalDetails.name.trim().toUpperCase()}\n`;
    }
    const contactParts = [
      data.personalDetails.email,
      data.personalDetails.phone,
      data.personalDetails.location,
    ].filter(val => val && val.trim() !== "");
    if (contactParts.length > 0) {
      preview += `${contactParts.join(" | ")}\n`;
    }
    
    const linkParts = [];
    if (data.personalDetails.linkedin && data.personalDetails.linkedin.trim() !== "") {
      linkParts.push(`🌐 LinkedIn: ${data.personalDetails.linkedin.trim()}`);
    }
    if (data.personalDetails.github && data.personalDetails.github.trim() !== "") {
      linkParts.push(`🐙 GitHub: ${data.personalDetails.github.trim()}`);
    }
    if (data.personalDetails.portfolio && data.personalDetails.portfolio.trim() !== "") {
      linkParts.push(`💼 Portfolio: ${data.personalDetails.portfolio.trim()}`);
    }
    if (linkParts.length > 0) {
      preview += `${linkParts.join(" | ")}\n`;
    }
    if (preview.trim() !== "" && (data.personalDetails.name || contactParts.length > 0 || linkParts.length > 0)) {
        preview += "\n";
    }
  }

  if (data.skills && data.skills.length > 0 && data.skills.some(skill => skill && skill.trim() !== "")) {
    preview += "SKILLS\n";
    preview += "--------------------\n";
    preview += `${data.skills.filter(skill => skill && skill.trim() !== "").map(s => s.trim()).join(", ")}\n\n`;
  }

  const hasWorkExperience = data.workExperience && data.workExperience.length > 0 && data.workExperience.some(exp => Object.values(exp).some(val => val && String(val).trim() !== ""));
  if (hasWorkExperience) {
    preview += "WORK EXPERIENCE\n";
    preview += "--------------------\n";
    data.workExperience.forEach(exp => {
      if (Object.values(exp).some(val => val && String(val).trim() !== "")) {
        let expHeaderParts = [];
        if (exp.title && exp.title.trim()) expHeaderParts.push(exp.title.trim().toUpperCase());
        if (exp.company && exp.company.trim()) expHeaderParts.push(`at ${exp.company.trim()}`);
        if (expHeaderParts.length > 0) preview += `${expHeaderParts.join(" ")}\n`;
        
        if ((exp.startDate && exp.startDate.trim()) || (exp.endDate && exp.endDate.trim())) {
          preview += `${exp.startDate ? exp.startDate.trim() : ""} - ${exp.endDate ? exp.endDate.trim() : ""}\n`;
        }
        if (exp.description && exp.description.trim()) {
          exp.description.trim().split('\n').forEach(line => {
            if (line.trim()) preview += `- ${line.trim()}\n`;
          });
        }
        preview += "\n";
      }
    });
  }

  const hasProjects = data.projects && data.projects.length > 0 && data.projects.some(proj => Object.values(proj).some(val => val && String(val).trim() !== ""));
  if (hasProjects) {
    preview += "PROJECTS\n";
    preview += "--------------------\n";
    data.projects.forEach(proj => {
       if (Object.values(proj).some(val => val && String(val).trim() !== "")) {
        if (proj.name && proj.name.trim()) {
          preview += `${proj.name.trim().toUpperCase()}\n`;
        }
        const links = [];
        if (proj.liveLink && proj.liveLink.trim()) links.push(`Live: ${proj.liveLink.trim()}`);
        if (proj.githubLink && proj.githubLink.trim()) links.push(`GitHub: ${proj.githubLink.trim()}`);
        if (links.length > 0) {
          preview += `Links: ${links.join(" | ")}\n`;
        }
        if (proj.description && proj.description.trim()) {
           proj.description.trim().split('\n').forEach(line => {
            if (line.trim()) preview += `- ${line.trim()}\n`;
          });
        }
        preview += "\n";
      }
    });
  }

  const hasEducation = data.education && data.education.length > 0 && data.education.some(edu => Object.values(edu).some(val => val && String(val).trim() !== ""));
  if (hasEducation) {
    preview += "EDUCATION\n";
    preview += "--------------------\n";
    data.education.forEach(edu => {
      if (Object.values(edu).some(val => val && String(val).trim() !== "")) {
        let eduHeaderParts = [];
        if (edu.degree && edu.degree.trim()) eduHeaderParts.push(edu.degree.trim());
        if (edu.institution && edu.institution.trim()) eduHeaderParts.push(edu.institution.trim());
         if (eduHeaderParts.length > 0) preview += `${eduHeaderParts.join(", ")}\n`;

        if ((edu.startDate && edu.startDate.trim()) || (edu.endDate && edu.endDate.trim())) {
          preview += `${edu.startDate ? edu.startDate.trim() : ""} - ${edu.endDate ? edu.endDate.trim() : ""}\n`;
        }
        preview += "\n";
      }
    });
  }
  
  const hasVolunteerExperience = data.volunteerExperience && data.volunteerExperience.length > 0 && data.volunteerExperience.some(vol => Object.values(vol).some(val => val && String(val).trim() !== ""));
  if (hasVolunteerExperience) {
    preview += "VOLUNTEER EXPERIENCE\n";
    preview += "--------------------\n";
    data.volunteerExperience.forEach(vol => {
      if (Object.values(vol).some(val => val && String(val).trim() !== "")) {
        let volHeaderParts = [];
        if (vol.role && vol.role.trim()) volHeaderParts.push(vol.role.trim().toUpperCase());
        if (vol.organization && vol.organization.trim()) volHeaderParts.push(`at ${vol.organization.trim()}`);
        if (volHeaderParts.length > 0) preview += `${volHeaderParts.join(" ")}\n`;
        
        if ((vol.startDate && vol.startDate.trim()) || (vol.endDate && vol.endDate.trim())) {
          preview += `${vol.startDate ? vol.startDate.trim() : ""} - ${vol.endDate ? vol.endDate.trim() : ""}\n`;
        }
        if (vol.description && vol.description.trim()) {
           vol.description.trim().split('\n').forEach(line => {
            if (line.trim()) preview += `- ${line.trim()}\n`;
          });
        }
        preview += "\n";
      }
    });
  }

  if (data.hobbies && data.hobbies.length > 0 && data.hobbies.some(hobby => hobby && hobby.trim() !== "")) {
    preview += "HOBBIES\n";
    preview += "--------------------\n";
    preview += `${data.hobbies.filter(hobby => hobby && hobby.trim() !== "").map(h => h.trim()).join(", ")}\n\n`;
  }

  return preview.trim();
};


export function ResumeBuilder() {
  const { toast } = useToast();
  const [inputMode, setInputMode] = useState<"paste" | "form">("form");
  const [pastedResume, setPastedResume] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
  
  const [isLoadingOptimize, setIsLoadingOptimize] = useState(false);
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);
  const [isLoadingTailor, setIsLoadingTailor] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  
  const [reviewData, setReviewData] = useState<TailorResumeOutput["review"] | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    // Load job title and description from localStorage
    const savedJobTitle = localStorage.getItem("alignai_jobTitle");
    if (savedJobTitle) setJobTitle(savedJobTitle);
    const savedJobDescription = localStorage.getItem("alignai_jobDescription");
    if (savedJobDescription) setJobDescription(savedJobDescription);
    
    // Clear pasted resume and generated resume on mount
    setPastedResume(""); 
    setGeneratedResume(""); 
  }, []);

  useEffect(() => {
    localStorage.setItem("alignai_jobTitle", jobTitle);
  }, [jobTitle]);

  useEffect(() => {
    localStorage.setItem("alignai_jobDescription", jobDescription);
  }, [jobDescription]);

  const handleFormUpdate = useCallback((formData: GenerateResumeFormValues) => {
    if (inputMode === "form") {
      const plainTextPreview = generatePlainTextPreview(formData);
      setGeneratedResume(plainTextPreview);
    }
  }, [inputMode]);

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
  
   useEffect(() => {
    if (inputMode === 'paste') {
      if (pastedResume === "") {
        setGeneratedResume(""); 
      } else {
        // When pasting, the pasted content itself is the preview until optimized.
        setGeneratedResume(pastedResume); 
      }
    }
    // For 'form' mode, live updates are handled by `handleFormUpdate`
  }, [inputMode, pastedResume]);


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
              onFormUpdate={handleFormUpdate} 
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
                  onChange={(e) => {
                    setPastedResume(e.target.value);
                    if (inputMode === 'paste') { // Update preview if in paste mode
                        setGeneratedResume(e.target.value);
                    }
                  }}
                  rows={15}
                  className="min-h-[300px]"
                />
                <Button onClick={handleOptimizeResume} className="w-full" disabled={isLoadingOptimize || !pastedResume.trim()}>
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
            <Button onClick={handleTailorResume} className="w-full" disabled={isLoadingTailor || !generatedResume.trim() || !jobDescription.trim()}>
              {isLoadingTailor ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Tailor Resume with AI
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="sticky top-20"> 
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
