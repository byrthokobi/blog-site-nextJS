"use client";

import { loginUser } from "@/lib/api/auth";
import { LoginResponse } from "@/lib/types/auth";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";

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
        .refine((v) => !/\s/.test(v), "Password must not contain spaces."),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginPage() {
    const { setUser } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "" },
        mode: "onSubmit",
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            const data: LoginResponse = await loginUser(values);

            if (!data.user.sessions || data.user.sessions.length === 0) {
                throw new Error("No session found in response");
            }

            Cookies.set("payloadSession", JSON.stringify(data.user), {
                expires: 1,
                secure: true,
                sameSite: "strict",
            });
            setUser(data.user);
            router.push("/");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Login failed";
            setError("root", { message });
        }
    };

    return (
        <div className="flex min-h-[600px] items-center justify-center text-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-auto max-w-sm space-y-6 rounded-xl bg-neutral-900 p-8 shadow-lg"
                noValidate
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        aria-invalid={!!errors.email}
                        disabled={isSubmitting}
                        {...register("email")}
                        className={`w-full rounded-md border bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none 
                                disabled:opacity-70 
                                disabled:cursor-not-allowed
                                ${errors.email ? "border-red-500 focus:border-red-500" : "border-neutral-700 focus:border-white"
                            }`}
                    />
                    {errors.email?.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        aria-invalid={!!errors.password}
                        disabled={isSubmitting}
                        {...register("password")}
                        className={`w-full rounded-md border bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:outline-none
                                disabled:opacity-70 
                                disabled:cursor-not-allowed
                                ${errors.password ? "border-red-500 focus:border-red-500" : "border-neutral-700 focus:border-white"
                            }`}
                    />
                    {errors.password?.message && (
                        <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full
                        cursor-pointer 
                        rounded-md
                        bg-white 
                        px-4 py-2 
                        font-semibold 
                        text-black 
                        transition 
                        hover:bg-gray-200 
                        disabled:opacity-70 
                        disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>

                {"root" in errors && errors.root?.message && (
                    <p className="mt-2 text-center text-sm text-red-400">
                        {errors.root.message}
                    </p>
                )}
            </form>
        </div>
    );
}
