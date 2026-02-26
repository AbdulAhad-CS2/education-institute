import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "../actions";
import { X } from "lucide-react";
import { CourseForm } from "./CourseForm";

export default async function CoursesPage() {
    const supabase = createClient();
    const { data: courses } = await (await supabase).from("courses").select("*").order('id');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-900">Courses</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Create Course Form */}
                <div className="md:col-span-1">
                    <CourseForm />
                </div>

                {/* Courses List */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-lg shadow border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500">Description</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses?.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                                            No courses found. Add one to get started.
                                        </td>
                                    </tr>
                                )}
                                {courses?.map((course: any) => (
                                    <tr key={course.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{course.name}</td>
                                        <td className="px-4 py-3 text-gray-600 truncate max-w-xs">{course.description}</td>
                                        <td className="px-4 py-3 text-right">
                                            <form action={deleteCourse.bind(null, course.id)}>
                                                <Button variant="ghost" size="icon-sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
