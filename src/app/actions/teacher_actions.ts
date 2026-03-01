'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getSession } from "./auth";

export async function uploadTest(prevState: any, formData: FormData) {
    const user = await getSession();
    if (!user || user.role !== 'teacher') {
        return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    // Fetch teacher profile
    const { data: teacher } = await supabase
        .from("teachers")
        .select("id")
        .eq("user_id", user.id)
        .single();

    if (!teacher) {
        return { error: "Teacher profile not found" };
    }

    const batch_id = formData.get("batch_id");
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file_url = formData.get("file_url") as string; // Ideally this would be a file upload, but using URL for simplicity as per current pattern

    if (!batch_id || !title || !file_url) {
        return { error: "Missing required fields" };
    }

    const { error } = await supabase
        .from("tests")
        .insert({
            batch_id: parseInt(batch_id as string),
            teacher_id: teacher.id,
            title,
            description,
            file_url,
            is_approved: false
        });

    if (error) {
        console.error("Error uploading test:", error);
        return { error: error.message };
    }

    revalidatePath(`/teacher/batches/${batch_id}/tests`);
    revalidatePath(`/admin/tests`); // New path
    return { success: true };
}

export async function approveTest(testId: number) {
    const user = await getSession();
    if (!user || user.role !== 'admin') {
        return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("tests")
        .update({ is_approved: true })
        .eq("id", testId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/admin/tests`);
    revalidatePath(`/student/dashboard`);
    return { success: true };
}

export async function rejectTest(testId: number) {
    const user = await getSession();
    if (!user || user.role !== 'admin') {
        return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("tests")
        .delete()
        .eq("id", testId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/admin/tests`);
    return { success: true };
}

export async function deleteTest(testId: number, batchId: number) {
    const user = await getSession();
    if (!user || user.role !== 'teacher') {
        return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    const { error } = await supabase
        .from("tests")
        .delete()
        .eq("id", testId);

    if (error) {
        return { error: error.message };
    }

    revalidatePath(`/teacher/batches/${batchId}/tests`);
    return { success: true };
}

export async function submitAnswer(prevState: any, formData: FormData) {
    const user = await getSession();
    if (!user || user.role !== 'student') {
        return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    const test_id = formData.get("test_id");
    const file_url = formData.get("file_url") as string;

    if (!test_id || !file_url) {
        return { error: "Missing required fields" };
    }

    const { error } = await supabase
        .from("test_submissions")
        .insert({
            test_id: parseInt(test_id as string),
            student_id: user.id,
            file_url
        });

    if (error) {
        console.error("Error submitting answer:", error);
        if (error.code === '23505') {
            return { error: "You have already submitted an answer for this test." };
        }
        return { error: error.message };
    }

    revalidatePath(`/student/courses`);
    return { success: true };
}

export async function submitFeedback(prevState: any, formData: FormData) {
    const user = await getSession();
    if (!user || user.role !== 'teacher') {
        return { error: "Unauthorized" };
    }

    const supabase = await createClient();

    const submission_id = formData.get("submission_id");
    const feedback = formData.get("feedback") as string;
    const test_id = formData.get("test_id");
    const batch_id = formData.get("batch_id");

    if (!submission_id || feedback === null) {
        return { error: "Missing required fields" };
    }

    const { error } = await supabase
        .from("test_submissions")
        .update({ feedback })
        .eq("id", parseInt(submission_id as string));

    if (error) {
        console.error("Error submitting feedback:", error);
        return { error: error.message };
    }

    if (batch_id && test_id) {
        revalidatePath(`/teacher/batches/${batch_id}/tests/${test_id}`);
    }

    return { success: true };
}
