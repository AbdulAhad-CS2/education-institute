"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitAnswer } from "@/app/actions/teacher_actions";
import { Upload, CheckCircle2 } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";

interface SubmitAnswerFormProps {
    testId: number;
    testTitle: string;
    onSuccess?: () => void;
}

export function SubmitAnswerForm({ testId, testTitle, onSuccess }: SubmitAnswerFormProps) {
    const [state, formAction] = useActionState(submitAnswer, { success: false });
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset();
            setIsSubmitting(false);
            setFileUrl("");
            if (onSuccess) onSuccess();
        } else if (state?.error) {
            setIsSubmitting(false);
        }
    }, [state?.success, state?.error, onSuccess]);

    if (state?.success) {
        return (
            <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-center gap-3 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                <div className="text-sm font-medium">Answer submitted successfully!</div>
            </div>
        );
    }

    return (
        <form
            ref={formRef}
            action={(formData) => {
                setIsSubmitting(true);
                formAction(formData);
            }}
            className="space-y-4"
        >
            <input type="hidden" name="test_id" value={testId} />

            <div className="space-y-3">
                <Label className="text-sm font-semibold text-zinc-700">
                    Upload Your Answer (PDF/Image)
                </Label>

                <FileUpload
                    onUploadComplete={(url) => setFileUrl(url)}
                    folder={`submissions/test-${testId}`}
                    label="Select Answer File"
                />

                <input type="hidden" name="file_url" value={fileUrl} required />

                <Button
                    type="submit"
                    disabled={isSubmitting || !fileUrl}
                    className="w-full h-11 shadow-sm gap-2"
                >
                    {isSubmitting ? "Submitting..." : <><Upload className="h-4 w-4" /> Finalize Submission</>}
                </Button>

                {state?.error && (
                    <p className="text-xs text-red-600 mt-1">{state.error}</p>
                )}
            </div>
        </form>
    );
}
