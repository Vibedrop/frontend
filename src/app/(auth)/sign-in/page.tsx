"use client";
import { BACKEND_URL } from "@/utilities/config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Flex, Heading, Link } from "@radix-ui/themes";

import AuthForm from "../Authform";

function SignInPage() {
    const router = useRouter();
    const setAuth = useAuthStore(state => state.setAuth);

    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        setError(null);
        setErrors({});

        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await fetch(`${BACKEND_URL}/auth/sign-in`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Unauthorized");
                setErrors(errorData.errors || {});
                return;
            }

            // Fetch User Profile after successful sign-in
            const profileRes = await fetch(`${BACKEND_URL}/users/me`, {
                credentials: "include",
            });

            if (!profileRes.ok) {
                throw new Error("Failed to fetch profile");
            }

            const user = await profileRes.json();
            setAuth(true, user);

            const redirectPath = localStorage.getItem("redirectPath") || "/";
            localStorage.removeItem("redirectPath");
            router.push(redirectPath);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Something went wrong.";
            setError(errorMessage);
        }
    }

    return (
        <>
            <Heading className="text-header-l flex flex-col text-center h-16 justify-center">
                Sign In
            </Heading>

            <AuthForm
                onSubmit={handleSubmit}
                errors={errors}
                error={error}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                type="sign-in"
            />

            {/* TODO: Add social login functionality */}
            {/* <Flex className="flex items-center justify-center w-full max-w-[170px] mx-auto">
                <span className="flex-1 border-t border-gray-300"></span>
                <span className="px-4">or</span>
                <span className="flex-1 border-t border-gray-300"></span>
            </Flex> */}

            {/* <Flex className="flex justify-between items-center w-full max-w-[180px] mx-auto">
                <img src="/assets/icons/google.svg" alt="Google logo" />
                <img src="/assets/icons/facebook.svg" alt="Facebook logo" />
                <img src="/assets/icons/apple.svg" alt="Apple logo" />
            </Flex> */}

            <Flex className="justify-center gap-x-2">
                <span>Don&apos;t have an account?</span>
                <Link href="/sign-up" className="underline text-bold">
                    Sign up here.
                </Link>
            </Flex>
        </>
    );
}

export default SignInPage;
