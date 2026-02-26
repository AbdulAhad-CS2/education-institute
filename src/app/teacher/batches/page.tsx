import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function TeacherBatchesPage() {
    const user = await getSession();
    if (!user || user.role !== 'teacher') {
        redirect("/login");
    }

    const supabase = await createClient();

    // Fetch teacher profile
    const { data: teacher } = await supabase
        .from("teachers")
        .select("id")
        .eq("user_id", user.id)
        .single();

    if (!teacher) {
        redirect("/teacher/dashboard");
    }

    // Fetch all assigned batches with course and student count
    const { data: batches } = await supabase
        .from("batches")
        .select(`
            id,
            name,
            start_date,
            courses (name, description),
            enrollments (count),
            plans (classes_per_month, plan_groups (name))
        `)
        .eq("teacher_id", teacher.id);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">My Batches</h1>
                    <p className="text-zinc-500 mt-2">View and manage all batches currently assigned to you.</p>
                </div>
            </div>

            {(batches || []).length === 0 ? (
                <div className="bg-white border rounded-xl p-12 text-center">
                    <Users className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-zinc-900">No batches assigned</h3>
                    <p className="text-zinc-500 max-w-md mx-auto">
                        Ask the administrator to assign you to a batch to start teaching.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {batches?.map((batch: any) => (
                        <Card key={batch.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                            {batch.plans?.plan_groups?.name || 'Academic'} — {batch.plans?.classes_per_month || 0} Cls
                                        </Badge>
                                        <CardTitle className="text-xl font-bold">{batch.name}</CardTitle>
                                        <p className="text-sm text-zinc-500 font-medium">
                                            {batch.courses?.name}
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="ml-2">
                                        {batch.enrollments?.[0]?.count || 0} Students
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-sm text-zinc-600 line-clamp-2">
                                    {batch.courses?.description || 'No description provided for this course.'}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <Link href={`/teacher/batches/${batch.id}/tests`}>
                                        <Button variant="outline" className="w-full gap-2 justify-center">
                                            <FileText className="h-4 w-4" />
                                            Manage Tests
                                        </Button>
                                    </Link>
                                    <Link href={`/teacher/batches/${batch.id}`}>
                                        <Button className="w-full gap-2 justify-center">
                                            View Details
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
