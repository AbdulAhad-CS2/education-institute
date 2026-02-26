"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Settings,
    LogOut,
    PlusCircle,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { getSession, logout } from "@/app/actions/auth";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/student/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Profile",
        href: "/student/profile",
        icon: User,
    },
    {
        title: "Available Batches",
        href: "/student/available-batches",
        icon: PlusCircle,
    },
];

export default function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function loadSession() {
            const session = await getSession();
            setUser(session);
        }
        loadSession();
    }, []);

    const getInitials = (name: string) => {
        return name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase() || "ST";
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-zinc-200 hidden md:flex flex-col fixed h-full">
                <div className="p-6 h-16 flex items-center border-b border-zinc-100">
                    <Link href="/" className="font-bold text-xl text-blue-900 flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        EduInstitute
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    <div className="mb-6 px-2">
                        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Menu</h3>
                        {sidebarItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start mb-1 text-sm font-normal",
                                        pathname === item.href || pathname.startsWith(item.href + "/")
                                            ? "bg-blue-50 text-blue-700 font-medium"
                                            : "text-zinc-600 hover:text-blue-600 hover:bg-blue-50/50"
                                    )}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="p-4 border-t border-zinc-100">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <Avatar>
                            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-zinc-900 truncate">{user?.name || "Loading..."}</p>
                            <p className="text-xs text-zinc-500 capitalize">{user?.role || "Student"}</p>
                        </div>
                    </div>
                    <form action={logout}>
                        <Button type="submit" variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
                {/* Mobile Header (Visible only on small screens) */}
                <header className="md:hidden h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sticky top-0 z-20">
                    <Link href="/" className="font-bold text-lg text-blue-900">
                        EduInstitute
                    </Link>
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </header>

                <div className="flex-1 p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
