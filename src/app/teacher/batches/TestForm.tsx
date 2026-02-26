"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadTest } from "@/app/actions/teacher_actions";
import { FileUpload } from "@/components/FileUpload";

interface TestFormProps {
    batchId: number;
}

export function TestForm({ batchId }: TestFormProps) {
    const [state, formAction] = useActionState(uploadTest, { success: false });
    const formRef = useRef<HTMLFormElement>(null);
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset();
            setFileUrl("");
        }
    }, [state?.success]);

    return (
        <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 mb-4">Create New Test / Assignment</h2>

            {state?.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm">
                    {state.error}
                </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-4">
                <input type="hidden" name="batch_id" value={batchId} />

                <div className="space-y-2">
                    <Label htmlFor="title">Test Title</Label>
                    <Input id="title" name="title" placeholder="e.g. Mid-term Assessment" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Instructions / Description</Label>
                    <Textarea id="description" name="description" placeholder="Provide instructions for the students..." rows={3} />
                </div>

                <div className="space-y-2">
                    <Label>Test Material (PDF/Word/Image)</Label>
                    <FileUpload
                        onUploadComplete={(url) => setFileUrl(url)}
                        folder={`tests/${batchId}`}
                        label="Upload Test/Assignment PDF"
                    />
                    <input type="hidden" name="file_url" value={fileUrl} required />
                    {!fileUrl && <p className="text-[10px] text-zinc-500">Please upload a file to continue.</p>}
                </div>

                <Button type="submit" className="w-full">Upload Test</Button>
            </form>
        </div>
    );
}
