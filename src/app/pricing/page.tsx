"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, HelpCircle, Zap } from "lucide-react";

// --- PRICING DATA STRUCTURE ---
const pricingData = [
  {
    id: "standard",
    name: "Standard Group Plan",
    description: "Max 10 Students per group",
    color: "bg-slate-50",
    // Features change dynamically based on the number of classes selected
    features: (classes: number) => {
      if (classes === 8) return ["8 classes", "Parent/student support team", "Minor Test every month", "Major Test every 3 months"];
      if (classes === 12) return ["12 classes", "Parent/student support team", "Minor Test every month", "Major Test every 2 months"];
      return ["16 classes", "Parent/student support team", "Minor Test every 2 weeks", "Major Test every 2 months"];
    },
    // Logic to check if this specific combination is the "Most Popular"
    isPopular: (classes: number, cycle: number) => classes === 12 && cycle === 12,
    prices: {
      8:  { 1: 80,  3: 230, 6: 440,   12: 800 },
      12: { 1: 110, 3: 320, 6: 605,   12: 1100 },
      16: { 1: 135, 3: 396, 6: 742.5, 12: 1350 }
    }
  },
  {
    id: "premium",
    name: "Premium Small Group",
    description: "Max 5 Students per group",
    color: "bg-blue-50/50 border-blue-200",
    features: (classes: number) => [
      `${classes} classes`, 
      "Highly Personalized Attention", 
      "Advanced Peer Interaction", 
      "Priority Doubt Solving"
    ],
    isPopular: () => false,
    prices: {
      8:  { 1: 110, 3: 320, 6: 605,   12: 1100 },
      12: { 1: 135, 3: 396, 6: 742.5, 12: 1350 },
      16: { 1: 160, 3: 470, 6: 880,   12: 1600 }
    }
  },
  {
    id: "private",
    name: "1-on-1 Private Plan",
    description: "Individual dedicated tutor",
    color: "bg-slate-50",
    features: (classes: number) => [
      `${classes} classes`, 
      "100% Customized Pace", 
      "Flexible Scheduling", 
      "Direct Parent-Tutor Feedback"
    ],
    isPopular: () => false,
    prices: {
      8:  { 1: 220, 3: 632,  6: 1210, 12: 2200 },
      12: { 1: 320, 3: 933,  6: 1760, 12: 3200 },
      16: { 1: 410, 3: 1204, 6: 2255, 12: 4100 }
    }
  }
];

export default function PricingPage() {
  // Global State for Billing Cycle (1, 3, 6, or 12 months)
  const [billingCycle, setBillingCycle] = useState<1 | 3 | 6 | 12>(1);
  
  // Local State to track selected classes per card
  const [selectedClasses, setSelectedClasses] = useState<{ [key: string]: 8 | 12 | 16 }>({
    standard: 12,
    premium: 12,
    private: 12,
  });

  const handleClassChange = (planId: string, classes: 8 | 12 | 16) => {
    setSelectedClasses(prev => ({ ...prev, [planId]: classes }));
  };

  const handleSubscribe = (planName: string, planId: string) => {
    const classes = selectedClasses[planId];
    console.log(`User selected ${planName} - ${classes} classes/mo - Billed every ${billingCycle} months`);
    alert(`Redirecting to payment for ${planName}...`);
  };

  // Helper to determine the perk text
  const getPerkText = (cycle: number) => {
    if (cycle === 3) return "Includes 1 class free!";
    if (cycle === 6) return "Includes 4 classes free!";
    if (cycle === 12) return "Includes 16 classes free!";
    return null;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* 1. HEADER & BILLING CYCLE TOGGLE */}
      <section className="bg-slate-50 pt-20 pb-28 px-4 text-center border-b border-slate-200">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Plans and <span className="text-blue-600">Pricing</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            Choose the perfect learning environment and schedule for your goals.
          </p>
          
          {/* Custom Segmented Control for Billing Cycle */}
          <div className="inline-flex bg-slate-200/60 p-1.5 rounded-full shadow-inner max-w-full overflow-x-auto">
            {[
              { value: 1, label: "Monthly" },
              { value: 3, label: "3 Months" },
              { value: 6, label: "6 Months" },
              { value: 12, label: "Annually" }
            ].map((cycle) => (
              <button
                key={cycle.value}
                onClick={() => setBillingCycle(cycle.value as 1 | 3 | 6 | 12)}
                className={`px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                  billingCycle === cycle.value 
                    ? "bg-white text-blue-700 shadow-md" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cycle.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PRICING CARDS */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingData.map((plan) => {
            const currentClasses = selectedClasses[plan.id];
            const currentPrice = plan.prices[currentClasses as keyof typeof plan.prices][billingCycle];
            const isPopular = plan.isPopular(currentClasses, billingCycle);
            const perkText = getPerkText(billingCycle);
            const dynamicFeatures = plan.features(currentClasses);

            return (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col shadow-xl transition-all duration-300 hover:shadow-2xl bg-white ${isPopular ? 'border-2 border-blue-600 lg:-translate-y-4 z-10' : 'border border-slate-200 mt-0 lg:mt-4'}`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center shadow-md whitespace-nowrap">
                    <Zap size={14} className="mr-1 fill-yellow-400 text-yellow-400" /> Most Popular
                  </div>
                )}

                <CardHeader className={`p-8 ${plan.color} rounded-t-xl border-b border-slate-100`}>
                  <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-600 mt-2 font-medium">{plan.description}</CardDescription>
                  
                  {/* Price Display */}
                  <div className="mt-8 min-h-[80px]">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-slate-900">
                        ${currentPrice}
                      </span>
                    </div>
                    <p className="text-slate-500 mt-1 text-sm font-medium">
                      billed {billingCycle === 1 ? 'monthly' : `every ${billingCycle} months`}
                    </p>
                    {perkText && (
                      <div className="inline-block mt-3 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                        {perkText}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1 p-8">
                  {/* Classes per month selector */}
                  <div className="mb-8">
                    <p className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Classes per month</p>
                    <div className="grid grid-cols-3 gap-2">
                      {([8, 12, 16] as const).map((num) => (
                        <button
                          key={num}
                          onClick={() => handleClassChange(plan.id, num)}
                          className={`py-2 text-sm font-semibold rounded-md border transition-colors ${
                            currentClasses === num 
                              ? "bg-slate-900 border-slate-900 text-white" 
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-slate-100 mb-6" />

                  <ul className="space-y-4">
                    {dynamicFeatures.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-slate-600 text-sm">
                        <div className="bg-blue-100 p-1 rounded-full mr-3 shrink-0">
                          <Check className="h-3 w-3 text-blue-700" strokeWidth={3} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="p-8 pt-0 rounded-b-xl">
                  <Button 
                    className="w-full h-14 text-lg font-bold shadow-md" 
                    variant={isPopular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.name, plan.id)}
                  >
                    Subscribe Now
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 3. FAQ SECTION */}
      <section className="mt-24 px-4 container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <HelpCircle className="h-12 w-12 text-blue-200 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-slate-800 text-left">
              1. What is your refund policy?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              We believe in transparency. Before choosing any plan, we strongly recommend that parents and students speak with our support team (available from 5:00 PM to 10:00 PM CST) to understand the program and select the most suitable plan. Once a plan is purchased and the fee is paid, it is non-refundable. This helps us maintain structured batches and ensure quality learning for all students.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-slate-800 text-left">
              2. What happens if my child misses a class?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              If a student misses a scheduled class, we provide the class recording (if available) and offer the option to attend a make-up session, subject to availability. We understand that school activities and personal commitments come up, so we try to be as flexible as possible while maintaining the structure of small-batch learning.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold text-slate-800 text-left">
              3. How many students are there in each batch?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              We offer multiple learning formats to suit different needs. Our Standard Group Plan has a maximum of 10 students per batch, while the Premium Group Plan has a maximum of 5 students per batch for more personalized attention. For students who prefer complete individual focus, we also provide a One-on-One Private Plan with dedicated personal tutoring.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold text-slate-800 text-left">
              4. How do I know which plan is right for my child?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              If you are unsure about which plan to choose, we recommend discussing your child’s learning needs, goals, and current performance with our parent support team before enrolling. They will guide you in selecting the most suitable plan based on your child’s grade level, learning pace, and academic requirements, so you can make a confident and informed decision.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-semibold text-slate-800 text-left">
              5. How can I connect with the parent support team?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              You can easily reach our parent support team through multiple channels:
              <ul className="list-disc pl-6 mt-3 space-y-1">
                <li><strong>WhatsApp:</strong> +91 92205 17057</li>
                <li><strong>Instagram:</strong> @roedofficial</li>
                <li><strong>Email:</strong> roedinfo@gmail.com</li>
              </ul>
              <p className="mt-4">Our team is available daily from 5:00 PM to 10:00 PM IST to assist you with queries, plan selection, and general support.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

    </div>
  );
}