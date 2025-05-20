import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    if (maxLength <= 3) return "…".slice(0, maxLength);

    return str.slice(0, maxLength - 1) + "…";
}
