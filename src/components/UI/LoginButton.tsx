"use client";
import { Button, ButtonProps } from "@radix-ui/themes";

type LoginButtonProps = ButtonProps & {
    className?: string;
};

export const LoginButton = ({
    className,
    size = "4",
    ...props
}: LoginButtonProps) => {
    return (
        <Button
            size={size}
            className={`bg-whiteButton text-whiteButton-text text-base hover:bg-whitebutton-hover px-8 py-4 cursor-pointer font-bold rounded-full ${className ?? ""}`}
            {...props}
        />
    );
};
