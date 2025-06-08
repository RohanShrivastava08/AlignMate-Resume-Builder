import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is AlignMate Resume Builder free to use?",
    answer: "AlignMate offers a free tier with core resume building and AI optimization features. Advanced features like unlimited AI tailoring and premium templates might be part of a future pro plan.",
  },
  {
    question: "Can I export my resume to Word or PDF?",
    answer: "Currently, AlignMate supports .txt export, which is ideal for copy-pasting into online job applications and ensuring ATS compatibility. We are exploring options for other formats like PDF in the future.",
  },
  {
    question: "How accurate is the AI for resume optimization and tailoring?",
    answer: "Our AI is trained on vast datasets of successful resumes and job descriptions. It provides highly relevant suggestions to improve ATS compatibility and content quality. However, it's always a good idea to review the AI's suggestions and customize them to your unique profile.",
  },
  {
    question: "Is my data safe with AlignMate?",
    answer: "We take data privacy seriously. Your resume data is processed securely. For persistence, we use browser localStorage, meaning your data stays on your device unless you choose to clear it. We do not store your resume data on our servers without explicit consent for specific features.",
  },
  {
    question: "How does AlignMate help freshers in India?",
    answer: "AlignMate is designed to be user-friendly for those new to resume writing. It guides freshers through essential sections, provides AI suggestions tailored for entry-level roles, and helps create ATS-friendly resumes that are crucial for navigating the Indian job market.",
  },
  {
    question: "What is an ATS-friendly resume?",
    answer: "An ATS (Applicant Tracking System) is software used by recruiters to filter job applications. An ATS-friendly resume is formatted simply, uses standard fonts, includes relevant keywords from the job description, and has clear section headings. AlignMate helps create such resumes.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container max-w-screen-md">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about AlignMate Resume Builder.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="bg-card shadow-sm rounded-md mb-3">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline font-medium text-base md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-muted-foreground text-sm md:text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
