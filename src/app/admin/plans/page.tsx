import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { deletePlan } from "../actions";
import { X } from "lucide-react";
import { PlanForm } from "./PlanForm";

export default async function PlansPage() {
    const supabase = await createClient();

    const { data: planGroups } = await supabase
        .from("plan_groups")
        .select("id, name, max_students")
        .order("id");

    const { data: plans } = await supabase
        .from("plans")
        .select(`
            *,
            plan_groups (name, max_students)
        `)
        .order("plan_group_id")
        .order("classes_per_month");

    // Group plans by plan_group name for display
    const grouped: Record<string, any[]> = {};
    for (const plan of plans ?? []) {
        const groupName = plan.plan_groups?.name ?? "Unknown";
        if (!grouped[groupName]) grouped[groupName] = [];
        grouped[groupName].push(plan);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-900">Plans & Pricing</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Create Plan Form */}
                <div className="md:col-span-1">
                    <PlanForm planGroups={planGroups ?? []} />
                </div>

                {/* Plans List grouped by plan group */}
                <div className="md:col-span-2 space-y-6">
                    {Object.entries(grouped).map(([groupName, groupPlans]) => {
                        const maxStudents = groupPlans[0]?.plan_groups?.max_students;
                        return (
                            <div key={groupName} className="bg-white rounded-lg shadow border overflow-hidden">
                                <div className="px-4 py-3 bg-blue-50 border-b">
                                    <h2 className="font-semibold text-blue-900">
                                        {groupName}
                                        {maxStudents && (
                                            <span className="ml-2 text-xs font-normal text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                                Max {maxStudents} Students
                                            </span>
                                        )}
                                    </h2>
                                </div>
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium text-gray-500">Classes/mo</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-500">Monthly</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-500">12 Months</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-500">6 Months</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-500">3 Months</th>
                                            <th className="px-4 py-2 text-right font-medium text-gray-500"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupPlans.map((plan: any) => (
                                            <tr key={plan.id} className="border-b last:border-0 hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium">
                                                    {plan.classes_per_month} classes
                                                    {plan.is_popular && (
                                                        <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">
                                                            Most Popular
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">${plan.price_monthly}</td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    ${plan.price_12months}
                                                    <span className="text-xs text-green-600 block">+{plan.free_classes_12months ?? 16} free</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    ${plan.price_6months}
                                                    <span className="text-xs text-green-600 block">+{plan.free_classes_6months ?? 4} free</span>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700">
                                                    ${plan.price_3months}
                                                    <span className="text-xs text-green-600 block">+{plan.free_classes_3months ?? 1} free</span>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <form action={async () => { "use server"; await deletePlan(plan.id); }}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon-sm"
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))}
                                        {groupPlans.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                                                    No plans in this group yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}

                    {Object.keys(grouped).length === 0 && (
                        <div className="bg-white rounded-lg shadow border p-8 text-center text-gray-400">
                            No plans found. Run <code className="bg-gray-100 px-1 rounded">plans_schema.sql</code> in Supabase to seed plans, or create one manually.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
