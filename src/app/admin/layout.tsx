import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, BookOpen, Users, Calendar, DollarSign, FileCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { getSession, logout } from "@/app/actions/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getSession();

    if (!user || user.role !== 'admin') {
        redirect("/login");
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-blue-900">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/courses">
                        <Button variant="ghost" className="w-full justify-start">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Courses
                        </Button>
                    </Link>
                    <Link href="/admin/teachers">
                        <Button variant="ghost" className="w-full justify-start">
                            <Users className="mr-2 h-4 w-4" />
                            Teachers
                        </Button>
                    </Link>
                    <Link href="/admin/batches">
                        <Button variant="ghost" className="w-full justify-start">
                            <Calendar className="mr-2 h-4 w-4" />
                            Batches
                        </Button>
                    </Link>
                    <Link href="/admin/tests">
                        <Button variant="ghost" className="w-full justify-start">
                            <FileCheck className="mr-2 h-4 w-4" />
                            Test Approvals
                        </Button>
                    </Link>
                    <Link href="/admin/plans">
                        <Button variant="ghost" className="w-full justify-start">
                            <DollarSign className="mr-2 h-4 w-4" />
                            Plans & Pricing
                        </Button>
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <div className="text-sm text-gray-500">
                        Logged in as: {user.email}
                    </div>
                    <form action={logout}>
                        <Button variant="outline" className="w-full mt-2">Sign Out</Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
