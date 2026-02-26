"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signup } from "@/app/actions/auth";

const initialState = {
    error: null,
};

export default function SignupPage() {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(signup, initialState);

    return (
        <div className="grid gap-6">
            <div className="flex flex-col text-center space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details below to create your account
                </p>
            </div>

            <form action={formAction}>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" name="first-name" placeholder="John" required disabled={isPending} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" name="last-name" placeholder="Doe" required disabled={isPending} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isPending}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            disabled={isPending}
                            required
                        />
                    </div>
                    {state?.error && (
                        <div className="text-red-500 text-sm">{state.error}</div>
                    )}
                    <Button disabled={isPending}>
                        {isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign Up with Email
                    </Button>
                </div>
            </form>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Login
                </Link>
            </div>
        </div>
    );
}
