"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTeacher } from "../actions";

type FormState = {
    success: boolean;
    error?: string;
    message?: string;
};

const initialState: FormState = {
    success: false,
};

export function TeacherForm() {
    const [state, formAction] = useActionState(createTeacher, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset();
        }
    }, [state?.success]);

    return (
        <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-4">Add New Teacher</h2>

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
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="e.g. Jane Doe" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Login Password</Label>
                    <Input id="password" name="password" type="password" placeholder="••••••••" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input id="specialization" name="specialization" placeholder="e.g. Mathematics" />
                </div>
                <Button type="submit" className="w-full">Add Teacher</Button>
            </form>
        </div>
    );
}
