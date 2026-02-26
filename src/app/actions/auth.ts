'use server'

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "edu_session";

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME)?.value;
    if (!session) return null;

    try {
        const user = JSON.parse(session);
        return user;
    } catch (error) {
        return null;
    }
}

export async function signup(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    const fullName = `${firstName} ${lastName}`.trim();

    const supabase = await createClient();

    // Check if user exists
    const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (existingUser) {
        return { error: "User with this email already exists." };
    }

    // Insert user
    const { data: newUser, error } = await supabase
        .from("users")
        .insert({
            email,
            password, // Plain text as requested for temp measure
            name: fullName,
            role: "student"
        })
        .select()
        .single();

    if (error) {
        console.error("Signup error:", error);
        return { error: error.message };
    }

    // Set Session Cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, JSON.stringify(newUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });

    redirect("/student/dashboard");
}

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = await createClient();

    // Find user
    const { data: user, error } = await supabase
        .from("users")
        .select("id, email, name, role, plan_id")
        .eq("email", email)
        .eq("password", password) // Plain text comparison
        .single();

    if (error || !user) {
        return { error: "Invalid email or password." };
    }

    // Set Session Cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
    });

    if (user.role === 'admin') {
        redirect("/admin");
    } else if (user.role === 'teacher') {
        redirect("/teacher/dashboard");
    } else {
        redirect("/student/dashboard");
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    redirect("/login");
}
