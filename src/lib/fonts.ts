import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../../public/fonts/Inter-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Inter-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});
