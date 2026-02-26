"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, X, Loader2 } from "lucide-react";

interface FileUploadProps {
    onUploadComplete: (url: string) => void;
    folder?: string;
    label?: string;
}

export function FileUpload({ onUploadComplete, folder = "tests", label = "Upload PDF" }: FileUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const supabase = createClient();
            const file = event.target.files?.[0];

            if (!file) return;

            // Simple validation
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert("File is too large. Max 5MB allowed.");
                return;
            }

            const fileExt = file.name.split('.').pop();
            const filePath = `${folder}/${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from('assignments')
                .upload(filePath, file);

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('assignments')
                .getPublicUrl(filePath);

            setFileName(file.name);
            setFileUrl(publicUrl);
            onUploadComplete(publicUrl);

        } catch (error: any) {
            alert(error.message || "Error uploading file");
        } finally {
            setUploading(false);
        }
    };

    const clearFile = () => {
        setFileName(null);
        setFileUrl(null);
        onUploadComplete("");
    };

    return (
        <div className="space-y-3">
            {!fileUrl ? (
                <div className="flex items-center gap-4">
                    <label className="flex-1">
                        <div className="border-2 border-dashed border-zinc-200 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all group">
                            <div className="flex items-center justify-center gap-3">
                                {uploading ? (
                                    <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                                ) : (
                                    <Upload className="h-5 w-5 text-zinc-400 group-hover:text-blue-600" />
                                )}
                                <span className="text-sm font-medium text-zinc-600 group-hover:text-blue-700">
                                    {uploading ? "Uploading..." : label}
                                </span>
                            </div>
                            <Input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={handleUpload}
                                disabled={uploading}
                            />
                        </div>
                    </label>
                </div>
            ) : (
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                        <span className="text-sm font-medium text-blue-900 truncate">{fileName}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={clearFile} className="text-blue-600 hover:text-blue-700 hover:bg-blue-100">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
            <p className="text-[10px] text-zinc-500">PDF, Word Document or Image (Max 5MB)</p>
        </div>
    );
}
