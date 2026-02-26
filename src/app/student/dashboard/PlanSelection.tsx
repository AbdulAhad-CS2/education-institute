"use client";

import { useState } from "react";
import { selectPlan } from "@/app/actions/student_actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface Plan {
    id: number;
    classes_per_month: number;
    price_monthly: number;
    is_popular: boolean;
    plan_groups: {
        name: string;
        max_students: number | null;
    } | null;
}

interface PlanSelectionProps {
    plans: Plan[];
}

export function PlanSelection({ plans }: PlanSelectionProps) {
    const [loading, setLoading] = useState<number | null>(null);

    const handleSelectPlan = async (planId: number) => {
        setLoading(planId);
        const result = await selectPlan(planId);
        if (result.error) {
            alert(result.error);
        }
        setLoading(null);
    };

    // Group plans by group name
    const groupedPlans: Record<string, Plan[]> = {};
    plans.forEach(plan => {
        const groupName = plan.plan_groups?.name || "Other";
        if (!groupedPlans[groupName]) groupedPlans[groupName] = [];
        groupedPlans[groupName].push(plan);
    });

    return (
        <div className="space-y-12 py-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-3xl font-bold text-zinc-900">Choose Your Learning Path</h2>
                <p className="text-zinc-500">Pick a pricing plan that fits your schedule and goals. You'll only see batches that match your selected plan.</p>
            </div>

            {Object.entries(groupedPlans).map(([groupName, groupPlans]) => (
                <div key={groupName} className="space-y-6">
                    <h3 className="text-xl font-semibold text-zinc-800 border-b pb-2">{groupName}</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {groupPlans.sort((a, b) => a.classes_per_month - b.classes_per_month).map((plan) => (
                            <Card key={plan.id} className={`flex flex-col relative ${plan.is_popular ? 'border-blue-500 shadow-md transform scale-105 z-10' : ''}`}>
                                {plan.is_popular && (
                                    <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle>{plan.classes_per_month} Classes</CardTitle>
                                    <CardDescription>per month</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-bold">${plan.price_monthly}</span>
                                        <span className="text-zinc-500">/mo</span>
                                    </div>
                                    <ul className="space-y-2 text-sm text-zinc-600">
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-500" />
                                            <span>{plan.classes_per_month} Live Classes</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-500" />
                                            <span>Personalized Learning</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Check className="h-4 w-4 text-green-500" />
                                            <span>Recorded Sessions</span>
                                        </li>
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full"
                                        variant={plan.is_popular ? "default" : "outline"}
                                        onClick={() => handleSelectPlan(plan.id)}
                                        disabled={loading !== null}
                                    >
                                        {loading === plan.id ? "Selecting..." : "Select Plan"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
