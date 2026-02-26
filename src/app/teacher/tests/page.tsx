import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, Calendar, ArrowRight, ClipboardList } from "lucide-react";
import Link from "next/link";

export default async function TeacherTestsGeneralPage() {
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

    // Fetch all tests for all batches belonging to this teacher
    const { data: tests } = await supabase
        .from("tests")
        .select(`
            id,
            title,
            description,
            created_at,
            batch_id,
            batches (name, course_id, courses (name)),
            test_submissions (count)
        `)
        .eq("teacher_id", teacher.id)
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900">Tests & Submissions</h1>
                <p className="text-zinc-500 mt-2">Manage all your assignments and review student submissions across all batches.</p>
            </div>

            {(!tests || tests.length === 0) ? (
                <div className="bg-white border border-dashed rounded-xl p-16 text-center space-y-4">
                    <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                        <ClipboardList className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-900">No tests created yet</h3>
                        <p className="text-zinc-500 max-w-sm mx-auto mt-2">
                            Go to a specific batch to upload your first test or assignment for students.
                        </p>
                        <Link href="/teacher/batches">
                            <Button className="mt-6">Go to Batches</Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {tests.map((test: any) => (
                        <Card key={test.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-zinc-900">{test.title}</h3>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
                                                <span className="font-medium text-zinc-700">{test.batches?.courses?.name}</span>
                                                <span className="text-zinc-300">•</span>
                                                <span>{test.batches?.name}</span>
                                                <span className="text-zinc-300">•</span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(test.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <div className="text-right sm:text-center px-4">
                                            <div className="text-xl font-bold text-zinc-900">{test.test_submissions?.[0]?.count || 0}</div>
                                            <div className="text-[10px] text-zinc-500 uppercase font-semibold">Submissions</div>
                                        </div>
                                        <Link href={`/teacher/batches/${test.batch_id}/tests/${test.id}`}>
                                            <Button variant="outline" size="sm" className="gap-2 group">
                                                Review
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
