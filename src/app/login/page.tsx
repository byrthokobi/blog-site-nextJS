"use client";

import { loginUser } from "@/lib/api/auth";
import { LoginResponse } from "@/lib/types/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data: LoginResponse = await loginUser({ email, password });
            console.log("Login successful:", data);

            // console.log("Sessions:", data.user.sessions);
            // console.log("Type:", typeof data.sessions, Array.isArray(data.sessions));

            if (!data.user.sessions || data.user.sessions.length === 0) {
                throw new Error("No session found in response");
            }

            Cookies.set("payloadSession", JSON.stringify(data.user), {
                expires: 1,
                secure: true,
                sameSite: "strict"
            });

            router.push("/");
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
                className="w-full h-[400px] max-w-sm space-y-6 rounded-xl bg-neutral-900 p-8 shadow-lg"
            >
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-white focus:outline-none"
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-md border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-white focus:outline-none"
                    />
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
