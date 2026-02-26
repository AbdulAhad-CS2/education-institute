import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TestForm } from "../../TestForm";
import { deleteTest } from "@/app/actions/teacher_actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Trash2, Users, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function ManageTestsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const batchId = parseInt(id);
    const user = await getSession();
    if (!user || user.role !== 'teacher') {
        redirect("/login");
    }

    const supabase = await createClient();

    // Fetch batch details and existing tests
    const { data: batch } = await supabase
        .from("batches")
        .select(`
            name,
            courses (name),
            tests (
                id,
                title,
                description,
                file_url,
                created_at,
                test_submissions (count)
            )
        `)
        .eq("id", batchId)
        .single();

    if (!batch) {
        redirect("/teacher/batches");
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Link href="/teacher/batches" className="text-sm text-zinc-500 hover:text-blue-600">My Batches</Link>
                        <span className="text-zinc-400 text-sm">/</span>
                        <span className="text-sm font-medium text-zinc-900">{batch.name}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900">Manage Tests</h1>
                    <p className="text-zinc-500 mt-1">Upload materials and view student submissions for {(batch.courses as any)?.name}.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Upload Section */}
                <div className="lg:col-span-1">
                    <TestForm batchId={batchId} />
                </div>

                {/* Existing Tests Section */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-zinc-900">Assigned Tests & Materials</h2>

                    {(!batch.tests || batch.tests.length === 0) ? (
                        <div className="bg-white border border-dashed rounded-xl p-12 text-center text-zinc-500">
                            No tests uploaded for this batch yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {batch.tests.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((test: any) => (
                                <div key={test.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <div className="bg-blue-50 p-3 rounded-lg text-blue-600 h-fit">
                                                <FileText className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="font-bold text-zinc-900 leading-tight">{test.title}</h3>
                                                <p className="text-sm text-zinc-500 line-clamp-2 max-w-md">{test.description || 'No instructions provided.'}</p>
                                                <div className="flex items-center gap-3 mt-3">
                                                    <Badge variant="secondary" className="flex gap-1 items-center px-2">
                                                        <Users className="h-3 w-3" />
                                                        {test.test_submissions?.[0]?.count || 0} Submissions
                                                    </Badge>
                                                    <span className="text-xs text-zinc-400">
                                                        Added: {new Date(test.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <a href={test.file_url} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <ExternalLink className="h-4 w-4" />
                                                    View File
                                                </Button>
                                            </a>
                                            <form action={async () => { "use server"; await deleteTest(test.id, batchId); }}>
                                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Link to View Submissions */}
                                    <div className="mt-6 pt-4 border-t flex justify-end">
                                        <Link href={`/teacher/batches/${batchId}/tests/${test.id}`}>
                                            <Button variant="secondary" size="sm" className="text-xs">
                                                Review Submissions
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
