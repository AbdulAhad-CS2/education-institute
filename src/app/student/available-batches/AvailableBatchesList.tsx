"use client";

import { useState } from "react";
import { enrollInBatch } from "@/app/actions/student_actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Plus } from "lucide-react";

interface Batch {
    id: number;
    name: string;
    start_date: string | null;
    courses: { name: string; description: string | null } | null;
    teachers: { name: string } | null;
}

interface EnrollmentListProps {
    batches: Batch[];
    enrolledBatchIds: number[];
}

export function AvailableBatchesList({ batches, enrolledBatchIds }: EnrollmentListProps) {
    const [loading, setLoading] = useState<number | null>(null);

    const handleEnroll = async (batchId: number) => {
        setLoading(batchId);
        const result = await enrollInBatch(batchId);
        if (result.error) {
            alert(result.error);
        } else {
            alert("Enrolled successfully!");
        }
        setLoading(null);
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => {
                const isEnrolled = enrolledBatchIds.includes(batch.id);
                return (
                    <Card key={batch.id} className="flex flex-col hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                    Available
                                </Badge>
                            </div>
                            <CardTitle className="text-xl font-bold">{batch.courses?.name}</CardTitle>
                            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                                {batch.name}
                            </p>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <p className="text-sm text-zinc-600 line-clamp-2">
                                {batch.courses?.description || 'Learn advanced concepts with expert guidance.'}
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-zinc-600 gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{batch.teachers?.name || 'TBA'}</span>
                                </div>
                                <div className="flex items-center text-sm text-zinc-600 gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Starts: {batch.start_date || 'Coming Soon'}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            {isEnrolled ? (
                                <Button className="w-full" variant="ghost" disabled>
                                    Already Enrolled
                                </Button>
                            ) : (
                                <Button
                                    className="w-full gap-2"
                                    onClick={() => handleEnroll(batch.id)}
                                    disabled={loading !== null}
                                >
                                    {loading === batch.id ? "Enrolling..." : <><Plus className="h-4 w-4" /> Enroll Now</>}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
