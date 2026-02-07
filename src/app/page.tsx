"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    rank: "AIR 45",
    exam: "NEET 2025",
    quote: "The test series was a game changer. I identified my weak areas in Physics and scored 680.",
    name: "Rahul Sharma",
    role: "Student"
  },
  {
    rank: "AIR 12",
    exam: "JEE Adv 2025",
    quote: "Conceptual clarity is everything here. The faculty helped me crack the toughest problems.",
    name: "Priya Patel",
    role: "Student"
  },
  {
    rank: "98%",
    exam: "CBSE Boards",
    quote: "I balanced my boards and entrance prep perfectly thanks to their hybrid schedule.",
    name: "Amit Kumar",
    role: "Student"
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
         <p className="text-slate-600 mb-8 leading-relaxed min-h-[80px]">
           "{story.quote}"
         </p>
         <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-300 rounded-full"></div>
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
                // Key logic: Animation runs 0% -> 100% over 4s. 
                // Pauses or jumps to full if hovered (controlled by isPaused)
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
  // --- New Logic for Hero Background Carousel ---
  const heroImages = ["/1.png", "/2.png", "/3.png"];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);
  // ----------------------------------------------

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION (Updated BG Image Logic Only) */}
      <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        
        {/* BACKGROUND IMAGE with White Overlay */}
        {/* <div  */}
          {/* className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out" // Added transition for smooth effect */}
          {/* style={{  */}
            {/* backgroundImage: `url('${heroImages[heroIndex]}')`, */}
          {/* }} */}
        {/* > */}
          {/* 90% White Overlay to keep text dark and readable */}
          {/* <div className="absolute inset-0 bg-white/90"></div> */}
        {/* </div> */}

        {/* Content (Relative z-10 puts it above the image) */}
        <div className="relative z-10 container mx-auto max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm text-orange-800 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-orange-600 mr-2 animate-pulse"></span>
            Admissions Open for Batch 2026-27
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
            Building Future <span className="text-blue-600">IITians</span> & <span className="text-blue-600">Doctors</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
            India's most trusted coaching institute for JEE (Mains & Adv), NEET, and CBSE Boards. 
            We turn potential into performance with our AIR-1 methodology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" className="px-8 w-full sm:w-auto text-lg h-12 bg-blue-700 hover:bg-blue-800 shadow-lg shadow-blue-900/10">
                View Pricing Plans
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 bg-white/80 backdrop-blur-sm">
                Book Classes Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (Reverted to Simple Blue UI + Start on View) */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-700">
              <Counter end={5000} />
            </h3>
            <p className="text-slate-500 mt-2 font-medium">IIT & NEET Selections</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-700">
              <Counter end={15} />
            </h3>
            <p className="text-slate-500 mt-2 font-medium">Years of Trust</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-700">
              <Counter end={120} />
            </h3>
            <p className="text-slate-500 mt-2 font-medium">Expert Faculty (PhDs)</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-700">
              <Counter end={100} duration={3000} />%
            </h3>
            <p className="text-slate-500 mt-2 font-medium">Board Pass Rate</p>
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHTS / WHY US */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">The [Institute Name] Edge</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We don't just teach syllabus; we build concepts. Our hybrid learning model ensures 
              no student is left behind in the race for excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <CardHeader className="flex flex-col items-center pt-10">
                <div className="p-5 bg-orange-50 rounded-full mb-6 group-hover:bg-orange-500 transition-colors duration-300">
                  <BookOpen className="h-10 w-10 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold">Integrated Learning</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600 pb-10 px-8 leading-relaxed">
                Seamlessly covering NCERT school syllabus and competitive exam requirements simultaneously.
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <CardHeader className="flex flex-col items-center pt-10">
                <div className="p-5 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <Users className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold">Kota-Level Faculty</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600 pb-10 px-8 leading-relaxed">
                Learn directly from ex-IITians and top medical professionals who have mentored AIR Top 100 rankers.
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <CardHeader className="flex flex-col items-center pt-10">
                <div className="p-5 bg-green-50 rounded-full mb-6 group-hover:bg-green-600 transition-colors duration-300">
                  <Trophy className="h-10 w-10 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold">Personal Mentorship</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600 pb-10 px-8 leading-relaxed">
                Small batch sizes ensure 1-on-1 attention, dedicated doubt solving, and personalized feedback.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC PROGRAMS (Constrained Width + Auto Rotate Card) */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl"> {/* Width fixed here */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Clean Content */}
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                Designed for Every Stage of Your Journey
              </h2>
              <p className="text-lg text-slate-600">
                Whether you are building a foundation or aiming for the final sprint, 
                we have a structured path for you.
              </p>

              <div className="space-y-6">
                <div className="flex group">
                  <div className="flex-shrink-0 mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">01</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Foundation (Class 8-10)</h3>
                    <p className="text-slate-600 leading-relaxed">Build strong logic for NTSE & Olympiads while acing Boards.</p>
                  </div>
                </div>

                <div className="flex group">
                  <div className="flex-shrink-0 mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-lg group-hover:bg-orange-600 group-hover:text-white transition-all">02</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">JEE (Mains + Adv)</h3>
                    <p className="text-slate-600 leading-relaxed">Rigorous Math & Physics training with 50+ Mock Tests.</p>
                  </div>
                </div>

                <div className="flex group">
                  <div className="flex-shrink-0 mr-5">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-lg group-hover:bg-green-600 group-hover:text-white transition-all">03</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">NEET (Medical)</h3>
                    <p className="text-slate-600 leading-relaxed">Specialized Botany/Zoology focus for government seat security.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                 <Link href="/about">
                    <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-12">
                       Explore All Programs <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Student Voices</h2>
            <p className="text-lg text-slate-600">Hear from those who walked the path before you.</p>
          </div>

          <div className="max-w-5xl mx-auto px-12">
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
                            <p className="text-xs text-blue-600 font-semibold">{item.role}</p>
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

      {/* 6. FINAL CTA */}
      <section className="py-24 px-4 bg-blue-900 text-white text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your Journey to Success</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Limited seats available for the upcoming session. Don't miss your chance to learn from the best.
          </p>
          <Link href="/pricing">
             <Button size="lg" variant="secondary" className="px-10 py-6 text-lg font-semibold text-blue-900">
                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
             </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}

// Data for Testimonials
const testimonials = [
  {
    text: "The Physics faculty here is the best. Concepts that seemed impossible in school became easy. I scored 99.8 percentile in JEE Mains!",
    name: "Aryan Gupta",
    role: "IIT Delhi (CSE)"
  },
  {
    text: "Balancing CBSE Boards and NEET was hard, but the weekly test series kept me on track. Secured a seat in my dream medical college.",
    name: "Neha Verma",
    role: "AIIMS Delhi"
  },
  {
    text: "The doubt clearing sessions were a lifesaver. Being able to ask questions freely helped me build confidence.",
    name: "Rohan Das",
    role: "NIT Trichy"
  },
  {
    text: "Environment plays a huge role. Being surrounded by serious aspirants pushed me to work harder every day.",
    name: "Sanya Mir",
    role: "NEET Rank 120"
  },
  {
    text: "The study material is precise and to the point. You don't need 10 books, just their modules are enough.",
    name: "Vikram Singh",
    role: "JEE Adv Rank 450"
  }
];