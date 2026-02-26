import { getSession } from "@/app/actions/auth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Calendar, BookOpen, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function StudentProfilePage() {
    const user = await getSession();
    if (!user) {
        redirect("/login");
    }

    const supabase = await createClient();

    // Fetch user details and enrollment stats
    const { data: enrollments } = await supabase
        .from("enrollments")
        .select(`
            id,
            enrolled_at,
            batches (
                name,
                courses (name)
            )
        `)
        .eq("user_id", user.id);

    const getInitials = (name: string) => {
        return name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || "ST";
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Card */}
                <Card className="w-full md:w-80 shrink-0">
                    <CardContent className="pt-8 flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-24 w-24">
                            <AvatarFallback className="text-2xl bg-blue-100 text-blue-700 font-bold">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-bold text-zinc-900">{user.name}</h1>
                            <p className="text-sm text-zinc-500 capitalize">{user.role}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                            Active Student
                        </Badge>

                        <div className="w-full pt-4 space-y-3 border-t text-sm">
                            <div className="flex items-center gap-3 text-zinc-600">
                                <Mail className="h-4 w-4" />
                                <span className="truncate">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-600">
                                <ShieldCheck className="h-4 w-4" />
                                <span>Verified Account</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics & Activity */}
                <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <Card className="bg-blue-600 text-white border-none overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full -mr-12 -mt-12 opacity-50 blur-xl"></div>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3 mb-2 opacity-80">
                                    <BookOpen className="h-4 w-4" />
                                    <span className="text-sm font-medium uppercase tracking-wider">Active Enrollments</span>
                                </div>
                                <div className="text-3xl font-bold">{enrollments?.length || 0}</div>
                                <p className="text-blue-100 text-xs mt-2 italic">Enrolled in {enrollments?.length || 0} batches</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Learning History</CardTitle>
                            <CardDescription>Courses and batches you have participated in</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {(!enrollments || enrollments.length === 0) ? (
                                <div className="py-8 text-center text-zinc-500">
                                    You haven't enrolled in any courses yet.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {enrollments.map((enr: any) => (
                                        <div key={enr.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-zinc-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-zinc-100 p-2 rounded-lg">
                                                    <BookOpen className="h-5 w-5 text-zinc-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-zinc-900">{(enr.batches as any)?.courses?.name}</h4>
                                                    <p className="text-xs text-zinc-500">{(enr.batches as any)?.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-zinc-400">Enrolled on</p>
                                                <p className="text-xs font-medium text-zinc-900">
                                                    {new Date(enr.enrolled_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
