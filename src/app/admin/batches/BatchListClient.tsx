"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Edit2, ExternalLink } from "lucide-react";
import { BatchForm } from "./BatchForm";
import { deleteBatch } from "../actions";

interface BatchListClientProps {
    batches: any[];
    courses: any[];
    teachers: any[];
    plans: any[];
}

export function BatchListClient({ batches, courses, teachers, plans }: BatchListClientProps) {
    const [editingBatch, setEditingBatch] = useState<any | null>(null);

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {/* Form Column */}
            <div className="md:col-span-1">
                <BatchForm
                    courses={courses}
                    teachers={teachers}
                    plans={plans}
                    batch={editingBatch}
                    onCancel={() => setEditingBatch(null)}
                />
            </div>

            {/* List Column */}
            <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-gray-500">Name / Schedule</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500">Course / Teacher</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500">Zoom Link</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches?.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                        No batches found. Create one.
                                    </td>
                                </tr>
                            )}
                            {batches?.map((batch: any) => (
                                <tr key={batch.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="font-medium text-zinc-900">{batch.name}</div>
                                        <div className="text-xs text-zinc-500 mt-1">
                                            {batch.days && <span>{batch.days} • </span>}
                                            {batch.timings}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-xs font-semibold text-blue-700">{batch.courses?.name}</div>
                                        <div className="text-xs text-gray-500">{batch.teachers?.name || 'Unassigned'}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {batch.zoom_link ? (
                                            <a
                                                href={batch.zoom_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs"
                                            >
                                                <ExternalLink className="w-3 h-3" /> Join Link
                                            </a>
                                        ) : (
                                            <span className="text-gray-400 text-xs italic">Not set</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setEditingBatch(batch);
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                }}
                                                className="text-zinc-600 hover:text-blue-600"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Button>
                                            <form action={async () => { await deleteBatch(batch.id); }}>
                                                <Button
                                                    type="submit"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
