"use client";
import {
    Callout,
    Flex,
    IconButton,
    TextField,
    Button,
    Theme,
} from "@radix-ui/themes";
import { Eye, EyeOff, Info } from "lucide-react";

type Props = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    errors: { [key: string]: string[] };
    error: string | null;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    type: "sign-in" | "sign-up";
};

export default function AuthForm({
    onSubmit,
    errors,
    error,
    showPassword,
    setShowPassword,
    type,
}: Props) {
    const isSignUp = type === "sign-up";

    return (
        <>
            {error && (
                <Callout.Root color="red" className="w-full">
                    <Callout.Icon>
                        <Info className="icon-xs mt-1" />
                    </Callout.Icon>
                    <Callout.Text className="text-body-s">{error}</Callout.Text>
                </Callout.Root>
            )}

            <form onSubmit={onSubmit}>
                <Theme appearance="light" className="bg-transparent">
                    <Flex gap="4" direction="column">
                        <TextField.Root
                            placeholder="Email"
                            name="email"
                            type="email"
                            className={`text-body-s ${errors.email ? "error-bg" : ""}`}
                            color={errors.email ? "red" : "gray"}
                            variant={errors.email ? "soft" : "surface"}
                            autoFocus
                        />

                        {isSignUp && (
                            <TextField.Root
                                placeholder="Username"
                                name="username"
                                type="text"
                                className={`text-body-s ${errors.username ? "error-bg" : ""}`}
                                color={errors.username ? "red" : "gray"}
                                variant={errors.username ? "soft" : "surface"}
                            />
                        )}

                        <TextField.Root
                            placeholder="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className={`text-body-s ${errors.password ? "error-bg" : ""}`}
                            color={errors.password ? "red" : "gray"}
                            variant={errors.password ? "soft" : "surface"}
                        >
                            <TextField.Slot data-side="right">
                                <IconButton
                                    type="button"
                                    color="gray"
                                    variant="ghost"
                                    className="mr-0.5"
                                    radius="full"
                                    onClick={() =>
                                        setShowPassword(prev => !prev)
                                    }
                                >
                                    {showPassword ? (
                                        <Eye className="icon-sm" />
                                    ) : (
                                        <EyeOff className="icon-sm" />
                                    )}
                                </IconButton>
                            </TextField.Slot>
                        </TextField.Root>

                        {/* <Text className="text-center text-muted">
                            { isSignUp ? 'At least 8 characters long' : <Link href="#" className="underline">Forgot your    password?</Link> }
                        </Text> */}
                    </Flex>
                </Theme>

                <Button type="submit" className="mt-6 w-full">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
            </form>
        </>
    );
}
