import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { AvailableBatchesList } from "./AvailableBatchesList";
import { redirect } from "next/navigation";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AvailableBatchesPage() {
    const user = await getSession();
    if (!user || user.role !== 'student') {
        redirect("/login");
    }

    if (!user.plan_id) {
        redirect("/student/dashboard"); // Prompt plan selection on dashboard
    }

    const supabase = await createClient();

    // Fetch batches matching the student's plan
    const { data: batches } = await supabase
        .from("batches")
        .select(`
            id,
            name,
            start_date,
            courses (name, description),
            teachers (name)
        `)
        .eq("plan_id", user.plan_id);

    // Fetch student's existing enrollments to check if they are already in a batch
    const { data: enrollments } = await supabase
        .from("enrollments")
        .select("batch_id")
        .eq("user_id", user.id);

    const enrolledBatchIds = enrollments?.map(e => e.batch_id) || [];

    // Fetch student's plan details for the header
    const { data: plan } = await supabase
        .from("plans")
        .select("classes_per_month, plan_groups(name)")
        .eq("id", user.plan_id)
        .single();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">Available Batches</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-zinc-500">Filtered by your plan:</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {(plan as any)?.plan_groups?.name} — {plan?.classes_per_month} Classes/mo
                        </span>
                    </div>
                </div>
                <Link href={user.role === 'admin' ? "/admin" : user.role === 'teacher' ? "/teacher/dashboard" : "/student/dashboard"}>
                    <Button variant="ghost">Back to Dashboard</Button>
                </Link>
            </div>

            {(!batches || batches.length === 0) ? (
                <div className="bg-white border rounded-xl p-12 text-center space-y-4">
                    <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                        <BookOpen className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-900">No batches available yet</h3>
                        <p className="text-zinc-500 max-w-md mx-auto">
                            We don't have any active batches for your plan at the moment. Please check back later or contact support.
                        </p>
                    </div>
                </div>
            ) : (
                <AvailableBatchesList
                    batches={batches as any}
                    enrolledBatchIds={enrolledBatchIds}
                />
            )}
        </div>
    );
}
