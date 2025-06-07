
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const templates = [
  { name: "Modern Professional", imgSrc: "https://placehold.co/300x400.png", hint: "ATS resume" },
  { name: "Creative Minimalist", imgSrc: "https://placehold.co/300x400.png", hint: "modern CV" },
  { name: "Classic ATS-Friendly", imgSrc: "https://placehold.co/300x400.png", hint: "classic ATS" },
];

export function TemplatesSection() {
  return (
    <section id="templates" className="py-16 lg:py-24">
      <div className="container max-w-screen-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">ATS-Optimized Templates</h2>
          <p className="text-lg text-muted-foreground">
            Choose a format that works best for you and the Applicant Tracking Systems.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <CardContent className="p-0">
                <div className="aspect-[3/4] relative w-full overflow-hidden">
                  <Image
                    src={template.imgSrc}
                    alt={template.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={template.hint}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-card">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
         <p className="text-center mt-8 text-muted-foreground">
            Note: AlignAI Resume generates text-based resumes optimized for ATS. Visual templates are for illustrative purposes.
          </p>
      </div>
    </section>
  );
}

