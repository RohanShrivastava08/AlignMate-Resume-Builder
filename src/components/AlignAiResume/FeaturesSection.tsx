import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  "AI-Powered Resume Optimization: Get an ATS-friendly resume with strong action verbs and keywords.",
  "Structured Resume Builder: Easily fill out sections for a comprehensive resume.",
  "Job Description Tailoring: Optimize your resume specifically for a job role with AI analysis.",
  "In-depth Resume Review: Understand strengths, weaknesses, ATS score, and get improvement suggestions.",
  "Live Preview: See your resume update in real-time as you type or as AI generates it.",
  "Easy Export: Copy your resume or download it as a .txt file.",
  "Dark/Light Mode: Choose your preferred viewing experience.",
  "Responsive Design: Build your resume on any device, anytime.",
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container max-w-screen-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features That Set You Apart</h2>
          <p className="text-lg text-muted-foreground">
            AlignMate Resume Builder is packed with tools to help you land your dream job.
          </p>
        </div>
        <Card className="shadow-xl">
          <CardContent className="p-8 md:p-10">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                  <span className="text-base md:text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
