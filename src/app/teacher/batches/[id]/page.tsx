import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Calendar, Clock, BookOpen, ArrowLeft, FileText, ChevronRight, Video } from "lucide-react";

export default async function TeacherBatchDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const batchId = parseInt(id);
    const user = await getSession();

    if (!user || user.role !== 'teacher') {
        redirect("/login");
    }

    const supabase = await createClient();

    // Fetch batch details, course, and enrolled students
    const { data: batch } = await supabase
        .from("batches")
        .select(`
            id,
            name,
            start_date,
            timings,
            days,
            zoom_link,
            courses (name, description),
            plans (classes_per_month, plan_groups (name)),
            enrollments (
                id,
                user_id,
                users:user_id (name, email)
            )
        `)
        .eq("id", batchId)
        .single();

    if (!batch) {
        notFound();
    }

    const students = (batch.enrollments as any[])?.map(e => e.users) || [];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header / Navigation */}
            <div className="flex flex-col gap-4">
                <Link href="/teacher/batches">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-blue-600">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Batches
                    </Button>
                </Link>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {(batch.plans as any)?.plan_groups?.name} — {(batch.plans as any)?.classes_per_month} Classes
                            </Badge>
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900">{batch.name}</h1>
                        <p className="text-xl text-zinc-500">{(batch.courses as any)?.name}</p>
                    </div>

                    <div className="flex gap-3">
                        {batch.zoom_link && (
                            <a href={batch.zoom_link} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                                    <Video className="h-4 w-4" />
                                    Join Class
                                </Button>
                            </a>
                        )}
                        <Link href={`/teacher/batches/${batchId}/tests`}>
                            <Button className="gap-2">
                                <FileText className="h-4 w-4" />
                                Manage Tests
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Details & Students */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Course Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-zinc-600 leading-relaxed">
                                {(batch.courses as any)?.description || "No description provided for this course."}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Enrolled Students */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Enrolled Students
                            </h2>
                            <Badge variant="secondary">{students.length} Total</Badge>
                        </div>

                        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                            {students.length === 0 ? (
                                <div className="p-12 text-center text-zinc-500">
                                    No students have enrolled in this batch yet.
                                </div>
                            ) : (
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-zinc-50 text-zinc-500 uppercase text-xs font-semibold border-b">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold">Student Name</th>
                                            <th className="px-6 py-4 font-semibold">Email Address</th>
                                            <th className="px-6 py-4 text-right font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {students.map((student: any, idx: number) => (
                                            <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-zinc-900">{student?.name}</div>
                                                </td>
                                                <td className="px-6 py-4 text-zinc-500">
                                                    {student?.email}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="sm" className="text-blue-600">
                                                        Profile
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Schedule & Stats */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-3 border-b bg-zinc-50/50">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-600" />
                                Batch Schedule
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-zinc-400 shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">Schedule</p>
                                    <p className="text-sm text-zinc-600">
                                        {batch.days || 'Days TBA'} — {batch.timings || 'Timings TBA'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-zinc-400 shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 uppercase tracking-wide">Start Date</p>
                                    <p className="text-sm text-zinc-600">{batch.start_date ? new Date(batch.start_date).toLocaleDateString() : 'To be announced'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-900 border-none text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl"></div>
                        <CardHeader>
                            <CardTitle className="text-blue-100 flex items-center gap-2 text-sm font-medium uppercase tracking-wider">
                                <BookOpen className="h-4 w-4" />
                                Course Mastery
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-3xl font-bold">12 / 16</div>
                            <p className="text-blue-200 text-sm">Classes completed in this monthly cycle.</p>
                            <div className="w-full bg-blue-800 rounded-full h-2">
                                <div className="bg-white h-2 rounded-full w-[75%] shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
