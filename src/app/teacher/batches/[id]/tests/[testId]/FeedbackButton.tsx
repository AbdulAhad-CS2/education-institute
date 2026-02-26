"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, X, CheckCircle2 } from "lucide-react";
import { submitFeedback } from "@/app/actions/teacher_actions";

interface FeedbackButtonProps {
    submissionId: number;
    testId: number;
    batchId: number;
    currentFeedback?: string | null;
}

export function FeedbackButton({ submissionId, testId, batchId, currentFeedback }: FeedbackButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [state, formAction] = useActionState(submitFeedback, { success: false });

    // Handle modal close and reset if success
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button
                variant="ghost"
                onClick={() => setIsOpen(true)}
                className={`gap-2 ${currentFeedback ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'}`}
            >
                <MessageSquare className="h-4 w-4" />
                {currentFeedback ? 'Edit Feedback' : 'Add Feedback'}
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-xl font-bold text-zinc-900">
                                {currentFeedback ? 'Edit Feedback' : 'Student Feedback'}
                            </h3>
                            <button
                                onClick={handleClose}
                                className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form action={async (formData) => {
                            await formAction(formData);
                            if (!state?.error) {
                                setTimeout(handleClose, 1000);
                            }
                        }} className="p-6 space-y-4">
                            <input type="hidden" name="submission_id" value={submissionId} />
                            <input type="hidden" name="test_id" value={testId} />
                            <input type="hidden" name="batch_id" value={batchId} />

                            <div className="space-y-2">
                                <Label htmlFor="feedback" className="text-sm font-semibold text-zinc-700">
                                    Your Comments
                                </Label>
                                <Textarea
                                    id="feedback"
                                    name="feedback"
                                    defaultValue={currentFeedback || ""}
                                    placeholder="Provide detailed feedback for the student..."
                                    className="min-h-[120px] resize-none focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {state?.error && (
                                <p className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-100 italic">
                                    {state.error}
                                </p>
                            )}

                            {state?.success ? (
                                <div className="flex items-center justify-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg border border-green-100 animate-in slide-in-from-bottom-2">
                                    <CheckCircle2 className="h-5 w-5" />
                                    <span className="font-semibold text-sm">Feedback saved!</span>
                                </div>
                            ) : (
                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleClose}
                                        className="flex-1 rounded-xl h-11"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl h-11 shadow-md shadow-blue-200"
                                    >
                                        Save Feedback
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
