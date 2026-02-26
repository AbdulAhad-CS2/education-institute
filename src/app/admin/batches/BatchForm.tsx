"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBatch, updateBatch } from "../actions";

type FormState = {
    success: boolean;
    error?: string;
    message?: string;
};

const initialState: FormState = {
    success: false,
};

interface BatchFormProps {
    courses: Array<{ id: number; name: string }>;
    teachers: Array<{ id: number; name: string }>;
    plans: Array<{
        id: number;
        classes_per_month: number;
        price_monthly: number;
        is_popular: boolean;
        plan_groups: { name: string; max_students: number | null } | null;
    }>;
    batch?: any; // For editing mode
    onCancel?: () => void;
}

export function BatchForm({ courses, teachers, plans, batch, onCancel }: BatchFormProps) {
    const isEditing = !!batch;
    const [state, formAction] = useActionState(isEditing ? updateBatch : createBatch, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success && !isEditing) {
            formRef.current?.reset();
        }
    }, [state?.success, isEditing]);

    const selectCls =
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    // Group plans by plan group name for the <optgroup>
    const plansByGroup: Record<string, typeof plans> = {};
    for (const plan of plans) {
        const groupName = plan.plan_groups?.name ?? "Other";
        if (!plansByGroup[groupName]) plansByGroup[groupName] = [];
        plansByGroup[groupName].push(plan);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">{isEditing ? "Edit Batch" : "Create New Batch"}</h2>
                {isEditing && (
                    <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
                )}
            </div>

            {state?.success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
                    ✓ {state.message}
                </div>
            )}

            {state?.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
                    ✗ {state.error}
                </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-4">
                {isEditing && <input type="hidden" name="id" value={batch.id} />}

                <div className="space-y-2">
                    <Label htmlFor="name">Batch Name</Label>
                    <Input id="name" name="name" defaultValue={batch?.name} placeholder="e.g. Batch A - 2024" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="course_id">Course</Label>
                    <select id="course_id" name="course_id" defaultValue={batch?.course_id || ""} className={selectCls} required>
                        <option value="">Select a Course</option>
                        {courses?.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="timings">Timings</Label>
                        <Input id="timings" name="timings" defaultValue={batch?.timings} placeholder="e.g. 6:00 PM - 7:30 PM" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="days">Days</Label>
                        <Input id="days" name="days" defaultValue={batch?.days} placeholder="e.g. Mon, Wed, Fri" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="zoom_link">Zoom Meeting Link</Label>
                    <Input id="zoom_link" name="zoom_link" defaultValue={batch?.zoom_link} placeholder="https://zoom.us/j/..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="plan_id">Pricing Plan</Label>
                    <select id="plan_id" name="plan_id" defaultValue={batch?.plan_id || ""} className={selectCls}>
                        <option value="">No Plan (Optional)</option>
                        {Object.entries(plansByGroup).map(([groupName, groupPlans]) => (
                            <optgroup key={groupName} label={groupName}>
                                {groupPlans.map((plan) => (
                                    <option key={plan.id} value={plan.id}>
                                        {plan.classes_per_month} classes/mo — ${plan.price_monthly}/mo
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="teacher_id">Assign Teacher</Label>
                    <select id="teacher_id" name="teacher_id" defaultValue={batch?.teacher_id || ""} className={selectCls}>
                        <option value="">Select a Teacher (Optional)</option>
                        {teachers?.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input id="start_date" name="start_date" type="date" defaultValue={batch?.start_date} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end_date">End Date</Label>
                        <Input id="end_date" name="end_date" type="date" defaultValue={batch?.end_date} />
                    </div>
                </div>

                <Button type="submit" className="w-full">
                    {isEditing ? "Update Batch" : "Create Batch"}
                </Button>
            </form>
        </div>
    );
}
