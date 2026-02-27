import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Lightbulb, Target, Quote, ArrowRight, MessageCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO HEADER */}
      <section className="bg-slate-50 py-20 px-4 text-center border-b border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1 text-sm border-none font-semibold tracking-wide">
            ESTABLISHED 2020
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Building Confidence in <span className="text-blue-600">Mathematics</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to making math simple, logical, and engaging rather than relying on rote memorization.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY (Image + Text Split) */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Image Placeholder */}
            <div className="relative h-[500px] w-full bg-slate-200 rounded-2xl overflow-hidden shadow-xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent z-10"></div>
               <img 
                 src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
                 alt="Online Tutoring Concept" 
                 className="w-full h-full object-cover"
               />
            </div>

            {/* Right: Content */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Journey</h2>
              <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                <p>
                  Ruhani Online Education began its journey as a small, dedicated offline tutoring initiative, focused on helping school students build strong foundations in Mathematics. For the first two years, we worked closely with students through in-person classes, refining our teaching methods and understanding the real challenges students face in learning math.
                </p>
                <p>
                  In 2020, with the rise of online education and a growing demand for personalized learning, we transitioned fully into online tutoring and formally established Ruhani Online Education as an ed-tech company. Since then, we have accumulated over seven years of teaching experience in Mathematics education.
                </p>
                <p>
                  Over the years, we have taught and mentored <strong>more than 100 students across the United States</strong>, helping them improve their concept clarity, academic performance, and confidence.
                </p>
                <p>
                  As we continue to grow, we are excited to launch our official website. This platform will serve as a central space for parents and students to explore our programs, understand our teaching philosophy, and stay connected with our learning community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Grid) */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Target className="h-12 w-12 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                To make Mathematics simple, engaging, and accessible for every American student by providing high-quality online tutoring in small, focused batches at affordable prices. We aim to create a supportive learning environment where students feel confident asking questions, build strong conceptual foundations, and develop long-term problem-solving skills.
              </p>
            </div>
            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Lightbulb className="h-12 w-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                To bring trusted, effective math education under one roof and scale our impact to support thousands of students at a time, without compromising on personal attention, teaching quality, or the genuine care we put into every learner’s journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER's MESSAGE */}
      <section className="py-24 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <Quote className="h-16 w-16 text-blue-200 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-slate-900 mb-8">A Message from the Founder</h2>
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed mb-10 italic">
            "Our goal remains the same as it was on day one: to make Mathematics easier, less stressful, and more enjoyable for students, while building a strong academic foundation that supports their future success."
          </blockquote>
          <div className="flex flex-col items-center justify-center">
            <div className="h-24 w-24 bg-slate-300 rounded-full mb-4 overflow-hidden shadow-md border-4 border-white">
               {/* Replace with actual image of Yash Bhatia */}
               <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" alt="Yash Bhatia" className="h-full w-full object-cover" />
            </div>
            <div className="font-bold text-slate-900 text-xl">Yash Bhatia</div>
            <div className="text-blue-600 font-bold tracking-wide text-sm uppercase mt-1">Founder & Director</div>
            <div className="text-sm text-slate-600 mt-2 font-medium">Bachelors in Mechanical Engineering</div>
            <div className="text-sm text-slate-500">7+ Years of Teaching Experience</div>
          </div>
        </div>
      </section>

      {/* 5. OUR METHODOLOGY */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">Why Students Love Us</h2>
             <p className="text-slate-600 mt-4 text-lg">Our student-centered approach changes the way kids view math.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Concept Clarity", desc: "We abandon rote memorization. Our teaching breaks down complex equations into simple, logical steps." },
              { icon: Users, title: "Small Batches", desc: "We limit batch sizes so every student has the floor to ask questions without feeling overwhelmed or ignored." },
              { icon: Lightbulb, title: "Confidence Building", desc: "By replacing the fear of math with genuine understanding, students naturally improve their academic performance." }
            ].map((item, i) => (
              <Card 
                key={i} 
                className="group relative border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-10 -translate-y-10"></div>
                
                <CardContent className="pt-10 text-center px-6 pb-10 relative z-10">
                  <div className="mx-auto bg-slate-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                    <item.icon size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DIGITAL CONTACT SECTION (Replaced Physical Map) */}
      <section className="py-24 px-4 bg-blue-600 text-white text-center">
        <div className="container mx-auto max-w-3xl">
          <MessageCircle className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Have Questions? Let's Talk!</h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed">
            Our parent support team is available daily from <strong>5:00 PM to 10:00 PM IST</strong> to assist you with queries and help you select the perfect plan for your child.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/919220517057" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="secondary" className="px-8 w-full sm:w-auto text-lg h-14 text-blue-900 font-bold shadow-lg">
                Chat on WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Link href="/pricing">
              <Button size="lg" className="px-8 w-full sm:w-auto text-lg h-14 bg-blue-800 hover:bg-blue-900 border border-blue-500 shadow-lg">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}