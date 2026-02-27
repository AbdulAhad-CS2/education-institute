"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookOpen, Users, Trophy, Star, ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Counter } from "@/components/ui/counter";

// --- Sub-Component: Auto-Rotating Success Card ---
const successStories = [
  {
    rank: "Full Marks",
    exam: "School Math Exam",
    quote: "Before, I used to get bad grades. I almost got full marks in my math exam and my concepts became strong. Very reliable and worth my money.",
    name: "Antonio",
    role: "10th Grade Student"
  },
  {
    rank: "Confidence Up",
    exam: "Algebra & Word Problems",
    quote: "Math used to stress me out. After starting online classes, everything made sense. My test scores went up, and I stopped being scared of math.",
    name: "Katherine",
    role: "10th Grade Student"
  },
  {
    rank: "Grade Boost",
    exam: "School Assessments",
    quote: "I was struggling to keep up. The online sessions helped me understand the basics properly. My grades improved and now I actually enjoy math.",
    name: "Jaime",
    role: "10th Grade Student"
  }
];

function AutoRotatingSuccessCard() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % successStories.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [isPaused]);

  const story = successStories[index];

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Defines the animation for the loader */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div className="absolute inset-0 bg-blue-600 transform rotate-3 rounded-2xl opacity-10 transition-transform duration-500"></div>
      
      {/* The Card Content with Fade Transition Key */}
      <div 
        key={index} // Key change triggers React re-render animation
        className="bg-slate-50 p-10 rounded-2xl border border-slate-200 shadow-xl relative z-10 animate-in fade-in slide-in-from-right-4 duration-500"
      >
         <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trophy className="text-red-600" />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-500 uppercase">Success Highlight</p>
                <h4 className="text-lg font-bold text-slate-900">{story.rank} - {story.exam}</h4>
            </div>
         </div>
         <h3 className="text-2xl font-bold mb-4 text-slate-800">"Game Changer"</h3>
         <p className="text-slate-600 mb-8 leading-relaxed min-h-[100px]">
           "{story.quote}"
         </p>
         <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-300 rounded-full flex items-center justify-center text-slate-500 font-bold">
               {story.name.charAt(0)}
            </div>
            <div>
                <p className="font-bold text-slate-900">{story.name}</p>
                <p className="text-sm text-slate-500">{story.role}</p>
            </div>
         </div>
         
         {/* Progress Bar indicator */}
         <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-200 overflow-hidden rounded-b-2xl">
           <div 
              className="h-full bg-blue-600"
              style={{
                width: isPaused ? '100%' : '100%',
                animation: isPaused ? 'none' : 'progress 4000ms linear forwards'
              }}
           />
         </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION (Clean background as requested - No Hero Image) */}
      <section className="relative flex items-center justify-center text-center px-4 py-32 md:py-48 overflow-hidden bg-slate-50">
        
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-slate-50 z-0"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-1.5 text-sm text-blue-800 mb-6 shadow-sm font-medium">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Online Mathematics Tutoring | Grades 6 to 10
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
            Your <span className="text-blue-600">Road to Success</span> in Mathematics
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            We make math simple, logical, and engaging. Overcome the fear of math with our structured online classes, personal attention, and proven teaching methods.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" className="px-8 w-full sm:w-auto text-lg h-12 bg-blue-700 hover:bg-blue-800 shadow-lg shadow-blue-900/10">
                View Pricing Plans
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 bg-white/80 backdrop-blur-sm border-slate-300">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-700">
              <Counter end={109} />+
            </h3>
            <p className="text-slate-500 mt-2 font-medium">Students Taught</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-700">
              <Counter end={7} />+
            </h3>
            <p className="text-slate-500 mt-2 font-medium">Years of Experience</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-700">
              <Counter end={100} duration={2000} />%
            </h3>
            <p className="text-slate-500 mt-2 font-medium">Concept Clarity</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-700">
              6<span className="text-2xl">th</span>-10<span className="text-2xl">th</span>
            </h3>
            <p className="text-slate-500 mt-2 font-medium">Grades Taught</p>
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHTS / WHY US */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The Ruhani Edge</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We focus on building strong foundations and eliminating the fear of mathematics through a proven, student-centered approach.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <CardHeader className="flex flex-col items-center pt-10">
                <div className="p-5 bg-orange-50 rounded-full mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                  <Users className="h-10 w-10 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold">Small Batches</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600 pb-10 px-8 leading-relaxed">
                Personalized attention for every student. We keep our groups small so no one gets left behind and every doubt is cleared.
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <CardHeader className="flex flex-col items-center pt-10">
                <div className="p-5 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <BookOpen className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold">Affordable Classes</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600 pb-10 px-8 leading-relaxed">
                High-quality education should be accessible. We provide premium online mathematics tutoring at rates that respect your budget.
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <CardHeader className="flex flex-col items-center pt-10">
                <div className="p-5 bg-green-50 rounded-full mb-6 group-hover:bg-green-600 transition-colors duration-300">
                  <Trophy className="h-10 w-10 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold">Regular Assessments</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600 pb-10 px-8 leading-relaxed">
                Bi-weekly and monthly minor tests ensure students stay on track, allowing us to monitor progress and strengthen weak areas.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC PROGRAMS */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl"> 
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Clean Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                Designed for Mathematics Success
              </h2>
              <p className="text-lg text-slate-600">
                We specialize strictly in Mathematics for Grades 6 through 10, ensuring absolute mastery of the subject before high school graduation.
              </p>

              <div className="space-y-6">
                <div className="flex group">
                  <div className="flex-shrink-0 mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">01</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Middle School (Grades 6 & 7)</h3>
                    <p className="text-slate-600 leading-relaxed">Building fundamental logic, mastering fractions, decimals, and getting comfortable with numbers.</p>
                  </div>
                </div>

                <div className="flex group">
                  <div className="flex-shrink-0 mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-lg group-hover:bg-orange-600 group-hover:text-white transition-all">02</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Pre-Algebra (Grade 8)</h3>
                    <p className="text-slate-600 leading-relaxed">Stepping up the challenge. Step-by-step guidance through equations to remove the fear of advanced math.</p>
                  </div>
                </div>

                <div className="flex group">
                  <div className="flex-shrink-0 mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-lg group-hover:bg-green-600 group-hover:text-white transition-all">03</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">High School Prep (Grades 9 & 10)</h3>
                    <p className="text-slate-600 leading-relaxed">Focusing on concept clarity over rote learning for algebra, geometry, and strong school test performance.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                 <Link href="/pricing">
                    <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12">
                       Explore Our Plans <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 </Link>
              </div>
            </div>

            {/* Right Side: Auto Rotating Success Card */}
            <AutoRotatingSuccessCard />

          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Student & Parent Voices</h2>
            <p className="text-lg text-slate-600">Hear how we've helped students conquer their math anxiety.</p>
          </div>

          <div className="max-w-6xl mx-auto px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-6">
                    <div className="p-1 h-full">
                      <Card className="h-full border-none shadow-md bg-white">
                        <CardContent className="flex flex-col p-8 h-full">
                          <Quote className="h-8 w-8 text-blue-200 mb-4" />
                          <div className="flex gap-1 text-yellow-400 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} fill="currentColor" size={16} />
                            ))}
                          </div>
                          <p className="text-slate-600 italic mb-6 flex-grow text-sm leading-relaxed">
                            "{item.text}"
                          </p>
                          <div className="mt-auto pt-4 border-t border-slate-100">
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-xs text-blue-600 font-semibold mt-1">{item.role}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 h-12 w-12 bg-white border-slate-200 hover:bg-blue-50 text-slate-600" />
              <CarouselNext className="-right-4 h-12 w-12 bg-white border-slate-200 hover:bg-blue-50 text-slate-600" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* 6. PRICING PREVIEW SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Choose Your Learning Path</h2>
            <p className="text-lg text-slate-600">Flexible plans tailored to every student's needs. Choose what works best for you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan 1 Preview */}
            <Card className="flex flex-col border-2 border-slate-200 hover:border-blue-600 shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Standard Group</CardTitle>
                <p className="text-sm text-slate-500 font-medium mt-1">Max 10 Students per group</p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$80</span>
                  <span className="text-slate-500 font-medium"> / mo</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 mb-6">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> Starting at 8 classes/month</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> Interactive Group Sessions</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> Regular Minor & Major Tests</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/pricing" className="w-full">
                  <Button variant="outline" className="w-full h-12">View Full Details</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plan 2 Preview (Elevated with Blue Button) */}
            <Card className="flex flex-col border-2 border-slate-200 hover:border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 bg-white transform md:-translate-y-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Premium Small Group</CardTitle>
                <p className="text-sm text-slate-500 font-medium mt-1">Max 5 Students per group</p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$110</span>
                  <span className="text-slate-500 font-medium"> / mo</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 mb-6">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> Starting at 8 classes/month</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> Highly Personalized Attention</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> Advanced Peer Interaction</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/pricing" className="w-full">
                  <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white">View Full Details</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plan 3 Preview */}
            <Card className="flex flex-col border-2 border-slate-200 hover:border-blue-600 shadow-sm hover:shadow-xl transition-all duration-300 bg-slate-50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">1-on-1 Private</CardTitle>
                <p className="text-sm text-slate-500 font-medium mt-1">Individual dedicated tutor</p>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$220</span>
                  <span className="text-slate-500 font-medium"> / mo</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 mb-6">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> Starting at 8 classes/month</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> 100% Customized Learning Pace</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 mr-3 text-blue-600 shrink-0"/> Direct Parent-Tutor Feedback</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/pricing" className="w-full">
                  <Button variant="outline" className="w-full h-12">View Full Details</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      {/* <section className="py-24 px-4 bg-blue-900 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to overcome the fear of Math?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our online classes and build a strong mathematical foundation for the future.
          </p>
          <Link href="/pricing">
             <Button size="lg" variant="secondary" className="px-10 py-6 text-lg font-semibold text-blue-900">
                View Pricing Plans <ArrowRight className="ml-2 h-5 w-5" />
             </Button>
          </Link>
        </div>
      </section> */}

    </div>
  );
}

// Data for Testimonials
const testimonials = [
  {
    text: "Math used to stress me out so much, especially algebra and word problems. After starting online classes, everything finally started making sense. The concepts were explained in a way that felt simple and logical. My test scores went up, but more importantly, I stopped being scared of math.",
    name: "Katherine",
    role: "10th Grade Student"
  },
  {
    text: "Before these classes, I was struggling to keep up in math and often felt lost in class. The online sessions helped me understand the basics properly and clear all my doubts. The teaching style is patient and easy to follow. My grades improved and now I actually enjoy solving math problems.",
    name: "Jaime",
    role: "10th Grade Student"
  },
  {
    text: "I used to find math confusing, especially fractions and equations. The online classes helped me understand step by step instead of just memorizing formulas. Now I feel more confident answering questions in school and my performance in tests has improved. Math doesn’t feel scary anymore.",
    name: "Harelle",
    role: "8th Grade Student"
  },
  {
    text: "We noticed a huge change in our child’s approach towards mathematics. Earlier, homework used to be a daily struggle, but now concepts are much clearer and there is more confidence while solving problems. The improvement in school results has been consistent, and most importantly, the fear of math is gone.",
    name: "Faiza",
    role: "Parent of 10th Grader"
  },
  {
    text: "The online math tutoring has made a real difference in my child’s learning. The focus on concept clarity rather than rote learning helped build a strong foundation. We saw a clear improvement in grades and also in the way our child approaches problem-solving. The teaching is structured, patient, and very effective.",
    name: "Vineetha",
    role: "Parent of 9th Grader"
  }
];