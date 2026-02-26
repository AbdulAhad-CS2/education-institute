import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Visual Side (Left on large screens) */}
            <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-[20%] -right-[20%] w-[800px] h-[800px] rounded-full bg-blue-600 blur-3xl"></div>
                    <div className="absolute top-[40%] -left-[20%] w-[600px] h-[600px] rounded-full bg-orange-600 blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                        <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                            <BookOpen className="h-6 w-6" />
                        </div>
                        EduInstitute
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <blockquote className="space-y-2">
                        <p className="text-xl">
                            &ldquo;This platform completely transformed the way I prepared for my exams. The structured content and mock tests were exactly what I needed.&rdquo;
                        </p>
                        <footer className="text-sm text-zinc-400">Allowed Smith</footer>
                    </blockquote>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900">
                <div className="w-full max-w-sm space-y-6 bg-white dark:bg-zinc-950 p-8 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
                    {children}

                    <div className="text-center text-sm text-muted-foreground mt-4">
                        <Link href="/" className="hover:text-primary underline underline-offset-4">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
