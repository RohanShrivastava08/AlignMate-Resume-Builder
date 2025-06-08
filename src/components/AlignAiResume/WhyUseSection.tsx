import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Target, Users } from "lucide-react";

export function WhyUseSection() {
  const benefits = [
    {
      icon: <Zap className="h-10 w-10 text-primary mb-4" />,
      title: "AI-Powered Precision",
      description: "Leverage advanced AI to craft resumes that stand out. Our algorithms optimize for ATS, ensuring your application gets noticed by recruiters."
    },
    {
      icon: <Target className="h-10 w-10 text-primary mb-4" />,
      title: "Tailored for Indian Job Market",
      description: "Specifically designed with Indian jobseekers in mind. We understand the nuances and expectations of employers in India, helping you make the right impression."
    },
    {
      icon: <Users className="h-10 w-10 text-primary mb-4" />,
      title: "Ideal for Freshers & Professionals",
      description: "Whether you're a fresher starting your career journey or an experienced professional aiming higher, AlignMate provides the tools to build a compelling resume."
    }
  ];

  return (
    <section id="why-use" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container max-w-screen-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AlignMate Resume?</h2>
          <p className="text-lg text-muted-foreground">
            Empowering Indian jobseekers and freshers to achieve their career goals.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                {benefit.icon}
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
