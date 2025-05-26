import { BACKEND_URL } from "@/utilities/config";
import { useAuthStore } from "@/stores/useAuthStore";
import { DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { Headphones, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { truncate } from "@/lib/utils";
import clsx from "clsx";

type ModalProps = {
    triggerIcon: React.ReactElement;
};
const menuItemBase = clsx("px-sm mt-xs py-xxs gap-md h-[initial]");
const menuItemClass = clsx(
    menuItemBase,
    "pl-xs text-foreground cursor-pointer",
);
const menuProfileClass = clsx(menuItemBase, "pl-xs items-center hover:bg-none");

export default function ProfileMenu({ triggerIcon }: ModalProps) {
    const router = useRouter();
    const { setAuth } = useAuthStore(state => state);
    const user = useAuthStore(state => state.user);
    const username = user?.username || "No username";
    // TODO: Extract to separate Profile store

    const handleLogout = async () => {
        try {
            await fetch(`${BACKEND_URL}/auth/sign-out`, {
                method: "POST",
                credentials: "include",
            });
            setAuth(false, null);
            router.push("/sign-in");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className="cursor-pointer">
                {triggerIcon}
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="bg-background shadow-none p-xs pt-sm pr-0">
                <Flex className={menuProfileClass}>
                    {triggerIcon}{" "}
                    <Text truncate className="text-header-s">
                        {truncate(username, 16)}
                    </Text>
                </Flex>

                <DropdownMenu.Item
                    asChild
                    color="gray"
                    onClick={() => router.push("/profile")}
                >
                    <Flex className={clsx(menuItemClass)}>
                        <Headphones className="icon-sm lg:icon-md" />
                        <Text className="text-body-s">Profile</Text>
                    </Flex>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild color="gray" onClick={handleLogout}>
                    <Flex className={clsx(menuItemClass)}>
                        <LogOutIcon className="icon-sm lg:icon-md" />
                        <Text className="text-body-s">Sign out</Text>
                    </Flex>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}
