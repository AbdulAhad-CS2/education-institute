import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, ClipboardList, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function TeacherDashboard() {
    const user = await getSession();
    if (!user || user.role !== 'teacher') {
        redirect("/login");
    }

    const supabase = await createClient();

    // Fetch teacher profile to get teacher_id
    const { data: teacher } = await supabase
        .from("teachers")
        .select("id")
        .eq("user_id", user.id)
        .single();

    if (!teacher) {
        return (
            <div className="p-8 text-center bg-white rounded-xl border border-dashed">
                <h2 className="text-xl font-bold text-red-600">Teacher Profile Not Found</h2>
                <p className="text-zinc-500 mt-2">Please contact the admin to link your user account to a teacher profile.</p>
            </div>
        );
    }

    // Fetch batches assigned to this teacher
    const { data: batches } = await supabase
        .from("batches")
        .select(`
            id,
            name,
            courses (name),
            enrollments (count)
        `)
        .eq("teacher_id", teacher.id);

    const totalBatches = batches?.length || 0;
    const totalStudents = batches?.reduce((acc, batch) => acc + (batch.enrollments?.[0]?.count || 0), 0) || 0;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900">Welcome, {user.name}! 📚</h1>
                <p className="text-zinc-500 mt-2">Manage your batches, upload tests, and review student submissions.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Assigned Batches</CardTitle>
                        <BookOpen className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalBatches}</div>
                        <p className="text-xs text-zinc-500 mt-1">Active learning sessions</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalStudents}</div>
                        <p className="text-xs text-zinc-500 mt-1">Across all assigned batches</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Tests Conducted</CardTitle>
                        <ClipboardList className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-zinc-500 mt-1">Pending implementation of test tracking</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Active Batches List */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-zinc-900">Your Active Batches</h2>
                        <Link href="/teacher/batches" className="text-sm text-blue-600 hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="bg-white rounded-xl border overflow-hidden">
                        {(batches || []).length === 0 ? (
                            <div className="p-8 text-center text-zinc-500">
                                No batches assigned yet.
                            </div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Batch / Course</th>
                                        <th className="px-6 py-4">Students</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {batches?.map((batch: any) => (
                                        <tr key={batch.id} className="hover:bg-zinc-50">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-zinc-900">{batch.name}</div>
                                                <div className="text-xs text-zinc-500">{batch.courses?.name}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                                    {batch.enrollments?.[0]?.count || 0} enrolled
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/teacher/batches/${batch.id}`}>
                                                    <Button variant="ghost" size="sm" className="text-blue-600">
                                                        Manage
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Recent Submissions Placeholder */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-zinc-900">Recent Test Submissions</h2>
                    <div className="bg-white rounded-xl border p-12 text-center space-y-4">
                        <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                            <TrendingUp className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-zinc-600 font-medium">No recent submissions</p>
                            <p className="text-zinc-500 text-sm">Once students start submitting answers, they'll appear here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
