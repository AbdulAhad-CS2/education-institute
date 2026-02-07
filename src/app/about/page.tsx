import Image from "next/link"; // Note: In real app use next/image, using standard div for now
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Award, Users, Lightbulb, Target, Quote, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO HEADER */}
      <section className="bg-slate-50 py-20 px-4 text-center border-b border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1 text-sm border-none">
            Since 2010
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Shaping Minds, <span className="text-blue-600">Crafting Futures</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are more than just a coaching institute; we are a community of learners, 
            educators, and achievers dedicated to academic excellence and character building.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY (Image + Text Split) */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Image Placeholder */}
            <div className="relative h-[400px] w-full bg-slate-200 rounded-2xl overflow-hidden shadow-xl">
               {/* Replace with actual image later */}
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
               <img 
                 src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
                 alt="Classroom" 
                 className="w-full h-full object-cover"
               />
            </div>

            {/* Right: Content */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">From a Small Classroom to a Premier Institute</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  It started with a simple belief: <strong>Quality education changes lives.</strong> 
                  What began 15 years ago as a single-room classroom with 10 students has now 
                  grown into one of the city's most trusted educational institutions.
                </p>
                <p>
                  Over the years, we have helped over <strong>5,000 students</strong> realize their dreams 
                  of entering top engineering and medical colleges. But our greatest achievement 
                  isn't just the ranks; it's the confidence we instill in every student who walks through our doors.
                </p>
                <p>
                  Today, we stand tall with a faculty of PhDs, state-of-the-art libraries, 
                  and a hybrid learning model that blends the best of traditional teaching with modern technology.
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
                To democratize quality education by providing accessible, rigorous, and 
                result-oriented mentorship. We aim to bridge the gap between potential and performance 
                for every aspirant.
              </p>
            </div>
            <div className="bg-white/5 p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Lightbulb className="h-12 w-12 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                To be the gold standard in competitive exam preparation, creating not just 
                successful professionals, but ethical leaders who contribute positively to the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIRECTOR'S MESSAGE */}
      <section className="py-24 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <Quote className="h-16 w-16 text-blue-200 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Director's Message</h2>
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-700 leading-relaxed mb-10 italic">
            "We don't just teach subjects; we teach students how to think. 
            In the race for ranks, we never lose sight of the child behind the roll number. 
            Your dream is our responsibility."
          </blockquote>
          <div className="flex flex-col items-center justify-center">
            <div className="h-20 w-20 bg-slate-300 rounded-full mb-4 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" className="h-full w-full object-cover" />
            </div>
            <div className="font-bold text-slate-900 text-xl">Dr. R.K. Verma</div>
            <div className="text-blue-600 font-medium">Founder & Academic Head</div>
            <div className="text-sm text-slate-500 mt-1">Ex-HOD Physics, PhD (IIT Kanpur)</div>
          </div>
        </div>
      </section>

      {/* 5. OUR VALUES / METHODOLOGY */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">What Sets Us Apart</h2>
             <p className="text-slate-600 mt-4">The core pillars of our teaching pedagogy</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
  {[
    { icon: Award, title: "Excellence", desc: "We don't settle for 'good enough'. Our study material is updated weekly to match the changing exam patterns." },
    { icon: Users, title: "Student-Centric", desc: "Small batch sizes (max 40) ensure that every back-bencher gets the same attention as the front-bencher." },
    { icon: Lightbulb, title: "Innovation", desc: "From AI-driven performance analysis to 3D visual aids for Biology/Physics, we leverage tech to simplify learning." }
  ].map((item, i) => (
    <Card 
      key={i} 
      className="group relative border border-slate-100 bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-400 overflow-hidden"
    >
      {/* Decorative Gradient Background Effect on Hover */}
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

      {/* 6. LOCATION & ROUTE PLAN */}
<section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-slate-900">Visit Our Campus</h2>
      <p className="text-slate-600 mt-2">Plan your route to success. Walk-ins are welcome for counseling.</p>
    </div>

    <div className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
      
      {/* Left Side: Contact Info & Hours (Takes up 2 cols) */}
      <div className="lg:col-span-2 p-10 bg-white flex flex-col justify-center">
        <div className="space-y-8">
          
          {/* Address */}
          <div className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-lg h-fit text-blue-600">
              <MapPin size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">Main Campus</h4>
              <p className="text-slate-600 mt-1">
                Plot 45, Knowledge Park III,<br />
                Near Metro Station, Sector 62,<br />
                Noida, UP - 201301
              </p>
              {/* External Link to Google Maps */}
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                className="inline-flex items-center text-blue-600 text-sm font-semibold mt-3 hover:underline"
              >
                Get Directions on Map <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-lg h-fit text-blue-600">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">Admissions Office</h4>
              <p className="text-slate-600 mt-1">+91 98765 43210</p>
              <p className="text-slate-600">0120-456-7890</p>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center">
               <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
               Office Hours
            </h4>
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Monday - Saturday</span>
              <span className="font-semibold text-slate-900">9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Sunday</span>
              <span className="font-semibold text-slate-900">10:00 AM - 2:00 PM</span>
            </div>
          </div>

        </div>
      </div>

      {/* Right Side: Visual Map (Takes up 3 cols) */}
      <div className="lg:col-span-3 h-[400px] lg:h-auto relative bg-slate-200">
        {/* Google Maps Embed Iframe */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.9012415584855!2d77.37032887614917!3d28.602739175681026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce577c92b2361%3A0x6295781364d92d47!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709664560312!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          className="grayscale hover:grayscale-0 transition-all duration-500"
        ></iframe>
        
        {/* Overlay Label */}
        <div className="absolute bottom-6 right-6 bg-white py-2 px-4 rounded-lg shadow-lg text-xs font-bold text-slate-900 pointer-events-none">
          📍 Locate Us Here
        </div>
      </div>

    </div>
  </div>
</section>
    </div>
  );
}