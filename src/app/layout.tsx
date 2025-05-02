import { metadata } from "@/utilities/metadata";
import { Geist, Geist_Mono } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import AuthGuard from "@/components/AuthGuard";
import "@radix-ui/themes/styles.css";
import "./globals.css";

export { metadata };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme appearance="dark" accentColor="red" data-theme="custom" className="flex bg-background flex-col h-screen px-2">
          <AuthGuard>
            {children}
          </AuthGuard>
        </Theme>
      </body>
    </html>
  );
}
