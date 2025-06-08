import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rohan Patel",
    jobTitle: "Software Engineer Fresher",
    review: "AlignMate helped me create a professional resume that got me multiple interview calls! The ATS optimization is a game-changer.",
    avatarSrc: "https://t3.ftcdn.net/jpg/01/71/24/30/360_F_171243096_npNQnha3ocQkvT1ZRU9Zb6kV90buhk5K.jpg",
    avatarFallback: "RP",
    stars: 5,
    hint: "indian man",
  },
  {
    name: "Priya Singh",
    jobTitle: "Marketing Intern",
    review: "As a fresher, I was clueless about resume writing. AlignMate made it so easy and the AI suggestions were spot on for the Indian market.",
    avatarSrc: "https://t3.ftcdn.net/jpg/05/56/62/68/360_F_556626807_UUU8AF9t0myQwwfriHuw76KyWsEGWd55.jpg",
    avatarFallback: "PS",
    stars: 5,
    hint: "indian woman",
  },
  {
    name: "Arjun Kumar",
    jobTitle: "Data Analyst",
    review: "The job description tailoring feature is incredible. My resume felt personalized for each application. Highly recommended for tech roles in India.",
    avatarSrc: "https://t3.ftcdn.net/jpg/02/59/07/50/360_F_259075037_SC7O408PFIwPDhTnsBiAq4ASgBDOGF9z.jpg",
    avatarFallback: "AK",
    stars: 4,
    hint: "young man",
  },
  {
    name: "Sneha Reddy",
    jobTitle: "HR Executive",
    review: "I've seen many resumes, and those built with AlignMate are noticeably clearer and more effective. Great tool for job seekers.",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarFallback: "SR",
    stars: 5,
    hint: "professional woman",
  },
  {
    name: "Vikram Desai",
    jobTitle: "Recent Graduate",
    review: "The UI is clean and intuitive. I built my first resume in minutes and felt confident applying for jobs. Thank you AlignMate!",
    avatarSrc: "https://placehold.co/100x100.png",
    avatarFallback: "VD",
    stars: 5,
    hint: "student",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 lg:py-24">
      <div className="container max-w-screen-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Jobseekers</h2>
          <p className="text-lg text-muted-foreground">
            Hear what our users in India have to say about AlignMate Resume Builder.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                    <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.jobTitle}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {Array(testimonial.stars).fill(0).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                  {Array(5 - testimonial.stars).fill(0).map((_, i) => (
                     <Star key={i+testimonial.stars} className="h-5 w-5 text-muted-foreground/50" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground flex-grow">{testimonial.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
