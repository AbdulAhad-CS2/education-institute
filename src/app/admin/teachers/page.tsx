import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { deleteTeacher } from "../actions";
import { X } from "lucide-react";
import { TeacherForm } from "./TeacherForm";

export default async function TeachersPage() {
    const supabase = await createClient();
    const { data: teachers } = await supabase.from("teachers").select("*").order('id');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-900">Teachers</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Create Teacher Form */}
                <div className="md:col-span-1">
                    <TeacherForm />
                </div>

                {/* Teachers List */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-lg shadow border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500">Email</th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500">Specialization</th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers?.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                            No teachers found. Add one to get started.
                                        </td>
                                    </tr>
                                )}
                                {teachers?.map((teacher: any) => (
                                    <tr key={teacher.id} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{teacher.name}</td>
                                        <td className="px-4 py-3 text-gray-600">{teacher.email}</td>
                                        <td className="px-4 py-3 text-gray-600">{teacher.specialization}</td>
                                        <td className="px-4 py-3 text-right">
                                            <form action={deleteTeacher.bind(null, teacher.id)}>
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
