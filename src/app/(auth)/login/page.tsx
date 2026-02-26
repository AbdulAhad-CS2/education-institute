"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { login } from "@/app/actions/auth";

const initialState = {
    error: null,
};

export default function LoginPage() {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(login, initialState);

    return (
        <div className="grid gap-6">
            <div className="flex flex-col text-center space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight">Login to account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            <form action={formAction}>
                <div className="grid gap-4">
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
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="/forgot-password"
                                className="text-xs text-primary underline-offset-4 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>
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
                        Sign In with Email
                    </Button>
                </div>
            </form>

            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                    Sign up
                </Link>
            </div>
        </div>
    );
}
