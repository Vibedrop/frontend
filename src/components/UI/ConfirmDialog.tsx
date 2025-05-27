import { Dialog, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    onCancel?: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    trigger?: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onOpenChange,
    onConfirm,
    onCancel,
    title,
    description,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    loading = false,
    trigger,
}) => (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {trigger && <Dialog.Trigger>{trigger}</Dialog.Trigger>}
        <Dialog.Content className="w-full max-w-[540px] text-center">
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description size="2">{description}</Dialog.Description>
            <Flex className="justify-center gap-md mt-lg xl:mt-xl">
                <Button
                    className="flex-1 md:flex-none md:w-[192px]"
                    variant="outline"
                    color="iris"
                    onClick={() => {
                        onOpenChange(false);
                        onCancel?.();
                    }}
                    disabled={loading}
                >
                    {cancelLabel}
                </Button>
                <Button
                    className="flex-1 md:flex-none md:w-[192px]"
                    onClick={onConfirm}
                    disabled={loading}
                    loading={loading}
                >
                    {confirmLabel}
                </Button>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
);
