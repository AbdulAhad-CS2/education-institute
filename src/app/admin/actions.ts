'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- Courses ---

export async function createCourse(prevState: any, formData: FormData) {
    const supabase = createClient();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    const { error } = await (await supabase).from("courses").insert({
        name,
        description,
    });

    if (error) {
        console.error("Error creating course:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/admin/courses");
    return { success: true, message: "Course created successfully!" };
}

export async function deleteCourse(id: number) {
    const supabase = createClient();
    const { error } = await (await supabase).from("courses").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/courses");
    return { success: true };
}

// --- Teachers ---

export async function createTeacher(prevState: any, formData: FormData) {
    const supabase = await createClient();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const specialization = formData.get("specialization") as string;

    // 1. Create user in the users table for authentication
    const { data: newUser, error: userError } = await supabase
        .from("users")
        .insert({
            email,
            password, // Plain text as requested for temporary dev phase
            name,
            role: "teacher"
        })
        .select()
        .single();

    if (userError) {
        console.error("Error creating teacher user:", userError);
        return { error: userError.message, success: false };
    }

    // 2. Create teacher profile linked to the user
    const { error: profileError } = await supabase.from("teachers").insert({
        name,
        email,
        specialization,
        user_id: newUser.id
    });

    if (profileError) {
        console.error("Error creating teacher profile:", profileError);
        // Cleanup the user if profile creation fails? For now, just report error.
        return { error: profileError.message, success: false };
    }

    revalidatePath("/admin/teachers");
    return { success: true, message: "Teacher added successfully!" };
}

export async function deleteTeacher(id: number) {
    const supabase = createClient();
    const { error } = await (await supabase).from("teachers").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/teachers");
    return { success: true };
}

// --- Batches ---

export async function createBatch(prevState: any, formData: FormData) {
    const supabase = createClient();
    const name = formData.get("name") as string;
    const course_id = formData.get("course_id");
    const teacher_id = formData.get("teacher_id");
    const plan_id = formData.get("plan_id");
    const start_date = formData.get("start_date") as string;
    const end_date = formData.get("end_date") as string;
    const timings = formData.get("timings") as string;
    const days = formData.get("days") as string;
    const zoom_link = formData.get("zoom_link") as string;

    const { error } = await (await supabase).from("batches").insert({
        name,
        course_id: course_id ? parseInt(course_id as string) : null,
        teacher_id: teacher_id ? parseInt(teacher_id as string) : null,
        plan_id: plan_id ? parseInt(plan_id as string) : null,
        start_date: start_date || null,
        end_date: end_date || null,
        timings,
        days,
        zoom_link
    });

    if (error) {
        console.error("Error creating batch:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/admin/batches");
    return { success: true, message: "Batch created successfully!" };
}

export async function updateBatch(prevState: any, formData: FormData) {
    const supabase = createClient();
    const id = formData.get("id");
    const name = formData.get("name") as string;
    const course_id = formData.get("course_id");
    const teacher_id = formData.get("teacher_id");
    const plan_id = formData.get("plan_id");
    const start_date = formData.get("start_date") as string;
    const end_date = formData.get("end_date") as string;
    const timings = formData.get("timings") as string;
    const days = formData.get("days") as string;
    const zoom_link = formData.get("zoom_link") as string;

    const { error } = await (await supabase)
        .from("batches")
        .update({
            name,
            course_id: course_id ? parseInt(course_id as string) : null,
            teacher_id: teacher_id ? parseInt(teacher_id as string) : null,
            plan_id: plan_id ? parseInt(plan_id as string) : null,
            start_date: start_date || null,
            end_date: end_date || null,
            timings,
            days,
            zoom_link
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating batch:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/admin/batches");
    // Also revalidate portal pages as they use this data
    revalidatePath("/student/dashboard");
    revalidatePath("/teacher/dashboard");

    return { success: true, message: "Batch updated successfully!" };
}

// --- Plans ---

export async function createPlan(prevState: any, formData: FormData) {
    const supabase = createClient();
    const plan_group_id = formData.get("plan_group_id");
    const classes_per_month = formData.get("classes_per_month");
    const price_monthly = formData.get("price_monthly");
    const price_12months = formData.get("price_12months");
    const price_6months = formData.get("price_6months");
    const price_3months = formData.get("price_3months");
    const is_popular = formData.get("is_popular") === "on";

    const { error } = await (await supabase).from("plans").insert({
        plan_group_id: plan_group_id ? parseInt(plan_group_id as string) : null,
        classes_per_month: classes_per_month ? parseInt(classes_per_month as string) : null,
        price_monthly: price_monthly ? parseFloat(price_monthly as string) : null,
        price_12months: price_12months ? parseFloat(price_12months as string) : null,
        price_6months: price_6months ? parseFloat(price_6months as string) : null,
        price_3months: price_3months ? parseFloat(price_3months as string) : null,
        is_popular,
    });

    if (error) {
        console.error("Error creating plan:", error);
        return { error: error.message, success: false };
    }

    revalidatePath("/admin/plans");
    return { success: true, message: "Plan created successfully!" };
}

export async function deletePlan(id: number) {
    const supabase = createClient();
    const { error } = await (await supabase).from("plans").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/plans");
    return { success: true };
}

export async function deleteBatch(id: number) {
    const supabase = createClient();
    const { error } = await (await supabase).from("batches").delete().eq("id", id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/admin/batches");
    return { success: true };
}
