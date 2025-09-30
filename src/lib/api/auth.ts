import { LoginRequest, LoginResponse } from "@/lib/types/auth";
import { url } from "@/lib/utils/config";

export async function loginUser(
  credentials: LoginRequest
): Promise<LoginResponse> {
  try {
    const res = await fetch(`${url}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      // Try to read error body for more details
      const errorBody = await res.text();
      throw new Error(
        `Login failed (${res.status}): ${errorBody || "Invalid credentials"}`
      );
    }

    return (await res.json()) as LoginResponse;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
