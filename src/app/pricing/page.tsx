"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X, HelpCircle, Zap } from "lucide-react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const handleSubscribe = (planName: string) => {
    // Integration Logic Placeholder
    console.log(`User selected ${planName} - ${isYearly ? 'Yearly' : 'Monthly'}`);
    alert(`Redirecting to payment for ${planName}...`);
  };

  const plans = [
    {
      name: "Foundation",
      description: "For Class 8, 9 & 10 Students",
      priceMonthly: "₹3,000",
      priceYearly: "₹30,000",
      save: "Save ₹6,000",
      features: [
        "Live Maths & Science Classes",
        "Weekly Board Pattern Tests",
        "Olympiad Preparation (NTSE)",
        "Doubt Solving (24hr response)",
        "Access to Recorded Lectures"
      ],
      missing: ["1-on-1 Mentorship", "Hardcopy Books"],
      popular: false,
      color: "bg-slate-50",
      btnVariant: "outline" as const
    },
    {
      name: "Target JEE/NEET",
      description: "For Class 11 & 12 Aspirants",
      priceMonthly: "₹6,000",
      priceYearly: "₹60,000",
      save: "Save ₹12,000",
      features: [
        "Daily Live Classes (PCM/B)",
        "All Foundation Features",
        "AITS (All India Test Series)",
        "Instant Doubt Solving App",
        "Hardcopy Modules Delivered",
        "Previous Year Q-Bank"
      ],
      missing: [],
      popular: true, // Highlights this card
      color: "bg-blue-50/50 border-blue-200",
      btnVariant: "default" as const
    },
    {
      name: "Ranker's Batch",
      description: "For Droppers & Toppers",
      priceMonthly: "₹8,000",
      priceYearly: "₹80,000",
      save: "Save ₹16,000",
      features: [
        "Everything in Target Plan",
        "Dedicated Personal Mentor",
        "Special 'Rank Booster' Sessions",
        "Direct Access to HODs",
        "Hostel Support Assistance"
      ],
      missing: [],
      popular: false,
      color: "bg-slate-50",
      btnVariant: "outline" as const
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* 1. HEADER & TOGGLE */}
      <section className="bg-slate-50 pt-20 pb-24 px-4 text-center border-b border-slate-200">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Invest in Your <span className="text-blue-600">Future</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            Transparent pricing. No hidden fees. 7-day money-back guarantee.
          </p>
          
          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 pb-5">
            <span className={`text-sm font-semibold ${!isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly Pay
            </span>
            <Switch 
              checked={isYearly} 
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className={`text-sm font-semibold ${isYearly ? 'text-slate-900' : 'text-slate-500'}`}>
              Yearly <span className="text-green-600 text-xs ml-1 font-bold">(Save 20%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. PRICING CARDS (Negative Margin to overlap header) */}
      <div className="container mx-auto px-4 -mt-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative flex flex-col shadow-xl transition-all duration-300 hover:shadow-2xl ${plan.popular ? 'border-2 border-blue-600 scale-105 z-10' : 'border border-slate-200 mt-0 md:mt-4'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center shadow-md">
                  <Zap size={14} className="mr-1 fill-yellow-400 text-yellow-400" /> Most Popular
                </div>
              )}

              <CardHeader className={`p-8 ${plan.color} rounded-t-xl`}>
                <CardTitle className="text-2xl font-bold text-slate-900">{plan.name}</CardTitle>
                <CardDescription className="text-slate-500 mt-2">{plan.description}</CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-slate-900">
                      {isYearly ? plan.priceYearly : plan.priceMonthly}
                    </span>
                    <span className="text-slate-500 ml-2 text-sm">
                      /{isYearly ? "year" : "mo"}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-green-600 text-sm font-bold mt-2 bg-green-50 inline-block px-2 py-1 rounded">
                      {plan.save}
                    </p>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 p-8 bg-white">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start text-slate-600 text-sm">
                      <div className="bg-green-100 p-1 rounded-full mr-3 shrink-0">
                        <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
                      </div>
                      {feature}
                    </li>
                  ))}
                  {/* Missing Features (Optional to show what they lose) */}
                  {plan.missing.map((missing) => (
                    <li key={missing} className="flex items-start text-slate-400 text-sm">
                       <X className="h-5 w-5 mr-3 shrink-0 text-slate-300" />
                       {missing}
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="p-8 pt-0 bg-white rounded-b-xl">
                <Button 
                  className="w-full h-12 text-lg" 
                  variant={plan.btnVariant}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {isYearly ? "Subscribe for Year" : "Subscribe Monthly"}
                </Button>
              </CardFooter>
            </Card>
          ))}
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
            <AccordionTrigger className="text-lg font-semibold text-slate-800">
              Can I switch plans later?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              Yes! You can upgrade from Foundation to Target JEE/NEET at any time. 
              We will adjust the pricing pro-rata based on your remaining duration.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-slate-800">
              Is the study material included in the fee?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              Digital study material (PDFs) is included in ALL plans. 
              Physical hardcopy books are delivered free of cost only for the <strong>Target</strong> and <strong>Ranker's</strong> plans.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold text-slate-800">
              What happens if I miss a live class?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              Don't worry. Every live class is recorded and uploaded to your Student Portal within 2 hours. 
              You can watch it anytime, at any speed (1.5x, 2x).
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold text-slate-800">
              Is there a refund policy?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              We offer a no-questions-asked <strong>7-day refund policy</strong>. 
              If you don't like the teaching style, we will refund your full amount.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

    </div>
  );
}