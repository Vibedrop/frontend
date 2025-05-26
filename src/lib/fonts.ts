import localFont from "next/font/local";

export const inter = localFont({
    src: [
        {
            path: "../../public/assets/fonts/Inter-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/assets/fonts/Inter-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/assets/fonts/Inter-Medium.woff2",
            weight: "500",
            style: "normal",
        },
    ],
    variable: "--font-inter",
    display: "swap",
});
