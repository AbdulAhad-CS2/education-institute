"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPlan } from "../actions";

type FormState = {
    success: boolean;
    error?: string;
    message?: string;
};

const initialState: FormState = { success: false };

interface PlanGroup {
    id: number;
    name: string;
    max_students: number | null;
}

interface PlanFormProps {
    planGroups: PlanGroup[];
}

// Preset pricing lookup: [group name][classes] -> { monthly, y12, y6, y3, popular }
const PRESET_PRICING: Record<string, Record<number, { monthly: number; y12: number; y6: number; y3: number; popular?: boolean }>> = {
    "Standard Group Plan": {
        8: { monthly: 80, y12: 800, y6: 440, y3: 230 },
        12: { monthly: 110, y12: 1100, y6: 605, y3: 320, popular: true },
        16: { monthly: 135, y12: 1350, y6: 742.5, y3: 396 },
    },
    "Premium Small Group Plan": {
        8: { monthly: 110, y12: 1100, y6: 605, y3: 320 },
        12: { monthly: 135, y12: 1350, y6: 742.5, y3: 396 },
        16: { monthly: 160, y12: 1600, y6: 880, y3: 470 },
    },
    "1-on-1 Private Plan": {
        8: { monthly: 220, y12: 2200, y6: 1210, y3: 632 },
        12: { monthly: 320, y12: 3200, y6: 1760, y3: 933 },
        16: { monthly: 410, y12: 4100, y6: 2255, y3: 1204 },
    },
};

export function PlanForm({ planGroups }: PlanFormProps) {
    const [state, formAction] = useActionState(createPlan, initialState);
    const formRef = useRef<HTMLFormElement>(null);

    const [selectedGroupId, setSelectedGroupId] = useState<string>("");
    const [selectedClasses, setSelectedClasses] = useState<string>("");
    const [prices, setPrices] = useState({ monthly: "", y12: "", y6: "", y3: "", popular: false });

    // Auto-fill prices when group & classes are both selected
    useEffect(() => {
        if (!selectedGroupId || !selectedClasses) {
            setPrices({ monthly: "", y12: "", y6: "", y3: "", popular: false });
            return;
        }
        const group = planGroups.find((g) => g.id === parseInt(selectedGroupId));
        if (!group) return;
        const preset = PRESET_PRICING[group.name]?.[parseInt(selectedClasses)];
        if (preset) {
            setPrices({
                monthly: String(preset.monthly),
                y12: String(preset.y12),
                y6: String(preset.y6),
                y3: String(preset.y3),
                popular: preset.popular ?? false,
            });
        } else {
            setPrices({ monthly: "", y12: "", y6: "", y3: "", popular: false });
        }
    }, [selectedGroupId, selectedClasses, planGroups]);

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset();
            setSelectedGroupId("");
            setSelectedClasses("");
            setPrices({ monthly: "", y12: "", y6: "", y3: "", popular: false });
        }
    }, [state?.success]);

    const selectCls =
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <div className="bg-white p-6 rounded-lg shadow border">
            <h2 className="text-lg font-semibold mb-4">Create New Plan</h2>

            {state?.success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
                    ✓ {state.message}
                </div>
            )}
            {state?.error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm">
                    ✗ {state.error}
                </div>
            )}

            <form ref={formRef} action={formAction} className="space-y-4">
                {/* Plan Group */}
                <div className="space-y-2">
                    <Label htmlFor="plan_group_id">Plan Group</Label>
                    <select
                        id="plan_group_id"
                        name="plan_group_id"
                        className={selectCls}
                        required
                        value={selectedGroupId}
                        onChange={(e) => setSelectedGroupId(e.target.value)}
                    >
                        <option value="">Select a Plan Group</option>
                        {planGroups.map((g) => (
                            <option key={g.id} value={g.id}>
                                {g.name} {g.max_students ? `(Max ${g.max_students})` : ""}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Classes per Month */}
                <div className="space-y-2">
                    <Label htmlFor="classes_per_month">Classes per Month</Label>
                    <select
                        id="classes_per_month"
                        name="classes_per_month"
                        className={selectCls}
                        required
                        value={selectedClasses}
                        onChange={(e) => setSelectedClasses(e.target.value)}
                    >
                        <option value="">Select classes</option>
                        <option value="8">8 classes</option>
                        <option value="12">12 classes</option>
                        <option value="16">16 classes</option>
                    </select>
                </div>

                {/* Pricing — auto-filled but editable */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price_monthly">Monthly Price ($)</Label>
                        <Input
                            id="price_monthly"
                            name="price_monthly"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 110.00"
                            value={prices.monthly}
                            onChange={(e) => setPrices((p) => ({ ...p, monthly: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price_12months">12-Month Price ($) <span className="text-xs text-gray-400">(16 free classes)</span></Label>
                        <Input
                            id="price_12months"
                            name="price_12months"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 1100.00"
                            value={prices.y12}
                            onChange={(e) => setPrices((p) => ({ ...p, y12: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price_6months">6-Month Price ($) <span className="text-xs text-gray-400">(4 free classes)</span></Label>
                        <Input
                            id="price_6months"
                            name="price_6months"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 605.00"
                            value={prices.y6}
                            onChange={(e) => setPrices((p) => ({ ...p, y6: e.target.value }))}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price_3months">3-Month Price ($) <span className="text-xs text-gray-400">(1 free class)</span></Label>
                        <Input
                            id="price_3months"
                            name="price_3months"
                            type="number"
                            step="0.01"
                            placeholder="e.g. 320.00"
                            value={prices.y3}
                            onChange={(e) => setPrices((p) => ({ ...p, y3: e.target.value }))}
                            required
                        />
                    </div>
                </div>

                {/* Most Popular */}
                <div className="flex items-center gap-2">
                    <input
                        id="is_popular"
                        name="is_popular"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={prices.popular}
                        onChange={(e) => setPrices((p) => ({ ...p, popular: e.target.checked }))}
                    />
                    <Label htmlFor="is_popular">Mark as Most Popular</Label>
                </div>

                <Button type="submit" className="w-full">
                    Create Plan
                </Button>
            </form>
        </div>
    );
}
