import { Header } from "@/components/AlignAiResume/Header";
import { Footer } from "@/components/AlignAiResume/Footer";
import { ResumeBuilder } from "@/components/AlignAiResume/ResumeBuilder";
import { FeaturesSection } from "@/components/AlignAiResume/FeaturesSection";
import { TemplatesSection } from "@/components/AlignAiResume/TemplatesSection";
import { WhyUseSection } from "@/components/AlignAiResume/WhyUseSection";
import { ReviewsSection } from "@/components/AlignAiResume/ReviewsSection";
import { FAQSection } from "@/components/AlignAiResume/FAQSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section id="hero" className="py-16 lg:py-24 text-center bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container max-w-screen-md">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Align Your Career with AI Precision
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Craft a standout resume that recruiters notice. AlignMate Resume Builder uses artificial intelligence to optimize, tailor, and generate professional resumes in minutes. Perfect for Indian jobseekers and freshers.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="#resume-builder">Start Building Your Resume</Link>
            </Button>
          </div>
        </section>

        <section id="resume-builder" className="py-16 lg:py-24">
          <div className="container max-w-screen-xl">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AlignMate Resume Builder</h2>
                <p className="text-lg text-muted-foreground">
                    Create, optimize, and tailor your resume with our intelligent tools.
                </p>
            </div>
            <ResumeBuilder />
          </div>
        </section>
        
        <FeaturesSection />
        <TemplatesSection />
        <WhyUseSection />
        <ReviewsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
