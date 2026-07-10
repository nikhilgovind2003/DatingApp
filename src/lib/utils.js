import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BACKEND_URL } from "@/apiConfig";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// lib/utils.js
export async function Api(url) {
  let data = null;

  try {
    const response = await fetch(`${BACKEND_URL}/${url}`, {
      credentials: "include", // ← this is the fetch equivalent of axios's withCredentials
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return {
        data: null,
        error:
          errorBody.message || `Request failed with status ${response.status}`,
      };
    }

    data = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
}
