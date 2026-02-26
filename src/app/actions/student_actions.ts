'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";
import { cookies } from "next/headers";

const COOKIE_NAME = "edu_session";

export async function selectPlan(planId: number) {
    const user = await getSession();
    if (!user || user.role !== 'student') {
        return { error: "Unauthorized" };
    }

    const supabase = await createClient();
    const { error } = await supabase
        .from("users")
        .update({ plan_id: planId })
        .eq("id", user.id);

    if (error) {
        console.error("Error selecting plan:", error);
        return { error: error.message };
    }

    // Update session cookie with new plan_id
    const updatedUser = { ...user, plan_id: planId };
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, JSON.stringify(updatedUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    revalidatePath("/student/dashboard");
    revalidatePath("/student/available-batches");
    return { success: true };
}

export async function enrollInBatch(batchId: number) {
    const user = await getSession();
    if (!user || user.role !== 'student') {
        return { error: "Unauthorized" };
    }

    if (!user.plan_id) {
        return { error: "Please select a plan first" };
    }

    const supabase = await createClient();

    // Verify batch matches student's plan
    const { data: batch, error: batchError } = await supabase
        .from("batches")
        .select("plan_id")
        .eq("id", batchId)
        .single();

    if (batchError || !batch) {
        return { error: "Batch not found" };
    }

    if (batch.plan_id !== user.plan_id) {
        return { error: "This batch does not match your plan" };
    }

    // Insert enrollment
    const { error } = await supabase
        .from("enrollments")
        .insert({
            user_id: user.id,
            batch_id: batchId
        });

    if (error) {
        console.error("Enrollment error:", error);
        if (error.code === '23505') {
            return { error: "You are already enrolled in this batch" };
        }
        return { error: error.message };
    }

    revalidatePath("/student/dashboard");
    revalidatePath("/student/available-batches");
    return { success: true };
}
