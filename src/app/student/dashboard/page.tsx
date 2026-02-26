import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { PlanSelection } from "./PlanSelection";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
    const user = await getSession();
    const supabase = await createClient();

    // If no plan selected, fetch plans for selection
    if (!user?.plan_id) {
        const { data: plans } = await supabase
            .from("plans")
            .select("id, classes_per_month, price_monthly, is_popular, plan_groups(name, max_students)")
            .order("plan_group_id")
            .order("classes_per_month");

        return <PlanSelection plans={(plans as any) || []} />;
    }

    // Fetch enrolled batches
    const { data: enrollments } = await supabase
        .from("enrollments")
        .select(`
            *,
            batches (
                id,
                name,
                start_date,
                end_date,
                courses (name, description),
                teachers (name)
            )
        `)
        .eq("user_id", user.id);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">Welcome back, {user.name}! 👋</h1>
                    <p className="text-zinc-500 mt-2">Here are your active batch enrollments.</p>
                </div>
                <Link href="/student/available-batches">
                    <Button variant="outline" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Explore More Batches
                    </Button>
                </Link>
            </div>

            {(!enrollments || enrollments.length === 0) ? (
                <div className="bg-white border border-dashed rounded-xl p-12 text-center space-y-4">
                    <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                        <Calendar className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-900">No active batches</h3>
                        <p className="text-zinc-500">You haven't enrolled in any batches yet. Start your learning journey today!</p>
                    </div>
                    <Link href="/student/available-batches">
                        <Button>Browse Available Batches</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.map((enrollment: any) => (
                        <Card key={enrollment.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                        Active Enrollment
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bold leading-tight">
                                    {enrollment.batches?.courses?.name}
                                </CardTitle>
                                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                                    {enrollment.batches?.name}
                                </p>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4">
                                <div className="flex items-center text-sm text-zinc-600 gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{enrollment.batches?.teachers?.name || 'Assigned soon'}</span>
                                </div>
                                <div className="flex items-center text-sm text-zinc-600 gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Starts: {enrollment.batches?.start_date || 'TBD'}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-2">
                                <Link href={`/student/courses/${enrollment.batches?.id}`} className="w-full">
                                    <Button className="w-full" variant="secondary">
                                        Go to Portal <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
