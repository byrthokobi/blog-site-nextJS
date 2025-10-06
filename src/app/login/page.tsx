"use client";

import { loginUser } from "@/lib/api/auth";
import { LoginResponse } from "@/lib/types/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const LoginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .max(254, "Email is too long.")
        .email("Enter a valid email address."),
    password: z
        .string()
        .min(6, "Use at least 6 characters.")
        .max(128, "Password is too long.")
        .refine((v) => !/\s/.test(v), "Password must not contain spaces.")
});

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setValidationErrors({});

        const result = LoginSchema.safeParse({ email, password });

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setValidationErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            });
            return;
        }

        try {
            const data: LoginResponse = await loginUser({ email, password });
            console.log("Login successful:", data);

            if (!data.user.sessions || data.user.sessions.length === 0) {
                throw new Error("No session found in response");
            }

            Cookies.set("payloadSession", JSON.stringify(data.user), {
                expires: 1,
                secure: true,
                sameSite: "strict",
            });

            window.location.href = "/";
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Login failed");
            }
        }
    };

    return (
        <div className="flex min-h-[600px] items-center justify-center text-white">
            <form
                onSubmit={handleLogin}
                className="w-full h-auto max-w-sm space-y-6 rounded-xl bg-neutral-900 p-8 shadow-lg"
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={`w-full rounded-md border bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none ${validationErrors.email ? "border-red-500 focus:border-red-500" : "border-neutral-700 focus:border-white"
                            }`}
                    />
                    {validationErrors.email && (
                        <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`w-full rounded-md border bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none ${validationErrors.password ? "border-red-500 focus:border-red-500" : "border-neutral-700 focus:border-white"
                            }`}
                    />
                    {validationErrors.password && (
                        <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer rounded-md bg-white px-4 py-2 font-semibold text-black transition hover:bg-gray-200"
                >
                    Login
                </button>

                {error && (
                    <p className="mt-2 text-center text-sm text-red-400">{error}</p>
                )}
            </form>
        </div>
    );
}
