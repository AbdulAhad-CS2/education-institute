import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { approveTest, rejectTest } from "@/app/actions/teacher_actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Check, X, Download, User, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function AdminTestsPage() {
    const user = await getSession();
    if (!user || user.role !== 'admin') {
        redirect("/login");
    }

    const supabase = await createClient();

    // Fetch all pending tests with batch and teacher info
    const { data: pendingTests } = await supabase
        .from("tests")
        .select(`
            id,
            title,
            description,
            file_url,
            created_at,
            is_approved,
            batches (name, courses (name)),
            teachers (name)
        `)
        .eq("is_approved", false)
        .order("created_at", { ascending: false });

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900">Test Approvals</h1>
                    <p className="text-zinc-500 mt-1">Review and approve tests uploaded by teachers.</p>
                </div>
            </div>

            {(!pendingTests || pendingTests.length === 0) ? (
                <Card className="border-dashed flex flex-col items-center justify-center p-12 text-center text-zinc-500">
                    <Check className="h-12 w-12 text-green-500 mb-4 opacity-20" />
                    <p className="text-lg font-medium">All caught up!</p>
                    <p className="text-sm">No tests are pending approval at the moment.</p>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {pendingTests.map((test: any) => (
                        <Card key={test.id} className="overflow-hidden border-zinc-200">
                            <CardHeader className="bg-zinc-50/50 pb-4">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div className="flex gap-4">
                                        <div className="bg-blue-100 p-3 rounded-lg text-blue-600 h-fit">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{test.title}</CardTitle>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-zinc-500">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-3 w-3" /> {test.teachers?.name}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BookOpen className="h-3 w-3" /> {(test.batches?.courses as any)?.name} - {test.batches?.name}
                                                </div>
                                                <div>Uploaded: {new Date(test.created_at).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a href={test.file_url} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm" className="gap-2 bg-white">
                                                <Download className="h-4 w-4" /> Download
                                            </Button>
                                        </a>
                                        <form action={async () => { "use server"; await approveTest(test.id); }}>
                                            <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                                                <Check className="h-4 w-4" /> Approve
                                            </Button>
                                        </form>
                                        <form action={async () => { "use server"; await rejectTest(test.id); }}>
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                <X className="h-4 w-4" /> Reject
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <p className="text-zinc-600 text-sm">{test.description || "No description provided."}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
