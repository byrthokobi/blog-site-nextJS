import { LoginRequest, LoginResponse, LogoutResponse } from "@/lib/types/auth";
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

export async function logoutUser(): Promise<LogoutResponse> {
  const res = await fetch(`${url}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return {
      success: false,
      message: "Logout failed",
    };
  }

  try {
    const data = (await res.json()) as LogoutResponse;
    return data;
  } catch {
    return { success: true };
  }
}
