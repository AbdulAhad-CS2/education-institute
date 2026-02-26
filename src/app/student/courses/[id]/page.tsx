import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Video, Calendar, Clock, User, ArrowLeft, ExternalLink, FileText, Download, CheckCircle } from "lucide-react";
import { SubmitAnswerForm } from "./SubmitAnswerForm";

export default async function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const batchId = parseInt(id);
    const user = await getSession();
    if (!user) {
        redirect("/login");
    }

    const supabase = await createClient();

    // Fetch batch details, course, teacher, and tests
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
            teachers (name),
            tests (
                id,
                title,
                description,
                file_url,
                created_at,
                test_submissions (id, submitted_at, student_id)
            )
        `)
        .eq("id", batchId)
        .single();

    if (!batch) {
        notFound();
    }

    // Check if the current student is enrolled in this batch
    const { data: enrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("batch_id", batchId)
        .eq("user_id", user.id)
        .single();

    if (!enrollment && user.role === 'student') {
        return (
            <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
                <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
                <p className="text-zinc-500">You are not enrolled in this batch.</p>
                <Link href="/student/dashboard">
                    <Button>Back to Dashboard</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Navigation */}
            <Link href={user.role === 'admin' ? "/admin" : user.role === 'teacher' ? "/teacher/dashboard" : "/student/dashboard"}>
                <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-blue-600">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Button>
            </Link>

            {/* Header */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">{(batch.courses as any)?.name}</h1>
                        <p className="text-xl text-zinc-500 mt-2 flex items-center gap-2">
                            <User className="h-5 w-5" /> Taught by <span className="text-zinc-900 font-medium">{(batch.teachers as any)?.name || 'TBA'}</span>
                        </p>
                    </div>
                    <Badge className="w-fit text-lg px-4 py-1 bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-none">
                        {batch.name}
                    </Badge>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                    {/* Course About */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About this Course</CardTitle>
                        </CardHeader>
                        <CardContent className="text-zinc-600 leading-relaxed">
                            {(batch.courses as any)?.description || "No course description available."}
                        </CardContent>
                    </Card>

                    {/* Tests & Materials Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            Tests & Materials
                        </h2>

                        {(!batch.tests || batch.tests.length === 0) ? (
                            <div className="bg-zinc-50 border border-dashed rounded-xl p-8 text-center text-zinc-500">
                                No tests or materials uploaded yet.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {batch.tests.map((test: any) => {
                                    const studentSubmission = test.test_submissions?.find((s: any) => s.student_id === user.id) || null;

                                    return (
                                        <Card key={test.id} className="overflow-hidden border-zinc-200">
                                            <CardHeader className="bg-zinc-50/50 pb-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg">{test.title}</CardTitle>
                                                        <CardDescription className="mt-1">
                                                            Posted on {new Date(test.created_at).toLocaleDateString()}
                                                        </CardDescription>
                                                    </div>
                                                    <a href={test.file_url} target="_blank" rel="noopener noreferrer">
                                                        <Button variant="outline" size="sm" className="gap-2 bg-white">
                                                            <Download className="h-4 w-4" /> Download
                                                        </Button>
                                                    </a>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="pt-4 space-y-4">
                                                {test.description && (
                                                    <p className="text-sm text-zinc-600 mb-4">{test.description}</p>
                                                )}

                                                {/* Submission Logic */}
                                                {user.role === 'student' && (
                                                    <div className="pt-4 border-t">
                                                        <SubmitAnswerForm testId={test.id} testTitle={test.title} />
                                                    </div>
                                                )}

                                                {user.role === 'teacher' && (
                                                    <div className="pt-2 text-sm text-blue-600 font-medium">
                                                        {test.test_submissions?.length || 0} student(s) have submitted.
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="border-blue-100 shadow-lg shadow-blue-900/5 overflow-hidden">
                        <div className="h-2 bg-blue-600 w-full"></div>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Video className="h-5 w-5 text-blue-600" />
                                Live Class
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 font-medium text-center">
                                Next Class: {batch.days || 'TBA'} at {batch.timings || 'TBA'}
                            </div>
                            {batch.zoom_link ? (
                                <a href={batch.zoom_link} target="_blank" rel="noopener noreferrer">
                                    <Button className="w-full h-12 text-lg font-semibold shadow-md shadow-blue-500/20">
                                        Join Session <ExternalLink className="ml-2 h-4 w-4" />
                                    </Button>
                                </a>
                            ) : (
                                <Button disabled className="w-full h-12 text-lg font-semibold opacity-50">
                                    Link not set <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                            <p className="text-xs text-center text-zinc-400">
                                Recorded sessions will be available after the class.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Batch Schedule</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-zinc-600">
                                <Calendar className="h-4 w-4" />
                                <span>{batch.days || 'Days not set'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-600">
                                <Clock className="h-4 w-4" />
                                <span>{batch.timings || 'Timing not set'}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
