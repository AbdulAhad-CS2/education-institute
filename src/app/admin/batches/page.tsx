import { createClient } from "@/utils/supabase/server";
import { BatchListClient } from "./BatchListClient";

export default async function BatchesPage() {
    const supabase = await createClient();
    const { data: batches } = await supabase
        .from("batches")
        .select(`
            *,
            courses (name),
            teachers (name),
            plans (
                classes_per_month,
                price_monthly,
                plan_groups (name)
            )
        `)
        .order('id');

    const { data: courses } = await supabase.from("courses").select("id, name");
    const { data: teachers } = await supabase.from("teachers").select("id, name");
    const { data: plans } = await supabase
        .from("plans")
        .select("id, classes_per_month, price_monthly, is_popular, plan_groups(name, max_students)")
        .order("plan_group_id")
        .order("classes_per_month");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-900">Batches</h1>
            </div>

            <BatchListClient
                batches={batches || []}
                courses={courses || []}
                teachers={teachers || []}
                plans={(plans as any) || []}
            />
        </div>
    );
}
