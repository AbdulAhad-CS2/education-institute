import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, User, Calendar, ExternalLink, FileText, Download, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { FeedbackButton } from "./FeedbackButton";

export default async function TestSubmissionsPage({ params }: { params: Promise<{ id: string, testId: string }> }) {
    const { id, testId: testIdStr } = await params;
    const batchId = parseInt(id);
    const testId = parseInt(testIdStr);

    const user = await getSession();
    if (!user || user.role !== 'teacher') {
        redirect("/login");
    }

    const supabase = await createClient();

    // Fetch test details and its submissions
    const { data: test } = await supabase
        .from("tests")
        .select(`
            id,
            title,
            description,
            batches (name, courses (name)),
            test_submissions (
                id,
                file_url,
                submitted_at,
                feedback,
                users:student_id (name, email)
            )
        `)
        .eq("id", testId)
        .single();

    if (!test) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Navigation */}
            <div className="flex items-center gap-2">
                <Link href={`/teacher/batches/${batchId}/tests`}>
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-blue-600">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Batch Tests
                    </Button>
                </Link>
            </div>

            {/* Header */}
            <div className="bg-white border rounded-xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                            <span>{(test.batches as any)?.courses?.name}</span>
                            <span className="text-zinc-300">•</span>
                            <span>{(test.batches as any)?.name}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900">{test.title}</h1>
                        <p className="text-zinc-600 max-w-2xl">{test.description || "No description provided."}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center min-w-[140px]">
                        <div className="text-2xl font-bold text-blue-700">
                            {test.test_submissions?.length || 0}
                        </div>
                        <div className="text-xs text-blue-600 font-medium uppercase tracking-wider">Submissions</div>
                    </div>
                </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-zinc-900">Student Submissions</h2>

                {(!test.test_submissions || test.test_submissions.length === 0) ? (
                    <div className="bg-white border border-dashed rounded-xl p-16 text-center space-y-4">
                        <div className="bg-zinc-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-zinc-400">
                            <FileText className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-zinc-600 font-medium">No submissions yet</p>
                            <p className="text-zinc-500 text-sm">Students haven't uploaded their answers for this test.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {(test.test_submissions as any[]).map((submission) => (
                            <Card key={submission.id} className="hover:shadow-md transition-shadow hover:border-blue-200">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-zinc-100 h-12 w-12 rounded-full flex items-center justify-center text-zinc-600 font-bold uppercase">
                                                {submission.users?.name?.charAt(0) || 'S'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-zinc-900">{submission.users?.name}</h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-sm text-zinc-500">{submission.users?.email}</span>
                                                    <span className="text-zinc-300 text-sm">•</span>
                                                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                        Submitted {new Date(submission.submitted_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                {submission.feedback && (
                                                    <div className="mt-2 p-3 bg-green-50 border border-green-100 rounded-lg">
                                                        <p className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">Teacher Feedback</p>
                                                        <p className="text-sm text-green-700 italic">"{submission.feedback}"</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <a href={submission.file_url} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" className="gap-2">
                                                    <ExternalLink className="h-4 w-4" />
                                                    View Answer
                                                </Button>
                                            </a>
                                            <FeedbackButton
                                                submissionId={submission.id}
                                                testId={testId}
                                                batchId={batchId}
                                                currentFeedback={submission.feedback}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
