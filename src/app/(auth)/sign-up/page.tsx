"use client";
import { BACKEND_URL } from "@/utilities/config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flex, Heading, Link, Text } from "@radix-ui/themes";
import AuthForm from "../Authform";

function SignUpPage() {
    const router = useRouter();

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
        const username = formData.get("username") as string;

        try {
            const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, username }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Unauthorized");
                setErrors(errorData.errors || {});
                return;
            }

            const data = await response.json();
            router.push("/sign-in");
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Something went wrong.";
            setError(errorMessage);
        }
    }

    return (
        <>
            <Heading className="text-header-l flex flex-col text-center h-16 justify-center">
                Sign Up
            </Heading>

            <AuthForm
                onSubmit={handleSubmit}
                errors={errors}
                error={error}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                type="sign-up"
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
                <Text>Already have an account?</Text>
                <Link href="/sign-in" className="underline text-bold">
                    Sign in here.
                </Link>
            </Flex>
        </>
    );
}

export default SignUpPage;
