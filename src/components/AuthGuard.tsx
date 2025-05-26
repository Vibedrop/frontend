"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { Flex } from "@radix-ui/themes";

const PUBLIC_ROUTES = ["/start", "/sign-in", "/sign-up", "/404"];

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { checkAuth } = useAuthStore();
    const routePath = usePathname();
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAndRedirect = async () => {
            const authStatus = await checkAuth();

            if (authStatus === "unauthorized") {
                if (PUBLIC_ROUTES.includes(routePath)) {
                    setLoading(false);
                    return;
                }

                localStorage.setItem("redirectPath", routePath);
                router.push("/start");
            } else {
                setLoading(false);

                const redirectPath = localStorage.getItem("redirectPath");
                if (redirectPath) {
                    localStorage.removeItem("redirectPath");
                    router.push(redirectPath);
                }
            }
        };

        checkAndRedirect();
    }, [checkAuth, routePath, router]);

    if (loading) {
        return (
            <Flex className="w-full h-[80vh] max-h-[800px] justify-center items-center">
                <LoaderCircle className="text-brand size-[40px] animate-spin" />
            </Flex>
        );
    }

    return <>{children}</>;
};

export default AuthWrapper;
